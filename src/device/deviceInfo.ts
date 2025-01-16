// src/device/deviceInfo.ts

import { Platform, Dimensions, NativeModules } from 'react-native';

export interface DeviceInfo {
    isIOS: boolean;
    isAndroid: boolean;
    isTablet: boolean;
    isTV: boolean;
    isLandscape: boolean;
    hasNotch: boolean;
    hasDynamicIsland: boolean;
    deviceType: 'phone' | 'tablet' | 'tv' | 'unknown';
    deviceName: string;
    systemVersion: string;
    bundleId: string;
    buildNumber: string;
    version: string;
    brand: string;
    model: string;
}

const { width, height } = Dimensions.get('window');

// Updated device lists
const NOTCH_DEVICES = [
    'iPhone X', 'iPhone XS', 'iPhone XS Max', 'iPhone XR',
    'iPhone 11', 'iPhone 11 Pro', 'iPhone 11 Pro Max',
    'iPhone 12', 'iPhone 12 Mini', 'iPhone 12 Pro', 'iPhone 12 Pro Max',
    'iPhone 13', 'iPhone 13 Mini', 'iPhone 13 Pro', 'iPhone 13 Pro Max',
    'iPhone 14', 'iPhone 14 Plus'
];

const DYNAMIC_ISLAND_DEVICES = [
    'iPhone 14 Pro', 'iPhone 14 Pro Max',
    'iPhone 15 Pro', 'iPhone 15 Pro Max',
    'iPhone 16 Pro', 'iPhone 16 Pro Max'
];

class DeviceInfoManager {
    private static instance: DeviceInfoManager;
    private deviceInfo: DeviceInfo;

    private constructor() {
        const { Brand = '', Model = '' } = NativeModules.DeviceInfo || {};

        this.deviceInfo = {
            isIOS: Platform.OS === 'ios',
            isAndroid: Platform.OS === 'android',
            isTablet: this.isTabletDevice(),
            isTV: this.isTVDevice(),
            isLandscape: width > height,
            hasNotch: this.checkHasNotch(),
            hasDynamicIsland: this.checkHasDynamicIsland(),
            deviceType: this.getDeviceType(),
            deviceName: Brand || this.getIOSDeviceName(),
            systemVersion: String(Platform.Version),
            bundleId: '',  // Implement per platform
            buildNumber: '', // Implement per platform
            version: '', // Implement per platform
            brand: Brand || 'Apple',
            model: Model || this.getIOSDeviceName(),
        };
    }

    private isTabletDevice(): boolean {
        // Android
        if (Platform.OS === 'android') {
            return width >= 600;
        }
        // iOS
        const platformConstants = Platform.constants as any;
        return platformConstants?.interfaceIdiom === 'pad';
    }

    private isTVDevice(): boolean {
        if (Platform.OS === 'android') {
            const platformConstants = Platform.constants as any;
            return platformConstants?.uiMode?.includes('tv');
        }
        // iOS
        const platformConstants = Platform.constants as any;
        return platformConstants?.interfaceIdiom === 'tv';
    }

    private getIOSDeviceName(): string {
        const platformConstants = Platform.constants as any;
        return platformConstants?.systemName || 'iOS Device';
    }

    public static getInstance(): DeviceInfoManager {
        if (!DeviceInfoManager.instance) {
            DeviceInfoManager.instance = new DeviceInfoManager();
        }
        return DeviceInfoManager.instance;
    }

    private checkHasNotch(): boolean {
        if (!this.deviceInfo?.isIOS) return false;

        // For iOS devices
        const platformConstants = Platform.constants as any;
        const model = platformConstants?.systemName || '';

        return NOTCH_DEVICES.some(device => model.includes(device));
    }

    private checkHasDynamicIsland(): boolean {
        if (!this.deviceInfo?.isIOS) return false;

        // For iOS devices
        const platformConstants = Platform.constants as any;
        const model = platformConstants?.systemName || '';

        return DYNAMIC_ISLAND_DEVICES.some(device => model.includes(device));
    }

    private getDeviceType(): 'phone' | 'tablet' | 'tv' | 'unknown' {
        if (this.isTVDevice()) return 'tv';
        if (this.isTabletDevice()) return 'tablet';
        if (Platform.OS === 'ios' || Platform.OS === 'android') return 'phone';
        return 'unknown';
    }

    public getDeviceInfo(): DeviceInfo {
        return this.deviceInfo;
    }

    public isPhone(): boolean {
        return this.deviceInfo.deviceType === 'phone';
    }

    public hasDisplayCutout(): boolean {
        return this.deviceInfo.hasNotch || this.deviceInfo.hasDynamicIsland;
    }

    /**
     * Get safe area for display cutouts (notch or dynamic island)
     */
    public getDisplayCutoutInsets(): { top: number; bottom: number } {
        // Default insets
        let topInset = 0;
        let bottomInset = 0;

        if (this.deviceInfo.isIOS) {
            if (this.deviceInfo.hasDynamicIsland) {
                topInset = 59; // Dynamic Island height
            } else if (this.deviceInfo.hasNotch) {
                topInset = 44; // Standard notch height
            }

            // Bottom inset for home indicator
            bottomInset = 34;
        }

        return { top: topInset, bottom: bottomInset };
    }

    /**
     * Get status bar height considering display cutouts
     */
    public getStatusBarHeight(): number {
        if (this.deviceInfo.isIOS) {
            if (this.deviceInfo.hasDynamicIsland) {
                return 54; // Height for Dynamic Island devices
            }
            if (this.deviceInfo.hasNotch) {
                return 44; // Height for notch devices
            }
            return 20; // Standard iOS status bar height
        }

        // For Android, you might want to get this from StatusBar.currentHeight
        return 24; // Default Android status bar height
    }
}

export default DeviceInfoManager;