import React from "react";
import { Stack, Input, Text } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

interface FileInputProps {
  name: string;
  label?: string;
  accept?: string;
}

export const FileInput: React.FC<FileInputProps> = ({ name, label, accept }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message?.toString();

  return (
    <Stack direction="column" gap={1} marginBottom={4}>
      {label && <Text fontWeight="medium">{label}</Text>}

      <Input
        type="file"
        {...register(name)}
        accept={accept}
        borderColor={error ? "red.500" : "gray.200"}
      />

      {error && <Text fontSize="sm" color="red.500">{error}</Text>}
    </Stack>
  );
};
