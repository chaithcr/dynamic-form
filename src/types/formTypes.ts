
export interface FieldConfig {
  name?: string;
  nameStart?: string;
  nameEnd?: string;
  label: string;
  type:
    | "text"| "email"| "password"| "phone"| "textarea"| "radio"| "checkbox"| "checkbox-group"
    | "select"| "file"| "file-upload"| "date"| "date-range"| "unit"| "map"| "work-timings";
  required?: boolean;
  options?: { label: string; value: string }[];
  rows?: number;
  allowedFileTypes?: string[];
  units?: string[];
  accept?: string;
  placeholder?: string;
}
