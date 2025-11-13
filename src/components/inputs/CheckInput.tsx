import React from "react";
import { Stack, Text, Box } from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";

interface CheckInputProps {
  name: string;
  label: string;
}

export const CheckInput: React.FC<CheckInputProps> = ({ name, label }) => {
  const { control, formState: { errors } } = useFormContext();
  const error = errors[name]?.message?.toString();
  const id = `${name}-checkbox`; // ✅ unique ID

  return (
    <Stack direction="column" gap={1} mb={4}>
      <Controller
        name={name}
        control={control}
        defaultValue={false}
        render={({ field }) => (
          <Box as="label" htmlFor={id} display="flex" alignItems="center" gap={2}>
            <input 
              id={id} 
              type="checkbox" 
              {...field} 
              checked={field.value} 
            />
            <Text>{label}</Text>
          </Box>
        )}
      />
      {error && <Text fontSize="sm" color="red.500">{error}</Text>}
    </Stack>
  );
};
