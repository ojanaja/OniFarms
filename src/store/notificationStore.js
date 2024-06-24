import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const notificationStore = create((set) => ({
    notifications: [],
    addNotification: (notification) => set((state) => ({ notifications: [...state.notifications, notification] })),
    removeNotification: (id) => set((state) => ({ notifications: state.notifications.filter(n => n.id !== id) })),
    setNotifications: (notifications) => set({ notifications }),

    // Async function to save notifications state
    saveNotifications: async (notifications) => {
        try {
            await AsyncStorage.setItem('notifications', JSON.stringify(notifications));
        } catch (error) {
            console.error('Failed to save notifications', error);
        }
    },
    // Async function to load notifications state
    loadNotifications: async () => {
        try {
            const storedNotifications = await AsyncStorage.getItem('notifications');
            if (storedNotifications) {
                set({ notifications: JSON.parse(storedNotifications) });
            }
        } catch (error) {
            console.error('Failed to load notifications', error);
        }
    },
}));