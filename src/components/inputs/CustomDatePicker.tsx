import React from "react";
import { Stack, Text, Input } from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";

interface CustomDatePickerProps {
  name: string;
  label?: string;
  placeholder?: string;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  name,
  label,
  placeholder,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message?.toString();

  return (
    <Stack direction="column" gap={1} marginBottom={4}>
      {label && <Text fontWeight="medium">{label}</Text>}

      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input
            {...field}
            type="date"
            placeholder={placeholder ?? "Select date"}
            borderColor={error ? "red.500" : "gray.200"}
          />
        )}
      />

      {error && <Text fontSize="sm" color="red.500">{error}</Text>}
    </Stack>
  );
};

export default CustomDatePicker;
