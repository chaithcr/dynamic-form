import React from "react";
import { Stack, Text, chakra } from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";

interface RadioInputProps {
  name: string;
  label?: string;
  options: { label: string; value: string | number }[];
}

const RadioGroupContainer = chakra("div");

export const RadioInput: React.FC<RadioInputProps> = ({ name, label, options }) => {
  const { control, formState: { errors } } = useFormContext();
  const errorMessage = errors[name]?.message?.toString();

  return (
    <Stack direction="column" gap={2} mb={4}>
      {label && <Text fontWeight="medium">{label}</Text>}
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <RadioGroupContainer display="flex" gap={4}>
            {options.map(o => (
              <label key={o.value} style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                <input type="radio" value={o.value} checked={field.value === o.value} onChange={() => field.onChange(o.value)} style={{ marginRight: "0.5rem" }} />
                {o.label}
              </label>
            ))}
          </RadioGroupContainer>
        )}
      />
      {errorMessage && <Text fontSize="sm" color="red.500">{errorMessage}</Text>}
    </Stack>
  );
};
