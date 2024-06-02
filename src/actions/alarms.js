import AsyncStorage from '@react-native-async-storage/async-storage';
import { ADD_ALARM, DELETE_ALARM } from './index';

export const addAlarm = alarm => async dispatch => {
    try {
        const storedAlarms = await AsyncStorage.getItem('alarms');
        const alarms = storedAlarms ? JSON.parse(storedAlarms) : [];
        alarms.push(alarm);
        await AsyncStorage.setItem('alarms', JSON.stringify(alarms));
        console.log('Alarm Masuk Async');
        dispatch({
            type: ADD_ALARM,
            payload: alarm,
        });
    } catch (error) {
        console.error('Failed to add alarm to AsyncStorage', error);
    }
};

export const deleteAlarm = alarmId => async dispatch => {
    try {
        const storedAlarms = await AsyncStorage.getItem('alarms');
        let alarms = storedAlarms ? JSON.parse(storedAlarms) : [];
        alarms = alarms.filter(alarm => alarm.id !== alarmId);
        await AsyncStorage.setItem('alarms', JSON.stringify(alarms));
        dispatch({
            type: DELETE_ALARM,
            payload: alarmId,
        });
    } catch (error) {
        console.error('Failed to delete alarm from AsyncStorage', error);
    }
};

export const loadAlarms = () => async dispatch => {
    try {
        const storedAlarms = await AsyncStorage.getItem('alarms');
        const alarms = storedAlarms ? JSON.parse(storedAlarms) : [];
        alarms.forEach(alarm => {
            dispatch({
                type: ADD_ALARM,
                payload: alarm,
            });
        });
    } catch (error) {
        console.error('Failed to load alarms from AsyncStorage', error);
    }
};


