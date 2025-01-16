import { useWindowDimensions } from 'react-native';
import { scaleWidth, scaleHeight, moderateScale } from '../scaling/scaling';

interface ResponsiveOptions {
    width?: number;
    height?: number;
    scale?: number;
}

export const useResponsive = (options?: ResponsiveOptions) => {
    const { width, height } = useWindowDimensions();
    const baseWidth = options?.width || 375;
    const baseHeight = options?.height || 812;
    const scaleFactor = options?.scale || 0.5;

    return {
        /**
         * Scale width based on screen size
         */
        widthScale: (size: number) => {
            return (width / baseWidth) * size;
        },

        /**
         * Scale height based on screen size
         */
        heightScale: (size: number) => {
            return (height / baseHeight) * size;
        },

        /**
         * Scale size moderately based on screen width
         */
        moderateScale: (size: number) => {
            return size + ((width / baseWidth) * size - size) * scaleFactor;
        },

        /**
         * Get responsive value based on screen size
         */
        getValue: (small: number, medium: number, large: number) => {
            if (width <= 320) return small;
            if (width <= 375) return medium;
            return large;
        },

        /**
         * Get font size based on screen size
         */
        getFontSize: (size: number) => {
            return moderateScale(size, 0.3);
        },

        /**
         * Get dimension percentage
         */
        getPercentage: (percentage: number, based: 'width' | 'height' = 'width') => {
            return based === 'width' ? (width * percentage) / 100 : (height * percentage) / 100;
        },

        /**
         * Check if device is small
         */
        isSmallDevice: width <= 320,

        /**
         * Check if device is medium
         */
        isMediumDevice: width > 320 && width <= 375,

        /**
         * Check if device is large
         */
        isLargeDevice: width > 375,

        /**
         * Screen dimensions
         */
        dimensions: {
            width,
            height,
            aspectRatio: width / height,
        },
    };
};