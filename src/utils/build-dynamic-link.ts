export function buildDynamicLink(urlStr: string, params: Record<string, string | number>): string {
    // const domain = process.env.REACT_APP_DOC_LINK_DOMAIN;
    // if (!domain) throw new Error("Missing REACT_APP_DOC_LINK_DOMAIN");
  
    const url = new URL(`${urlStr}`);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, String(value));
    });
  
    return url.toString();
  }