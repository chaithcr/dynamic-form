
import type { FieldConfig as FieldConfigType } from "../types/formTypes";
export const FieldConfig: FieldConfigType[] = [
  { name: "fullName", label: "Full Name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "password", label: "Password", type: "password", required: true },
  { name: "phone", label: "Phone Number", type: "phone", required: true },
  {
    name: "projectType",
    label: "Type of Project",
    type: "select",
    required: true,
    options: [
      { label: "Residential", value: "residential" },
      { label: "Commercial", value: "commercial" },
      { label: "Office Space", value: "office" },
    ],
  },
  {
    name: "designStyle",
    label: "Preferred Design Style",
    type: "radio",
    required: true,
    options: [
      { label: "Modern", value: "modern" },
      { label: "Traditional", value: "traditional" },
      { label: "Minimalist", value: "minimalist" },
    ],
  },
  {
    name: "servicesNeeded",
    label: "Select Services Needed",
    type: "checkbox-group",
    options: [
      { label: "Interior Design", value: "design" },
      { label: "3D Visualization", value: "3d" },
      { label: "Renovation", value: "renovation" },
    ],
  },
  { name: "plan", label: "Estimate", type: "unit" },
  { name: "startDate", label: "Project Start Date", type: "date" },
  { name: "endDate", label: "Project End Date", type: "date" },
  {
    name: "projectLocation",
    label: "Project Location",
    type: "map",
    required: true,
  },
  {
  name: "workTimings",
  label: "Preferred Work Timings",
  type: "work-timings",
},

  {
    name: "projectDescription",
    label: "Project Description",
    type: "textarea",
    placeholder: "Describe your design idea...",
  },
  {
    name: "floorPlan",
    label: "Upload Floor Plan",
    type: "file-upload",
    accept: ".pdf,.jpg,.png",
  },
];
