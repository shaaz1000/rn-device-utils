// src/notch/notchHelper.ts

import { Platform } from 'react-native';
import DeviceInfoManager from '../device/deviceInfo';

export interface DisplayCutout {
    type: 'notch' | 'dynamicIsland' | 'none';
    topInset: number;
    bottomInset: number;
}

export class NotchHelper {
    private static deviceInfo = DeviceInfoManager.getInstance();

    /**
     * Get display cutout information
     */
    static getDisplayCutout(): DisplayCutout {
        const { hasNotch, hasDynamicIsland } = this.deviceInfo.getDeviceInfo();

        if (hasDynamicIsland) {
            return {
                type: 'dynamicIsland',
                topInset: 59, // Dynamic Island height
                bottomInset: 34 // Home indicator height
            };
        }

        if (hasNotch) {
            return {
                type: 'notch',
                topInset: 44, // Regular notch height
                bottomInset: 34 // Home indicator height
            };
        }

        return {
            type: 'none',
            topInset: Platform.OS === 'ios' ? 20 : 0, // Regular status bar height
            bottomInset: 0
        };
    }

    /**
     * Get safe padding for current device
     */
    static getSafePadding(): { top: number; bottom: number } {
        const { topInset, bottomInset } = this.getDisplayCutout();
        return {
            top: topInset,
            bottom: bottomInset
        };
    }

    /**
     * Check if device has any display cutout
     */
    static hasDisplayCutout(): boolean {
        const { type } = this.getDisplayCutout();
        return type !== 'none';
    }

    /**
     * Get status bar height considering display cutouts
     */
    static getStatusBarHeight(): number {
        const { topInset } = this.getDisplayCutout();
        return topInset;
    }
}