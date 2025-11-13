import React from "react";
import { Input, Stack, Text } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

interface TextInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  name,
  label,
  placeholder,
  type = "text",
}) => {
  const { register, formState: { errors } } = useFormContext();
  const errorMessage = errors[name]?.message?.toString();

  return (
    <Stack direction="column" gap={1} mb={4}>
      {label && <Text fontWeight="medium">{label}</Text>}
      <Input
        {...register(name)}
        type={type}
        placeholder={placeholder ?? label}
        borderColor={errorMessage ? "red.500" : "gray.200"}
        _focus={{ borderColor: errorMessage ? "red.500" : "blue.500" }}
      />
      {errorMessage && <Text fontSize="sm" color="red.500">{errorMessage}</Text>}
    </Stack>
  );
};
