
import * as yup from "yup";

const MAX_FILE_SIZE = 2 * 1024 * 1024; 
const SUPPORTED_FORMATS = [".jpg", ".jpeg", ".png", ".gif", ".webp"];

const phoneRegex = /^(\+91[\-\s]?)?[6-9]\d{9}$/;

export const createValidationSchema = (fields: any[]) => {
  const shape: Record<string, yup.AnySchema> = {};

  fields.forEach((field) => {
    const add = (key: string, validator: yup.AnySchema) => {
      if (key) shape[key] = validator;
    };

    switch (field.type) {
     
      case "text":
      case "textarea":
      case "select":
        add(
          field.name,
          field.required
            ? yup.string().required(`${field.label} is required`)
            : yup.string().nullable()
        );
        break;

     
      case "email":
        add(
          field.name,
          field.required
            ? yup
                .string()
                .email("Enter a valid email address")
                .required(`${field.label} is required`)
            : yup.string().email("Enter a valid email address").nullable()
        );
        break;

      
      case "phone":
        add(
          field.name,
          field.required
            ? yup
                .string()
                .matches(
                  phoneRegex,
                  "Invalid phone number. Example: +91 9876543210 or 9876543210"
                )
                .required(`${field.label} is required`)
            : yup
                .string()
                .matches(phoneRegex, "Invalid phone number")
                .nullable()
        );
        break;

   
      case "password":
        add(
          field.name,
          field.required
            ? yup
                .string()
                .min(6, "Password must be at least 6 characters")
                .required(`${field.label} is required`)
            : yup
                .string()
                .min(6, "Password must be at least 6 characters")
                .nullable()
        );
        break;

    
      case "file-upload":
        add(
          field.name,
          field.required
            ? yup
                .mixed()
                .required(`${field.label} is required`)
                .test("fileType", "Unsupported file format", (value: any) => {
                  if (!value) return false;
                  return SUPPORTED_FORMATS.some((ext) =>
                    value.name?.toLowerCase().endsWith(ext)
                  );
                })
                .test("fileSize", "File must be less than 2 MB", (value: any) => {
                  if (!value) return false;
                  return value.size <= MAX_FILE_SIZE;
                })
            : yup.mixed().nullable()
        );
        break;

     
      case "checkbox":
        add(
          field.name,
          field.required
            ? yup.boolean().oneOf([true], `${field.label} must be checked`)
            : yup.boolean().nullable()
        );
        break;

     
      case "date":
        add(
          field.name,
          field.required
            ? yup
                .date()
                .typeError("Invalid date")
                .required(`${field.label} is required`)
            : yup.date().typeError("Invalid date").nullable()
        );
        break;

     
      case "date-range":
        if (field.nameStart) {
          add(
            field.nameStart,
            field.required
              ? yup
                  .date()
                  .typeError("Invalid start date")
                  .required("Start date is required")
              : yup.date().typeError("Invalid start date").nullable()
          );
        }
        if (field.nameEnd) {
          add(
            field.nameEnd,
            field.required
              ? yup
                  .date()
                  .typeError("Invalid end date")
                  .required("End date is required")
              : yup.date().typeError("Invalid end date").nullable()
          );
        }
        break;

      case "unit":
        add(
          field.name,
          field.required
            ? yup
                .array()
                .of(
                  yup.object().shape({
                    unit: yup.string().required("Unit is required"),
                    count: yup
                      .number()
                      .typeError("Count must be a number")
                      .min(1, "Count must be at least 1")
                      .required("Count is required"),
                    name: yup.string().required("Name is required"),
                  })
                )
                .min(1, `${field.label} must have at least one unit`)
            : yup
                .array()
                .of(
                  yup.object().shape({
                    unit: yup.string().nullable(),
                    count: yup.number().nullable(),
                    name: yup.string().nullable(),
                  })
                )
                .nullable()
        );
        break;

      case "map":
        add(
          field.name,
          field.required
            ? yup.string().required(`${field.label} is required`)
            : yup.string().nullable()
        );
        break;

      default:
        if (field.name)
          add(
            field.name,
            field.required ? yup.mixed().required() : yup.mixed().nullable()
          );
        break;
    }
  });

  return yup.object().shape(shape);
};
