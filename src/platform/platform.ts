// src/platform/platform.ts

import { Platform, PlatformOSType, Dimensions } from 'react-native';

export interface PlatformInfo {
    OS: PlatformOSType;
    Version: number | string;
    isIOS: boolean;
    isAndroid: boolean;
    isWeb: boolean;
    isMobile: boolean;
    isDesktop: boolean;
    isTV: boolean;
    isTablet: boolean;
    majorVersion: number;
    minorVersion: number;
}

class PlatformManager {
    private static instance: PlatformManager;
    private platformInfo: PlatformInfo;

    private constructor() {
        const version = Platform.Version.toString();
        const [major, minor] = this.parseVersion(version);

        this.platformInfo = {
            OS: Platform.OS,
            Version: Platform.Version,
            isIOS: Platform.OS === 'ios',
            isAndroid: Platform.OS === 'android',
            isWeb: Platform.OS === 'web',
            isMobile: Platform.OS === 'ios' || Platform.OS === 'android',
            isDesktop: Platform.OS === 'windows' || Platform.OS === 'macos',
            isTV: this.checkIsTV(),
            isTablet: this.checkIsTablet(),
            majorVersion: major,
            minorVersion: minor,
        };
    }

    private parseVersion(version: string): [number, number] {
        if (Platform.OS === 'ios') {
            const parts = version.split('.');
            return [parseInt(parts[0] || '0', 10), parseInt(parts[1] || '0', 10)];
        } else {
            return [parseInt(version, 10), 0];
        }
    }

    private checkIsTablet(): boolean {
        const { width, height } = Dimensions.get('window');
        const screenSize = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

        if (Platform.OS === 'ios') {
            // Check for iPad idiom in iOS
            const platformConstants = Platform.constants as any;
            const interfaceIdiom = platformConstants?.interfaceIdiom;
            return interfaceIdiom === 'pad';
        }

        if (Platform.OS === 'android') {
            // Use screen size and density for Android
            // Typically, tablets are considered to have a screen size >= 600dp
            const pixelDensity = Dimensions.get('window').scale;
            const dpWidth = width / pixelDensity;
            return dpWidth >= 600;
        }

        return false;
    }

    private checkIsTV(): boolean {
        if (Platform.OS === 'ios') {
            const platformConstants = Platform.constants as any;
            return platformConstants?.interfaceIdiom === 'tv';
        }

        if (Platform.OS === 'android') {
            const platformConstants = Platform.constants as any;
            return platformConstants?.uiMode?.includes('tv') || false;
        }

        return false;
    }

    public static getInstance(): PlatformManager {
        if (!PlatformManager.instance) {
            PlatformManager.instance = new PlatformManager();
        }
        return PlatformManager.instance;
    }

    /**
     * Get platform specific value
     */
    public select<T>(config: {
        ios?: T;
        android?: T;
        web?: T;
        default?: T;
    }): T | undefined {
        if (Platform.OS === 'ios' && config.ios !== undefined) return config.ios;
        if (Platform.OS === 'android' && config.android !== undefined) return config.android;
        if (Platform.OS === 'web' && config.web !== undefined) return config.web;
        return config.default;
    }

    /**
     * Get platform info
     */
    public getPlatformInfo(): PlatformInfo {
        return this.platformInfo;
    }

    /**
     * Check if device meets minimum iOS version
     */
    public isAtLeastiOS(version: string): boolean {
        if (!this.platformInfo.isIOS) return false;
        const [majorRequired, minorRequired] = version.split('.').map(Number);
        return this.platformInfo.majorVersion > majorRequired ||
            (this.platformInfo.majorVersion === majorRequired &&
                this.platformInfo.minorVersion >= minorRequired);
    }

    /**
     * Check if device meets minimum Android version
     */
    public isAtLeastAndroid(apiLevel: number): boolean {
        if (!this.platformInfo.isAndroid) return false;
        return this.platformInfo.majorVersion >= apiLevel;
    }

    /**
     * Get safe platform specific style property
     */
    public getStyleProperty<T>(ios: T, android: T): T {
        return Platform.select({ ios, android }) as T;
    }

    /**
     * Get platform specific dimensions
     */
    public getDimensions() {
        return {
            window: Dimensions.get('window'),
            screen: Dimensions.get('screen'),
        };
    }

    /**
     * Check if platform is running on a large screen device
     */
    public isLargeScreen(): boolean {
        const { width, height } = Dimensions.get('window');
        return Math.min(width, height) >= 768;
    }
}

export default PlatformManager;