import { useEffect } from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolateColor,
  Easing,
} from 'react-native-reanimated';
import type { SkeletonAnimation } from '../types';
import { SkeletonDefaults } from '../constants';

export function useGradientCycleAnimation({
  animation,
  duration,
  colors,
}: {
  animation: SkeletonAnimation;
  duration?: number;
  colors: string[];
}) {
  const progress = useSharedValue(0);
  const isActive = animation === 'gradient-cycle' && colors.length >= 2;

  useEffect(() => {
    if (!isActive) {
      progress.value = 0;
      return;
    }

    progress.value = withRepeat(
      withTiming(colors.length - 1, {
        duration:
          (duration ?? SkeletonDefaults.gradientCycleDuration) *
          (colors.length - 1),
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, [isActive, duration, colors, progress]);

  return useAnimatedStyle(() => {
    if (!isActive) {
      return {};
    }

    return {
      backgroundColor: interpolateColor(
        progress.value,
        colors.map((_, index) => index),
        colors
      ),
    };
  });
}
