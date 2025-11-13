import React from "react";
import { Textarea, Stack, Text } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

interface TextAreaInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  rows?: number;
}

export const TextAreaInput: React.FC<TextAreaInputProps> = ({
  name,
  label,
  placeholder,
  rows = 4,
}) => {
  const { register, formState: { errors } } = useFormContext();
  const errorMessage = errors[name]?.message?.toString();

  return (
    <Stack direction="column" gap={1} mb={4}>
      {label && <Text fontWeight="medium">{label}</Text>}
      <Textarea
        {...register(name)}
        placeholder={placeholder ?? label}
        rows={rows}
        borderColor={errorMessage ? "red.500" : "gray.200"}
        _focus={{ borderColor: errorMessage ? "red.500" : "blue.500" }}
      />
      {errorMessage && <Text fontSize="sm" color="red.500">{errorMessage}</Text>}
    </Stack>
  );
};
