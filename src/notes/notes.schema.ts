import * as yup from 'yup';

const datePattern = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/;

export const notesSchema = yup
  .object()
  .shape({
    id: yup.number().required('ID is required'),
    name: yup.string().required('Name is required'),
    content: yup.string().required('Content is required'),
    created: yup
      .string()
      .required('Created date is required')
      .matches(datePattern, 'Created date  must be in format DD/MM/YYYY'),
    archived: yup.boolean().required('Archived is required'),
    category: yup.string().required('Category is required'),
    dates: yup
      .array()
      .of(
        yup
          .string()
          .required('Date in dates array is required')
          .matches(
            datePattern,
            'Date in dates array must be in format DD/MM/YYYY',
          ),
      )
      .required('Dates array is required'),
  })
  .noUnknown();
