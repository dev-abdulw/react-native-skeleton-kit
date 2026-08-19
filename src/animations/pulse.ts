import { useEffect } from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import type { SkeletonAnimation } from '../types';
import { SkeletonDefaults } from '../constants';

export function usePulseAnimation({
  animation,
  duration,
  minOpacity,
  maxOpacity,
}: {
  animation: SkeletonAnimation;
  duration?: number;
  minOpacity: number;
  maxOpacity: number;
}) {
  const opacity = useSharedValue(maxOpacity);
  const isActive = animation === 'pulse' || animation === 'spinner-hybrid';

  useEffect(() => {
    if (!isActive) {
      opacity.value = maxOpacity;
      return;
    }

    opacity.value = withRepeat(
      withSequence(
        withTiming(minOpacity, {
          duration: duration ?? SkeletonDefaults.duration,
          easing: Easing.inOut(Easing.ease),
        }),
        withTiming(maxOpacity, {
          duration: duration ?? SkeletonDefaults.duration,
          easing: Easing.inOut(Easing.ease),
        })
      ),
      -1,
      true
    );
  }, [isActive, duration, minOpacity, maxOpacity, opacity]);

  return useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));
}
