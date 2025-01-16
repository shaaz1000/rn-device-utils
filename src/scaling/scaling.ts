// src/scaling/scaling.ts

import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base dimensions for scaling (based on standard iPhone 11 Pro)
const baseWidth = 375;
const baseHeight = 812;

// Guideline sizes based on iPhone 11 Pro
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

export const screenWidth = SCREEN_WIDTH;
export const screenHeight = SCREEN_HEIGHT;

/**
 * Scale a size based on screen width
 */
export const scaleWidth = (size: number): number => {
    return (SCREEN_WIDTH / baseWidth) * size;
};

/**
 * Scale a size based on screen height
 */
export const scaleHeight = (size: number): number => {
    return (SCREEN_HEIGHT / baseHeight) * size;
};

/**
 * Scale a size horizontally based on guideline width
 */
export const horizontalScale = (size: number): number => {
    return (SCREEN_WIDTH / guidelineBaseWidth) * size;
};

/**
 * Scale a size vertically based on guideline height
 */
export const verticalScale = (size: number): number => {
    return (SCREEN_HEIGHT / guidelineBaseHeight) * size;
};

/**
 * Scale a size moderately based on screen width
 */
export const moderateScale = (size: number, factor = 0.5): number => {
    return size + (horizontalScale(size) - size) * factor;
};

/**
 * Convert pixels to DP
 */
export const pixelsToDp = (pixels: number): number => {
    return PixelRatio.roundToNearestPixel(pixels);
};

/**
 * Convert DP to pixels
 */
export const dpToPixels = (dp: number): number => {
    return PixelRatio.getPixelSizeForLayoutSize(dp);
};

/**
 * Get pixel ratio for the device
 */
export const getPixelRatio = (): number => {
    return PixelRatio.get();
};

/**
 * Get font scale for the device
 */
export const getFontScale = (): number => {
    return PixelRatio.getFontScale();
};

/**
 * Scale text size based on font scale
 */
export const scaleText = (size: number): number => {
    const fontScale = getFontScale();
    return Math.round(size * fontScale);
};