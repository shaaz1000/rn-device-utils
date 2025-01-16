// src/device/orientation.ts

import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

export type Orientation = 'portrait' | 'landscape';

export const useOrientation = () => {
    const [orientation, setOrientation] = useState<Orientation>(() => {
        const { width, height } = Dimensions.get('window');
        return width > height ? 'landscape' : 'portrait';
    });

    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', ({ window }) => {
            const newOrientation = window.width > window.height ? 'landscape' : 'portrait';
            setOrientation(newOrientation);
        });

        return () => subscription?.remove();
    }, []);

    return orientation;
};

export class OrientationManager {
    static getOrientation(): Orientation {
        const { width, height } = Dimensions.get('window');
        return width > height ? 'landscape' : 'portrait';
    }

    static isPortrait(): boolean {
        return OrientationManager.getOrientation() === 'portrait';
    }

    static isLandscape(): boolean {
        return OrientationManager.getOrientation() === 'landscape';
    }

    static getDimensionsForOrientation(): { width: number; height: number } {
        const { width, height } = Dimensions.get('window');
        return OrientationManager.isPortrait()
            ? { width, height }
            : { width: height, height: width };
    }
}