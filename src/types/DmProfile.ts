export interface Classification {
    Description: string;
    Code: string;
  }
  
  export interface UserInfo {
    UserId: string;
    FullName: string;
  }
  
  export interface Status {
    Description: string;
    DocumentStatus: string;
  }
  
  export interface DmProfileDetails {
    DocName: string;
    SecurityClassification: Classification;
    BusinessClassification: Classification;
    PersonClassification?: Classification;
    ContentType?: Classification;
    Author: UserInfo;
    Department: Classification;
    Shetach: Classification;
    Project: Classification;
    //TODO
    Categories: any;
    Customers: any;
    //end TODO
    Stage: Classification;
        DistributionStatus: Classification
        Writers:any;
        Approvers: any
        Checkers: any
        LastVersionApproved: any;
    CreationDate: string;
    CreatedBy?: UserInfo;
    LastEditDate?: string;
    PdfNumber?: number;
    DocFolderDescription?: string;
    SubDocFolder?: Classification;
    DocProperty?: Classification;
    FolderNumber?: string;
    ChangeRequestNumber?: string;
    DepartmentFolder?: Classification;
    Proof?: string;
    NumberOfCopies?: number;
    OriginalDocDate?: string;
    SentTo?: string;
    CopyTo?: string;
    InOutMail?: number;
    Keywords?: string;
    Notes?: string;
    ApplicationName?: string;
    Status: Status;
    FolderVer?: string;
    Versions?: {
      Version:   number[];
    };
    Trustees?: {
      Trustee: Trustee[];
    };
    DocumentExtension?: string;
  }
  
  export interface Trustee {
    TrusteeName: string;
    TrusteeDisplayName: string;
    TrusteeLocation?: string;
    TrusteePhoneNumber?: string;
    TrusteeType: string;
    AccessRights: string;
  }
  