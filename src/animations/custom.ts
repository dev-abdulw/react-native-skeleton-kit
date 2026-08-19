import { useEffect } from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import type { SkeletonAnimation, SkeletonCustomDriver } from '../types';
import { SkeletonDefaults } from '../constants';

export function useCustomAnimation({
  animation,
  duration,
  driver,
}: {
  animation: SkeletonAnimation;
  duration?: number;
  driver?: SkeletonCustomDriver;
}) {
  const progress = useSharedValue(0);
  const isActive = animation === 'custom' && !!driver;

  useEffect(() => {
    if (!isActive) {
      progress.value = 0;
      return;
    }

    progress.value = withRepeat(
      withTiming(1, {
        duration: duration ?? SkeletonDefaults.duration,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, [isActive, duration, progress]);

  return useAnimatedStyle(() => {
    if (!isActive || !driver) {
      return {};
    }

    return driver(progress);
  });
}
