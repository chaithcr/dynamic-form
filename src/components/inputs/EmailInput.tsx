import React from "react";
import { Stack, Input, Text } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

interface EmailInputProps {
  name: string;
  label?: string;
}

export const EmailInput: React.FC<EmailInputProps> = ({ name, label }) => {
  const { register, formState: { errors } } = useFormContext();
  const errorMessage = errors[name]?.message?.toString();

  return (
    <Stack direction="column" gap={1} mb={4}>
      {label && <Text fontWeight="medium">{label}</Text>}
      <Input
        {...register(name)}
        type="email"
        placeholder={label}
        borderColor={errorMessage ? "red.500" : "gray.200"}
        _focus={{ borderColor: errorMessage ? "red.500" : "blue.500" }}
      />
      {errorMessage && <Text fontSize="sm" color="red.500">{errorMessage}</Text>}
    </Stack>
  );
};
