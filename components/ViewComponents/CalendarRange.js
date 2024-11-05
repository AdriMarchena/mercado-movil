import React, { useState, useEffect } from 'react';
import {Calendar} from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import { COLORS } from '../../assets/theme/theme'

// Esto debe definirse al iniciar la aplicación:

const localeConfig = {
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ],
  monthNamesShort: [
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dic'
  ],
  dayNames: [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado'
  ],
  dayNamesShort: [
    'Dom',
    'Lun',
    'Mar',
    'Mié',
    'Jue',
    'Vie',
    'Sáb'
  ],
  today: 'Hoy'
};


LocaleConfig.locales['es'] = localeConfig;
LocaleConfig.defaultLocale = 'es';


export default function CalendarRange({startDateProp, endDateProp, changeDates}) {
    
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [markedDates, setMarkedDates] = useState({});

    useEffect(() => {
        if (startDateProp && endDateProp) {
            const newMarkedDates = getDatesRange(startDateProp, endDateProp);
            setMarkedDates(newMarkedDates);
        }
    }, [startDateProp, endDateProp]);
    
    
    const onDayPress = (day) => {
        if (!startDate || (startDate && endDate)) {
            setEndDate('');
            setStartDate(day.dateString);
            setMarkedDates({
                [day.dateString]: { startingDay: true, endingDay: true, color: COLORS.naranja, textColor: COLORS.blanco },
            });
        } else {
            setEndDate(day.dateString);
            let newMarkedDates = getDatesRange(startDate, day.dateString);
            setMarkedDates(newMarkedDates);
        };
    };

    const getDatesRange = (start, end) => {
        changeDates(start, end);
        let dates = {};
        let currDate = start;
        let lastDate = end;
        let dayMillis = 24 * 60 * 60 * 1000;
        dates[currDate] = { startingDay: true, color: COLORS.naranja, textColor: COLORS.blanco };

        while (currDate < lastDate) {
            let nextDate = new Date(new Date(currDate).getTime() + dayMillis).toISOString().split('T')[0];
            if (nextDate < lastDate) {
                dates[nextDate] = { color: COLORS.naranja, textColor: COLORS.blanco };
            } else {
                dates[nextDate] = { endingDay: true, color: COLORS.naranja, textColor: COLORS.blanco };
            }
            currDate = nextDate;
        }
        return dates;
    };
    
    return (
        <Calendar
            markingType={'period'}
            markedDates={markedDates}
            onDayPress={(day) => onDayPress(day)}
            theme={{
                textSectionTitleColor: COLORS.negro,
                todayTextColor: COLORS.naranja,
                dayTextColor: COLORS.negro,
                arrowColor: COLORS.naranja,
                monthTextColor: COLORS.negro,
            }}
        />
    )
};