import { useEffect, useState } from 'react';
import { NativeModules, Platform } from 'react-native';

interface SafeAreaInsets {
    top: number;
    bottom: number;
    left: number;
    right: number;
}

export const useSafeArea = () => {
    const [safeArea, setSafeArea] = useState<SafeAreaInsets>({
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    });

    useEffect(() => {
        if (Platform.OS === 'ios') {
            NativeModules.SafeArea?.getSafeAreaInsets().then((insets: SafeAreaInsets) => {
                setSafeArea(insets);
            });
        }
    }, []);

    return safeArea;
};

export const getSafeAreaPadding = (position: keyof SafeAreaInsets): number => {
    if (Platform.OS === 'ios') {
        const insets = NativeModules.SafeArea?.getConstants();
        return insets?.[position] || 0;
    }
    return 0;
};