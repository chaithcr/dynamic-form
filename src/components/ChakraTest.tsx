import React from "react";
import {
  Button,
  VStack,
  Container,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { useForm, FormProvider, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FieldConfig } from "../config/FieldConfig";

import {
  TextInput,
  TextAreaInput,
  EmailInput,
  PhoneInput,
  SelectInput,
  RadioInput,
  MultipleSelection,
  FileUploader,
  CustomDatePicker,
  DynamicUnitForm,
  LocationPickerInput,
  PasswordInput,
  WorkTimingsForm,
} from "./inputs";

// ✅ Validation schema based on FieldConfig
const createValidationSchema = (fields: typeof FieldConfig) => {
  const shape: Record<string, any> = {};

  fields.forEach((field) => {
    if (!field.name) return;

    if (field.type === "checkbox-group") {
      shape[field.name] = field.required
        ? yup.array().min(1, `${field.label} is required`)
        : yup.array();
    } else if (field.required) {
      shape[field.name] = yup.string().required(`${field.label} is required`);
    } else {
      shape[field.name] = yup.mixed().notRequired();
    }
  });

  return yup.object().shape(shape);
};

// ✅ Default values builder
const buildDefaultValues = (fields: typeof FieldConfig) => {
  const defaults: Record<string, any> = {};

  fields.forEach((field) => {
    if (!field.name) return;

    if (field.type === "checkbox-group" || field.type === "work-timings") {
      defaults[field.name] = [];
    } else if (field.type === "file-upload") {
      defaults[field.name] = null;
    } else {
      defaults[field.name] = "";
    }
  });

  return defaults;
};

const ChakraTest: React.FC = () => {
  const toast = useToast();

  const methods = useForm({
    resolver: yupResolver(createValidationSchema(FieldConfig)),
    defaultValues: buildDefaultValues(FieldConfig),
  });

  const { handleSubmit, formState } = methods;

  // ✅ Submit Handler
  const onSubmit: SubmitHandler<any> = (data) => {
    console.log("✅ Form Submitted:", data);
    console.log("Form Errors:", formState.errors);

    toast({
      title: "Form Submitted!",
      description: "Form data logged in console.",
      status: "success",
      duration: 4000,
      isClosable: true,
      position: "top",
    });
  };

  // ✅ Field Renderer
  const renderField = (field: typeof FieldConfig[0]) => {
    if (!field.name) return null;

    switch (field.type) {
      case "text":
        return <TextInput key={field.name} name={field.name} label={field.label} />;
      case "email":
        return <EmailInput key={field.name} name={field.name} label={field.label} />;
      case "password":
        return <PasswordInput key={field.name} name={field.name} label={field.label} />;
      case "phone":
        return <PhoneInput key={field.name} name={field.name} label={field.label} />;
      case "textarea":
        return <TextAreaInput key={field.name} name={field.name} label={field.label} />;
      case "radio":
        return (
          <RadioInput
            key={field.name}
            name={field.name}
            label={field.label}
            options={field.options || []}
          />
        );
      case "checkbox-group":
        return (
          <MultipleSelection
            key={field.name}
            name={field.name}
            label={field.label}
            options={field.options || []}
          />
        );
      case "select":
        return (
          <SelectInput
            key={field.name}
            name={field.name}
            label={field.label}
            options={field.options || []}
          />
        );
      case "file-upload":
        return (
          <FileUploader
            key={field.name}
            name={field.name}
            label={field.label}
            accept={field.accept}
          />
        );
      case "date":
        return <CustomDatePicker key={field.name} name={field.name} label={field.label} />;
      case "unit":
        return (
          <DynamicUnitForm
            key={field.name}
            name={field.name}
            label={field.label}
            units={field.units}
          />
        );
      case "map":
        return <LocationPickerInput key={field.name} name={field.name} label={field.label} />;
      case "work-timings":
        return <WorkTimingsForm key={field.name} name={field.name} label={field.label} />;
      default:
        return null;
    }
  };

  // ✅ JSX Layout
  return (
    <Container maxW="600px" py={10}>
      <Heading mb={6}>Dynamic Chakra UI Form</Heading>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={6} align="stretch">
            {FieldConfig.map((field) => renderField(field))}

            <Button type="submit" colorScheme="teal" size="lg">
              Submit Inquiry
            </Button>
          </VStack>
        </form>
      </FormProvider>
    </Container>
  );
};

export default ChakraTest;
