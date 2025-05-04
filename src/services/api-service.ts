import { getMockResponse } from "src/_mock/mock-service";

const BASE_URL = 'https://your-api-domain.com/api';

const isDev = process.env.NODE_ENV === 'development';

import { XMLParser } from 'fast-xml-parser';


// Setup XML parser
const xmlParser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
});

// Define a generic response type
interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

const request = async <T>(
  endpoint: string,
  method: Method,
  params?: Record<string, any>,
  body?: any
): Promise<T> => {
  if (isDev && method === 'GET') {
    console.log('in api:', endpoint);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getMockResponse<T>(endpoint));
      }, 300); // simulate network latency
    });
  }

  let url = `${BASE_URL}${endpoint}`;

  if (params && method === 'GET') {
    const query = new URLSearchParams(params).toString();
    url += `?${query}`;
  }

  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      // Add Authorization header if needed
      // 'Authorization': `Bearer ${token}`,
    },
  };

  if (body && method !== 'GET') {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);
  const contentType = response.headers.get('Content-Type');

  let parsed: any;

  if (contentType?.includes('application/json')) {
    parsed = await response.json();
  } else if (contentType?.includes('xml') || contentType?.includes('text/xml')) {
    const xml = await response.text();
    const rawXml = extractInnerXml(xml); // optional: unwrap <string> if needed
    parsed = xmlParser.parse(rawXml);
  } else {
    throw new Error(`Unsupported response type: ${contentType}`);
  }

  if (!response.ok) {
    throw new Error(parsed?.message || 'API error');
  }

  return parsed as T;
};

// Extract inner XML if wrapped in <string>...</string>
const extractInnerXml = (xml: string): string => {
  const match = xml.match(/<\?xml[\s\S]+?\?>[\s\S]+<\/[\w:]+>/);
  return match ? match[0] : xml;
};

// Exported API object
const ApiService = {
  get: <T>(endpoint: string, params?: Record<string, any>) =>
    request<T>(endpoint, 'GET', params),

  post: <T>(endpoint: string, body?: any, params?: Record<string, any>) =>
    request<T>(endpoint, 'POST', params, body),

  put: <T>(endpoint: string, body?: any, params?: Record<string, any>) =>
    request<T>(endpoint, 'PUT', params, body),

  delete: <T>(endpoint: string, params?: Record<string, any>) =>
    request<T>(endpoint, 'DELETE', params),
};

export default ApiService;
