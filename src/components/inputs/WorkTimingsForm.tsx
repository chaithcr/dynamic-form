import React from "react";
import { HStack, Button, Text, VStack } from "@chakra-ui/react";
import { Controller, useFormContext } from "react-hook-form";

interface WorkTimingsFormProps {
  name: string;
  label: string;
}

const daysOfWeek = [
  { label: "M", value: "Monday" },
  { label: "Tu", value: "Tuesday" },
  { label: "W", value: "Wednesday" },
  { label: "Th", value: "Thursday" },
  { label: "F", value: "Friday" },
  { label: "Sa", value: "Saturday" },
  { label: "Su", value: "Sunday" },
];

export const WorkTimingsForm: React.FC<WorkTimingsFormProps> = ({ name, label }) => {
  const { control } = useFormContext();

  return (
    <VStack align="start" spacing={3} mb={4}>
      <Text fontWeight="semibold">{label}</Text>

      <Controller
        name={name}
        control={control}
        defaultValue={[]} 
        render={({ field }) => (
          <HStack wrap="wrap" spacing={3}>
            {daysOfWeek.map((day) => {
              const isSelected = field.value?.includes(day.value);

              return (
                <Button
                  key={day.value}
                  onClick={() => {
                    let newValue: string[];
                    if (isSelected) {
                      newValue = field.value.filter((d: string) => d !== day.value);
                    } else {
                      newValue = [...(field.value || []), day.value];
                    }
                    field.onChange(newValue);
                  }}
                  size="sm"
                  borderRadius="full"
                  width="40px"
                  height="40px"
                  fontWeight="bold"
                  colorScheme={isSelected ? "teal" : "gray"}
                  variant={isSelected ? "solid" : "outline"}
                  _hover={{ bg: isSelected ? "teal.500" : "gray.100" }}
                  transition="all 0.2s ease"
                >
                  {day.label}
                </Button>
              );
            })}
          </HStack>
        )}
      />
    </VStack>
  );
};
