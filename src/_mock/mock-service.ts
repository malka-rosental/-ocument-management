import type { User } from "src/types/user";
import type { Document } from "src/types/documents";

import { _user } from "./_user";
import { _documents } from "./_documents";
import { _dmProfileDetails} from './_profile'

import type { DmProfileDetails } from "../types/DmProfile";

interface MockDataMap {
    [key: string]: any;
  }

  interface MockDataMap {
    'https://development/api/DMLinkAPI/api/dmsearch/getrecentuserdocs': Document[];
    'https://development/api/DMUserDetails/GetDMUser': User;
    'https://development/api/dmprofileservice/dmprofileservice.asmx/GetDmProfile': DmProfileDetails
    "https://development/api/ICReleaseDocumentApi/api": any;

  }

  export const mockData: MockDataMap = {
      'https://development/api/DMLinkAPI/api/dmsearch/getrecentuserdocs': _documents,
      "https://development/api/DMUserDetails/GetDMUser": _user,
      "https://development/api/dmprofileservice/dmprofileservice.asmx/GetDmProfile": _dmProfileDetails,
      "https://development/api/ICReleaseDocumentApi/api": {type: 4}
  };
  
  export const getMockResponse = <T>(endpoint: string): T => {
    const data = mockData[endpoint];
    if (!data) throw new Error(`No mock data for ${endpoint}`);
    return data as T;
  };
  