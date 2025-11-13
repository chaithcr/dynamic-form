import React from "react";
import { Stack, Input, Text } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

interface DateInputProps {
  name: string;
  label?: string;
}

export const DateInput: React.FC<DateInputProps> = ({ name, label }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message?.toString();

  return (
    <Stack direction="column" gap={1} marginBottom={4}>
      {label && <Text fontWeight="medium">{label}</Text>}

      <Input
        {...register(name)}
        type="date"
        borderColor={error ? "red.500" : "gray.200"}
      />

      {error && <Text fontSize="sm" color="red.500">{error}</Text>}
    </Stack>
  );
};
