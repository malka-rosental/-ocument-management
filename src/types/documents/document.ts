export type Document = {
    Application: string,
    Library:string,
    Docnumber:string,
    Docname: string,
    EditDate:string,
    AuthorUserName:string,
    AuthorFullName: string;
    DocStorage:string,
    CreateDate:string,
    DocKeywords?: string,
    DepartCode:string,
    DepartName: string,
    ProjectCode?: string,
    ProjectName?: string,
    DocVersions: DocVersion[]
}

export type DocVersion = {
    Docnumber: string,
    VersionId:string,
    VersionLabel:string,
    Lasteditdate:string,
    TypistId:string,
    TypistFullName: string
}