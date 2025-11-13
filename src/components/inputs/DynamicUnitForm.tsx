import React, { useState } from "react";
import {
  Box,
  Button,
  HStack,
  Input,
  Text,
  VStack,
  SimpleGrid,
  IconButton,
} from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";
import { MdDelete } from "react-icons/md";

interface UnitItem {
  unit: string;
  count: number;
  name: string;
}

interface DynamicUnitFormProps {
  name: string;
  label: string;
  units?: string[];
}

const defaultUnits = [
  "Living Room",
  "Hall",
  "Dining Room",
  "Drawing Room",
  "Lobby",
  "Family Lounge",
  "Home Theatre",
  "Recreation Room",
  "Master Bedroom",
  "Kids Bedroom",
  "Guest Bedroom",
  "Parents Bedroom",
  "Study Room",
  "Servant Room",
  "Walk-In Closet",
  "Kitchen",
  "Dry Kitchen",
  "Wet Kitchen",
  "Utility",
  "Pantry",
  "Store Room",
  "Master Bathroom",
  "Common Bathroom",
  "Guest Bathroom",
  "Powder Room",
  "Attached Bathroom",
  "Balcony",
  "Terrace",
  "Terrace Garden",
  "Sit-Out Area",
  "Courtyard",
  "Pooja Room",
  "Gym Room",
  "Study Area",
  "Library",
  "Office Room",
  "Meditation Room",
  "Gaming Room",
  "Garage",
  "Staircase Area",
  "Basement",
  "Lift Lobby",
  "Balcony Utility",
  "Balcony Garden",
  "Laundry Room",
  "Drying Balcony",
  "Veranda",
  "Front Porch",
];

const DynamicUnitForm: React.FC<DynamicUnitFormProps> = ({
  name,
  label,
  units = defaultUnits,
}) => {
  const { control } = useFormContext();
  const [selectedUnits, setSelectedUnits] = useState<UnitItem[]>([]);

  const handleAddUnit = (unit: string) => {
    if (!selectedUnits.some((u) => u.unit === unit)) {
      setSelectedUnits((prev) => [
        ...prev,
        { unit, count: 1, name: `${unit} 1` },
      ]);
    }
  };

  const handleRemoveUnit = (unit: string) => {
    setSelectedUnits((prev) => prev.filter((u) => u.unit !== unit));
  };

  return (
    <Box p={6} bg="gray.50" borderRadius="md" boxShadow="sm">
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        {label}
      </Text>

      <SimpleGrid columns={[2, 3, 4]} spacing={3} mb={6}>
        {units.map((unit) => (
          <Button
            key={unit}
            onClick={() => handleAddUnit(unit)}
            colorScheme={
              selectedUnits.some((u) => u.unit === unit) ? "teal" : "gray"
            }
            variant={
              selectedUnits.some((u) => u.unit === unit) ? "solid" : "outline"
            }
            size="sm"
          >
            {unit}
          </Button>
        ))}
      </SimpleGrid>

      <Box bg="white" p={4} borderRadius="md" boxShadow="base">
        <HStack fontWeight="semibold" mb={2}>
          <Box flex="1">Unit</Box>
          <Box flex="1">Count</Box>
          <Box flex="2">Name</Box>
          <Box w="50px">Action</Box>
        </HStack>

        {selectedUnits.map((unit, idx) => (
          <HStack key={unit.unit} mb={3}>
            <Box flex="1">
              <Text>{unit.unit}</Text>
            </Box>

            <Controller
              name={`${name}.${idx}.count`}
              control={control}
              defaultValue={unit.count}
              rules={{ required: "Count is required", min: 1 }}
              render={({ field, fieldState }) => (
                <VStack align="start" flex="1">
                  <Input
                    {...field}
                    type="number"
                    min="1"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    borderColor={fieldState.error ? "red.400" : "gray.200"}
                    size="sm"
                  />
                  {fieldState.error && (
                    <Text fontSize="xs" color="red.500">
                      {fieldState.error.message}
                    </Text>
                  )}
                </VStack>
              )}
            />

            <Controller
              name={`${name}.${idx}.name`}
              control={control}
              defaultValue={unit.name}
              rules={{ required: "Name is required" }}
              render={({ field, fieldState }) => (
                <VStack align="start" flex="2">
                  <Input
                    {...field}
                    placeholder={`${unit.unit} Name`}
                    borderColor={fieldState.error ? "red.400" : "gray.200"}
                    size="sm"
                  />
                  {fieldState.error && (
                    <Text fontSize="xs" color="red.500">
                      {fieldState.error.message}
                    </Text>
                  )}
                </VStack>
              )}
            />

            <IconButton
              aria-label="Remove"
              icon={<MdDelete />}
              colorScheme="red"
              onClick={() => handleRemoveUnit(unit.unit)}
              size="sm"
            />
          </HStack>
        ))}
      </Box>
    </Box>
  );
};

export default DynamicUnitForm;
