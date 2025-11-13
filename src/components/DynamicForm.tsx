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

  return (
    <Stack direction="column" gap={1} mb={4}>
      <Controller
        name={name}
        control={control}
        defaultValue={false}
        render={({ field }) => (
          <Box
            as="label"
            display="flex"
            alignItems="center"
            cursor="pointer"
          >
            <input
              type="checkbox"
              {...field}
              checked={field.value}
              style={{ marginRight: "0.5rem" }}
            />
            <Text color={error ? "red.500" : "black"}>{label}</Text>
          </Box>
        )}
      />
      {error && <Text fontSize="sm" color="red.500">{error}</Text>}
    </Stack>
  );
};
