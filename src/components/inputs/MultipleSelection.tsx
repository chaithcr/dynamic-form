import React from "react";
import { Stack, Text, chakra } from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";

interface MultipleSelectionProps {
  name: string;
  label?: string;
  options: { label: string; value: string }[];
}

// Styled container for checkboxes
const CheckboxGroupContainer = chakra("div");

export const MultipleSelection: React.FC<MultipleSelectionProps> = ({
  name,
  label,
  options,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = (errors[name]?.message as string) || "";

  return (
    <Stack direction="column" gap={1} mb={4}>
      {label && <Text fontWeight="medium">{label}</Text>}

      <Controller
        control={control}
        name={name}
        defaultValue={[]}
        render={({ field }) => (
          <CheckboxGroupContainer display="flex" gap={4} flexWrap="wrap">
            {options.map((o, index) => {
              const id = `${name}-${index}`; // ✅ unique ID for each checkbox
              return (
                <label
                  key={o.value}
                  htmlFor={id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <input
                    id={id}
                    type="checkbox"
                    value={o.value}
                    checked={field.value?.includes(o.value)}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const checked = e.target.checked;
                      let newValue = [...(field.value || [])];
                      if (checked) {
                        newValue.push(o.value);
                      } else {
                        newValue = newValue.filter((v) => v !== o.value);
                      }
                      field.onChange(newValue);
                    }}
                    style={{ marginRight: "0.5rem" }}
                  />
                  {o.label}
                </label>
              );
            })}
          </CheckboxGroupContainer>
        )}
      />

      {error && (
        <Text fontSize="sm" color="red.500">
          {error}
        </Text>
      )}
    </Stack>
  );
};
