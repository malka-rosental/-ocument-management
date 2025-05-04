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
    '/DMLinkAPI/api/dmsearch/getrecentuserdocs': Document[];
    '/DMUserDetails/GetDMUser': User;
    '/dmprofileservice/dmprofileservice.asmx/GetDmProfile': DmProfileDetails

  }

  export const mockData: MockDataMap = {
      '/DMLinkAPI/api/dmsearch/getrecentuserdocs': _documents,
      "/DMUserDetails/GetDMUser": _user,
      "/dmprofileservice/dmprofileservice.asmx/GetDmProfile": _dmProfileDetails
  };
  
  export const getMockResponse = <T>(endpoint: string): T => {
    const data = mockData[endpoint];
    if (!data) throw new Error(`No mock data for ${endpoint}`);
    return data as T;
  };
  