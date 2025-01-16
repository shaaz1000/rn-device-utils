// src/platform/version.ts

import { Platform } from 'react-native';

export class VersionManager {
    /**
     * Parse version string into major, minor, and patch
     */
    static parseVersion(version: string): { major: number; minor: number; patch: number } {
        const parts = version.split('.');
        return {
            major: parseInt(parts[0] || '0', 10),
            minor: parseInt(parts[1] || '0', 10),
            patch: parseInt(parts[2] || '0', 10),
        };
    }

    /**
     * Compare version strings
     * @returns -1 if v1 < v2, 0 if v1 = v2, 1 if v1 > v2
     */
    static compareVersions(v1: string, v2: string): number {
        const v1Parts = VersionManager.parseVersion(v1);
        const v2Parts = VersionManager.parseVersion(v2);

        if (v1Parts.major !== v2Parts.major) {
            return v1Parts.major > v2Parts.major ? 1 : -1;
        }
        if (v1Parts.minor !== v2Parts.minor) {
            return v1Parts.minor > v2Parts.minor ? 1 : -1;
        }
        if (v1Parts.patch !== v2Parts.patch) {
            return v1Parts.patch > v2Parts.patch ? 1 : -1;
        }
        return 0;
    }

    /**
     * Check if current platform version is at least the specified version
     */
    static isAtLeast(version: string): boolean {
        const currentVersion = String(Platform.Version);
        return VersionManager.compareVersions(currentVersion, version) >= 0;
    }

    /**
     * Get current platform version
     */
    static getCurrentVersion(): string {
        return String(Platform.Version);
    }
}