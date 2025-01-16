// src/index.ts

// Platform
export { default as PlatformManager } from './platform/platform';
export { VersionManager } from './platform/version';

// Device
export { default as DeviceInfoManager } from './device/deviceInfo';
export { OrientationManager, useOrientation } from './device/orientation';

// Keyboard
export { useKeyboard } from './keyboard/useKeyboard';
export { KeyboardManager } from './keyboard/keyboardManager';

// Dimensions
export { useWindowDimensions } from './dimensions/useWindowDimensions';
export { useResponsive } from './dimensions/useResponsive';
export { useSafeArea, getSafeAreaPadding } from './dimensions/useSafeArea';

// Notch and Display Cutouts
export { NotchHelper } from './notch/notchHelper';

// Scaling
export {
    scaleWidth,
    scaleHeight,
    horizontalScale,
    verticalScale,
    moderateScale,
    pixelsToDp,
    dpToPixels,
    getPixelRatio,
    getFontScale,
    scaleText,
    screenWidth,
    screenHeight,
} from './scaling/scaling';

// Types
export type { DeviceInfo } from './device/deviceInfo';
export type { PlatformInfo } from './platform/platform';
export type { Orientation } from './device/orientation';
export type { DisplayCutout } from './notch/notchHelper';
export type { WindowDimensions } from './dimensions/useWindowDimensions';

// Re-export hooks for easier access
export * from './hooks';