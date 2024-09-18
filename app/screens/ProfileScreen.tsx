import React, { useCallback, useMemo, useState } from "react";
import { ProfileScreenProps } from "../utils/types";
import { View, Button, ScrollView, TextInput, Text } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { useForm, Controller } from 'react-hook-form';
import { createTable } from "../services/postgres/tableService";
import { tableSchema } from "../utils/ProfileScreen/schemas";
import { columnTypes } from "../utils/constants";

export const HomeScreen = React.memo<ProfileScreenProps>(({ navigation, route }) => {
  const [numColumns, setNumColumns] = useState(0);
  const [tableName, setTableName] = useState('');
  const { control, handleSubmit, watch  } = useForm();

  // Watch columns so that form updates correctly when numColumns changes
  const columns = watch('columns');

  const onSubmit = useCallback(async (data: any) => {
    const columnArray = data.columns;
    // Validate column data against Zod schema
    const validation = tableSchema.safeParse(columnArray);
    if (validation.success) {
      console.log('Table data is valid:', validation.data);
      createTable(tableName, validation.data);
    } else {
      console.log('Validation failed:', validation.error);
    }
  }, [tableName]);

  // Memoize the generated inputs for better performance
  const generateInputs = useMemo(() => {
    return Array.from({ length: numColumns }).map((_, i) => (
      <View key={i}>
        <Text>Column {i + 1}</Text>
        
        {/* Input for Column Name */}
        <Controller
          control={control}
          name={`columns[${i}].name`}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder={`Column Name ${i + 1}`}
              onChangeText={onChange}
              value={value || ''}
            />
          )}
        />

        {/* Dropdown for Column Type */}
        <Controller
          control={control}
          name={`columns[${i}].type`}
          render={({ field: { onChange, value } }) => (
            <Picker
              selectedValue={value || columnTypes[0]}
              onValueChange={onChange}>
              {columnTypes.map(type => (
                <Picker.Item key={type} label={type} value={type} />
              ))}
            </Picker>
          )}
        />
      </View>
    ));
  }, [control, numColumns]);
  
  return (
    <ScrollView>
      <View style={{ padding: 20 }}>
        <TextInput
          placeholder="Enter Table Name"
          onChangeText={text => setTableName(text)}
        />
        <TextInput
          placeholder="Enter number of columns"
          keyboardType="numeric"
          onChangeText={text => setNumColumns(parseInt(text) || 0)}
        />

        {generateInputs}

        <Button title="Create Table" onPress={handleSubmit(onSubmit)} />
      </View>
    </ScrollView>
  );
});