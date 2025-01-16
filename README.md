# @shaaz1000/rn-device-utils

A comprehensive utility package for React Native applications that handles device information, responsive design, keyboard management, and platform-specific features.

## Features

- 📱 Complete device information and detection
- 📐 Responsive scaling utilities
- ⌨️ Advanced keyboard handling
- 🔍 Notch & Dynamic Island detection
- 💫 Safe area utilities
- 📏 Window dimension hooks
- 🎯 Platform-specific utilities
- 🔄 Orientation management
- 📦 Version management
- 📱 Dynamic Island support

## Installation

```bash
# Using npm
npm install @shaaz1000/rn-device-utils

# Using yarn
yarn add @shaaz1000/rn-device-utils
```

## Core Features

### 1. Device Information

```typescript
import { DeviceInfoManager } from '@shaaz1000/rn-device-utils';

const deviceInfo = DeviceInfoManager.getInstance();

// Get device details
const info = deviceInfo.getDeviceInfo();
console.log(info.isTablet); // true/false
console.log(info.hasNotch); // true/false
console.log(info.hasDynamicIsland); // true/false

// Check if device has any display cutout
const hasCutout = deviceInfo.hasDisplayCutout();

// Get status bar height considering cutouts
const statusBarHeight = deviceInfo.getStatusBarHeight();
```

### 2. Responsive Scaling

```typescript
import { 
  scaleWidth, 
  scaleHeight, 
  moderateScale,
  horizontalScale,
  verticalScale,
  pixelsToDp,
  dpToPixels,
  getPixelRatio,
  getFontScale,
  scaleText 
} from '@shaaz1000/rn-device-utils';

const styles = StyleSheet.create({
  container: {
    width: scaleWidth(300),
    height: scaleHeight(200),
    padding: moderateScale(10),
    marginHorizontal: horizontalScale(20),
    marginVertical: verticalScale(10)
  },
  text: {
    fontSize: scaleText(16)
  }
});

// Convert measurements
const dpValue = pixelsToDp(100);
const pixelValue = dpToPixels(50);
const devicePixelRatio = getPixelRatio();
const systemFontScale = getFontScale();
```

### 3. Keyboard Management

```typescript
import { useKeyboard, KeyboardManager } from '@shaaz1000/rn-device-utils';

function MyComponent() {
  const { 
    keyboardHeight, 
    keyboardVisible, 
    dismissKeyboard,
    keyboardAnimationDuration,
    isAvoidingView,
    defaultBehavior 
  } = useKeyboard();

  // Using KeyboardManager directly
  KeyboardManager.addShowListener((event) => {
    const height = KeyboardManager.getKeyboardHeight(event);
    const duration = KeyboardManager.getAnimationDuration(event);
  });

  return (
    <KeyboardAvoidingView 
      behavior={defaultBehavior}
      enabled={isAvoidingView}
      style={{ paddingBottom: keyboardVisible ? keyboardHeight : 0 }}
    >
      {/* Your content */}
    </KeyboardAvoidingView>
  );
}
```

### 4. Safe Area & Notch/Dynamic Island Handling

```typescript
import { useSafeArea, NotchHelper } from '@shaaz1000/rn-device-utils';

function MyComponent() {
  const safeArea = useSafeArea();
  const displayCutout = NotchHelper.getDisplayCutout();

  // Get specific display cutout info
  const { type, topInset, bottomInset } = displayCutout;
  const isNotch = type === 'notch';
  const isDynamicIsland = type === 'dynamicIsland';

  // Get safe padding
  const padding = NotchHelper.getSafePadding();

  return (
    <View style={{
      paddingTop: safeArea.top,
      paddingBottom: safeArea.bottom,
      // Handle notch or dynamic island
      marginTop: displayCutout.topInset
    }}>
      {/* Your content */}
    </View>
  );
}
```

### 5. Responsive Design Hook

```typescript
import { useResponsive } from '@shaaz1000/rn-device-utils';

function MyComponent() {
  const responsive = useResponsive();

  const fontSize = responsive.getFontSize(16);
  const isSmall = responsive.isSmallDevice;
  const percentage = responsive.getPercentage(50); // 50% of screen width

  // Get responsive values based on screen size
  const padding = responsive.getValue(10, 15, 20); // small, medium, large devices

  return (
    <View style={{
      width: responsive.widthScale(300),
      padding: responsive.moderateScale(10)
    }}>
      <Text style={{ fontSize }}>
        {isSmall ? 'Small Device' : 'Regular Device'}
      </Text>
    </View>
  );
}
```

### 6. Platform Utilities

```typescript
import { PlatformManager, VersionManager } from '@shaaz1000/rn-device-utils';

const platform = PlatformManager.getInstance();

// Platform-specific values
const padding = platform.select({
  ios: 20,
  android: 16,
  default: 10
});

// Version checking
if (platform.isAtLeastiOS('15.0')) {
  // Use iOS 15+ features
}

// Version comparison
const isNewer = VersionManager.compareVersions('1.2.0', '1.1.0'); // Returns 1
const isSupported = VersionManager.isAtLeast('15.0');

// Get platform info
const info = platform.getPlatformInfo();
console.log(info.isTablet, info.isTV, info.majorVersion);
```

### 7. Orientation Management

```typescript
import { useOrientation, OrientationManager } from '@shaaz1000/rn-device-utils';

function MyComponent() {
  const orientation = useOrientation();
  
  // Or use the manager directly
  const isPortrait = OrientationManager.isPortrait();
  const dimensions = OrientationManager.getDimensionsForOrientation();

  return (
    <View style={{
      flexDirection: orientation === 'portrait' ? 'column' : 'row',
      width: dimensions.width,
      height: dimensions.height
    }}>
      {/* Your content */}
    </View>
  );
}
```

### 8. Window Dimensions

```typescript
import { useWindowDimensions } from '@shaaz1000/rn-device-utils';

function MyComponent() {
  const { 
    width,
    height,
    scale,
    fontScale,
    isPortrait,
    isLandscape 
  } = useWindowDimensions();

  return (
    <View style={{
      width: isPortrait ? '100%' : '50%',
      height: height * 0.5,
      fontSize: 16 * fontScale
    }}>
      {/* Your content */}
    </View>
  );
}
```

## API Reference

### Hooks
- `useKeyboard()` - Keyboard state and dimensions
- `useSafeArea()` - Safe area insets
- `useResponsive()` - Responsive design utilities
- `useOrientation()` - Device orientation
- `useWindowDimensions()` - Screen dimensions and orientation

### Managers
- `DeviceInfoManager` - Device information and capabilities
- `PlatformManager` - Platform-specific utilities
- `KeyboardManager` - Keyboard event handling
- `OrientationManager` - Orientation utilities
- `NotchHelper` - Notch and Dynamic Island detection
- `VersionManager` - Version comparison and checking

### Scaling Utilities
- `scaleWidth(dimension: number)` - Scale width dimension
- `scaleHeight(dimension: number)` - Scale height dimension
- `horizontalScale(size: number)` - Scale size horizontally
- `verticalScale(size: number)` - Scale size vertically
- `moderateScale(dimension: number, factor = 0.5)` - Moderate scaling for better UX
- `pixelsToDp(pixels: number)` - Convert pixels to DP
- `dpToPixels(dp: number)` - Convert DP to pixels
- `getPixelRatio()` - Get device pixel ratio
- `getFontScale()` - Get font scale
- `scaleText(size: number)` - Scale text size

## Platform Support

- iOS 11.0 and above
- Android API level 21 and above
- Supports both phones and tablets
- Special handling for notched devices and Dynamic Island
- iPhone models support:
  - iPhone X through iPhone 14 Pro Max (Notch)
  - iPhone 14 Pro through iPhone 16 Pro Max (Dynamic Island)

## Contributing

Contributions are welcome! Please read our contributing guide to get started.

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details

## Author

Shaaz Khan

## Support

For support, issues, or feature requests, please file an issue in the GitHub repository.