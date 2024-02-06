export interface IBase {
  id: number;
}

export interface ICategory extends IBase {
  category_name: string;
}

export interface IFacultie extends IBase {
  faculty_name: string;
}

export interface IDocument extends IBase {
  document_name: string;
  document_description: string;
}
