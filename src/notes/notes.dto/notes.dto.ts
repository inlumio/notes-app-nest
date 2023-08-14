import * as yup from 'yup';

const datePattern = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/;
const validCategories = ['Task', 'RandomThought', 'Quote', 'Idea'];

export class NotesDto {
  id: number;
  name: string;
  content: string;
  created: string;
  archived: boolean;
  category: string;
  dates: string;
}

export const notesSchema = yup
  .object()
  .shape({
    id: yup.number().required('ID is required'),
    name: yup.string().required('Name is required'),
    content: yup.string(),
    created: yup
      .string()
      .required('Created date is required')
      .matches(datePattern, 'Created date  must be in format DD/MM/YYYY'),
    archived: yup.boolean(),
    category: yup
      .string()
      .required('Category is required')
      .oneOf(validCategories, 'Invalid category'),
    dates: yup.string(),
  })
  .noUnknown();
