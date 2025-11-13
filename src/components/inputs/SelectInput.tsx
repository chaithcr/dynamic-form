import React from "react";
import { Stack, Text, chakra } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

interface Option {
  label: string;
  value: string;
}

interface SelectInputProps {
  name: string;
  label?: string;
  options?: Option[];
  placeholder?: string;
}

const StyledSelect = chakra("select");

export const SelectInput: React.FC<SelectInputProps> = ({
  name,
  label,
  options = [],
  placeholder,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name]?.message?.toString();

  return (
    <Stack direction="column" gap={1} mb={4}>
      {label && <Text fontWeight="medium">{label}</Text>}

      <StyledSelect
        {...register(name)}
        borderColor={errorMessage ? "red.500" : "gray.200"}
        defaultValue=""
      >
        <option value="" disabled>
          {placeholder ?? `Select ${label}`}
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </StyledSelect>

      {errorMessage && (
        <Text fontSize="sm" color="red.500">
          {errorMessage}
        </Text>
      )}
    </Stack>
  );
};
