import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import { Calendar } from 'react-native-calendars'
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../assets/theme/theme';
import { StyleText } from '../TextComponents';

export default function CalendarButton({fecha, changeFecha}) {
    const [showCalendar, setShowCalendar] = useState(false);
    const [selected, setSelected] = useState('')
    const changeCalendar=()=>{
        setShowCalendar(!showCalendar);
    }
    return (
    <View>
        <TouchableOpacity onPress={changeCalendar} style={styles.mainContainer}>
            <MaterialIcons name='calendar-today' size={20} color={COLORS.negro} />
            <StyleText style={{marginHorizontal:5}}>{fecha}</StyleText>
        </TouchableOpacity>
        {
            showCalendar ? 
            <Modal 
                animationType='slide'
                transparent={true}
                visible={showCalendar}
                >
                <View style={styles.containerFecha}>
                    <Calendar
                        style={{padding : 10, borderRadius : 10}}
                        onDayPress={day=>{
                            const currentDate = day['dateString'];
                            changeFecha(currentDate);
                            setSelected(currentDate);
                            changeCalendar();

                        }}
                        theme={{
                            todayTextColor : COLORS.negro,
                            dayTextColor : COLORS.negro
                        }}
                        markedDates={{
                            [selected] : {selected : true, disableTouchEvent : true, selectedColor : COLORS.azul}
                        }}
                    />
                </View>
            </Modal> : null
        }
    </View>
  )
};
const styles = StyleSheet.create({
    "mainContainer":{
        flexDirection : 'row',
        height : 60,
        alignItems : 'center'
    },
    "containerFecha":{
        flex : 1,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    }
})