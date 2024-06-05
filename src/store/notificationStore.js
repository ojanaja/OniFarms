import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const notificationStore = create((set) => ({
    notifications: 0,
    increaseNotifications: () => set((state) => ({ notifications: state.notifications + 1 })),
    removeAllNotifications: () => set({ notifications: 0 }),
    updateNotifications: (newNotifications) => set({ notifications: newNotifications }),
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
