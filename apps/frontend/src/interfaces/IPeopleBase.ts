import { IBase } from './IResources';

export interface IPeopleBase extends IBase {
  first_name: string;
  last_name: string;
  document_id: string;
  category_name: string;
  document_description: string;
  document_name: string;
  document_number: string;
  faculty_name: string;
  phone_number: string;
  email: string;
}
