import { Keyboard, Platform, KeyboardEvent } from 'react-native';

export class KeyboardManager {
    /**
     * Add listener for keyboard show events
     */
    static addShowListener(callback: (event: KeyboardEvent) => void) {
        const eventName = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
        return Keyboard.addListener(eventName, callback);
    }

    /**
     * Add listener for keyboard hide events
     */
    static addHideListener(callback: (event: KeyboardEvent) => void) {
        const eventName = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
        return Keyboard.addListener(eventName, callback);
    }

    /**
     * Dismiss keyboard
     */
    static dismiss() {
        Keyboard.dismiss();
    }

    /**
     * Schedule keyboard dismiss
     */
    static scheduleDismiss(delay = 0) {
        setTimeout(() => {
            Keyboard.dismiss();
        }, delay);
    }

    /**
     * Get keyboard height for a specific event
     */
    static getKeyboardHeight(event: KeyboardEvent): number {
        return event.endCoordinates.height;
    }

    /**
     * Get keyboard animation duration
     */
    static getAnimationDuration(event: KeyboardEvent): number {
        return event.duration;
    }

    /**
     * Safely check if input accessory view is supported
     */
    static supportsInputAccessoryView(): boolean {
        // Only relevant for iOS
        if (Platform.OS !== 'ios') return false;

        // Check if the device is modern iOS that typically supports this feature
        const majorVersionString = String(Platform.Version);
        const majorVersion = parseInt(majorVersionString, 10);
        return majorVersion >= 12;
    }

    /**
     * Add keyboard change listener for Android
     */
    static addAndroidSoftInputListener(callback: (isOpen: boolean) => void) {
        if (Platform.OS !== 'android') return { remove: () => { } };

        const showListener = Keyboard.addListener('keyboardDidShow', () => {
            callback(true);
        });

        const hideListener = Keyboard.addListener('keyboardDidHide', () => {
            callback(false);
        });

        return {
            remove: () => {
                showListener.remove();
                hideListener.remove();
            }
        };
    }

    /**
     * Check if keyboard is avoiding view (iOS only)
     */
    static isAvoidingView(): boolean {
        return Platform.OS === 'ios';
    }

    /**
     * Get default keyboard behavior for platform
     */
    static getDefaultBehavior() {
        return Platform.select({
            ios: 'padding',
            android: 'height',
        });
    }
}