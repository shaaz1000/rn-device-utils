// src/dimensions/useWindowDimensions.ts

import { useEffect, useState } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

export interface WindowDimensions extends ScaledSize {
    isPortrait: boolean;
    isLandscape: boolean;
}

export const useWindowDimensions = () => {
    const [dimensions, setDimensions] = useState<WindowDimensions>(() => {
        const window = Dimensions.get('window');
        return {
            ...window,
            isPortrait: window.height > window.width,
            isLandscape: window.width > window.height,
        };
    });

    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', ({ window }) => {
            setDimensions({
                ...window,
                isPortrait: window.height > window.width,
                isLandscape: window.width > window.height,
            });
        });

        return () => subscription?.remove();
    }, []);

    return dimensions;
};