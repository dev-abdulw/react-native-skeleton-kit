import { useEffect } from 'react';
import type { StyleProp, ViewStyle, DimensionValue } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { SkeletonColors, SkeletonDefaults } from './constants';

export type SkeletonAnimation = 'pulse' | 'none';

export interface SkeletonProps {
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: number;
  animation?: SkeletonAnimation;
  duration?: number;
  minOpacity?: number;
  maxOpacity?: number;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
}

export function Skeleton({
  width = SkeletonDefaults.width,
  height = SkeletonDefaults.height,
  borderRadius = SkeletonDefaults.borderRadius,
  animation = 'pulse',
  duration = SkeletonDefaults.duration,
  minOpacity = SkeletonDefaults.minOpacity,
  maxOpacity = SkeletonDefaults.maxOpacity,
  backgroundColor = SkeletonColors.base,
  style,
}: SkeletonProps) {
  const opacity = useSharedValue(maxOpacity);

  useEffect(() => {
    if (animation !== 'pulse') {
      opacity.value = maxOpacity;
      return;
    }

    opacity.value = withRepeat(
      withSequence(
        withTiming(minOpacity, {
          duration,
          easing: Easing.inOut(Easing.ease),
        }),
        withTiming(maxOpacity, {
          duration,
          easing: Easing.inOut(Easing.ease),
        })
      ),
      -1,
      true
    );
  }, [animation, duration, minOpacity, maxOpacity, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor,
        },
        animatedStyle,
        style,
      ]}
    />
  );
}
