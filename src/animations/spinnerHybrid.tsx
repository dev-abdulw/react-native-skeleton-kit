import { useEffect, useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import { StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { SkeletonDefaults } from '../constants';

export function SpinnerHybridOverlay({
  duration,
  color,
  sizeFraction,
  strokeWidth,
}: {
  duration?: number;
  color: string;
  sizeFraction: number;
  strokeWidth: number;
}) {
  const [layoutSize, setLayoutSize] = useState({ width: 0, height: 0 });
  const rotation = useSharedValue(0);
  const resolvedDuration = duration ?? SkeletonDefaults.spinnerDuration;

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setLayoutSize({ width, height });
  };

  const spinnerDiameter = Math.min(
    Math.min(layoutSize.width, layoutSize.height) * sizeFraction,
    SkeletonDefaults.spinnerMaxSize
  );

  useEffect(() => {
    if (spinnerDiameter === 0) {
      return;
    }

    rotation.value = withRepeat(
      withTiming(360, {
        duration: resolvedDuration,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, [resolvedDuration, spinnerDiameter, rotation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <Animated.View
      style={[StyleSheet.absoluteFill, styles.container]}
      onLayout={onLayout}
      pointerEvents="none"
    >
      {spinnerDiameter > 0 && (
        <Animated.View
          style={[
            {
              width: spinnerDiameter,
              height: spinnerDiameter,
              borderRadius: spinnerDiameter / 2,
              borderWidth: strokeWidth,
              borderColor: 'transparent',
              borderTopColor: color,
            },
            animatedStyle,
          ]}
        />
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
