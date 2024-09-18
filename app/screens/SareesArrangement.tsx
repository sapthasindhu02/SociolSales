import React, { useCallback, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Text, View } from "react-native";
import { SareesArrangementProps } from '../utils/types';

export const SareesArrangement = React.memo<SareesArrangementProps>(({navigation}) => {
    //load table information should get no.of columns
    const loadTableData:any = useMemo(() => {
        const columnsinShop = getRowCount();
        return columns;
      }, []);
    const data = loadTableData();

    return (
    <View>
    </View>);
});