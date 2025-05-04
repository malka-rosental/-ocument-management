export interface FetchDmProfileParams {
    DocLibrary: string;
    DocNumber: string;
    PrimaryLibrary: string;
    DST: string;
}

import ApiService from "./api-service";

import type { DmProfileDetails } from "../types/DmProfile";


export const fileService = {
    fetchDmProfileDetails: (dmProfileParams: FetchDmProfileParams): Promise<DmProfileDetails> => ( ApiService.get<any>(`/dmprofileservice/dmprofileservice.asmx/GetDmProfile`, dmProfileParams))     
}

// export default FileService;  