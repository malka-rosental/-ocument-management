export interface FetchDmProfileParams {
    DocLibrary: string;
    DocNumber: string;
    PrimaryLibrary: string;
    DST: string;
}

export interface UnlockDmParams {
    docNum: string;
    docName: string;
    DocLib: string;
}

import ApiService from "./api-service";

import type { DmProfileDetails } from "../types/DmProfile";



export const fileService = {
    fetchDmProfileDetails: ( dmProfileApiUrl: string ,dmProfileParams: FetchDmProfileParams): Promise<DmProfileDetails> => ( ApiService.get<any>(`${dmProfileApiUrl}/dmprofileservice/dmprofileservice.asmx/GetDmProfile`, dmProfileParams)), 
    unlockDm: (unlockApiUrl: string, unlockDmParams: UnlockDmParams) =>( ApiService.get<any>(`${unlockApiUrl}/ICReleaseDocumentApi/api`, unlockDmParams)) 
}

// export default FileService;  