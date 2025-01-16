import { useEffect, useState } from 'react';
import { Keyboard, KeyboardEvent, LayoutAnimation, Platform } from 'react-native';

interface KeyboardInfo {
    keyboardHeight: number;
    keyboardVisible: boolean;
    keyboardAnimationDuration: number;
}

export const useKeyboard = (enableAnimation = true) => {
    const [keyboardInfo, setKeyboardInfo] = useState<KeyboardInfo>({
        keyboardHeight: 0,
        keyboardVisible: false,
        keyboardAnimationDuration: 250,
    });

    useEffect(() => {
        const handleKeyboardShow = (event: KeyboardEvent) => {
            if (enableAnimation) {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            }

            setKeyboardInfo({
                keyboardHeight: event.endCoordinates.height,
                keyboardVisible: true,
                keyboardAnimationDuration: event.duration,
            });
        };

        const handleKeyboardHide = (event: KeyboardEvent) => {
            if (enableAnimation) {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            }

            setKeyboardInfo({
                keyboardHeight: 0,
                keyboardVisible: false,
                keyboardAnimationDuration: event.duration,
            });
        };

        // Platform-specific event names
        const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
        const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

        // Add event listeners
        const showSubscription = Keyboard.addListener(showEvent, handleKeyboardShow);
        const hideSubscription = Keyboard.addListener(hideEvent, handleKeyboardHide);

        // Cleanup
        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, [enableAnimation]);

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const isAvoidingView = Platform.OS === 'ios';

    return {
        ...keyboardInfo,
        dismissKeyboard,
        isAvoidingView,
        defaultBehavior: Platform.select({
            ios: 'padding',
            android: 'height',
        }),
    };
};