import { useEffect, useState } from 'react';
import type {
  StyleProp,
  ViewStyle,
  DimensionValue,
  LayoutChangeEvent,
} from 'react-native';
import { StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { SkeletonColors, SkeletonDefaults } from './constants';

export type SkeletonAnimation = 'pulse' | 'shimmer' | 'none';

export interface SkeletonProps {
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: number;
  animation?: SkeletonAnimation;
  duration?: number;
  minOpacity?: number;
  maxOpacity?: number;
  backgroundColor?: string;
  shimmerColor?: string;
  shimmerWidth?: number;
  style?: StyleProp<ViewStyle>;
}

export function Skeleton({
  width = SkeletonDefaults.width,
  height = SkeletonDefaults.height,
  borderRadius = SkeletonDefaults.borderRadius,
  animation = 'pulse',
  duration,
  minOpacity = SkeletonDefaults.minOpacity,
  maxOpacity = SkeletonDefaults.maxOpacity,
  backgroundColor = SkeletonColors.base,
  shimmerColor = SkeletonColors.shimmer,
  shimmerWidth = SkeletonDefaults.shimmerWidth,
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
  }, [animation, duration, minOpacity, maxOpacity, opacity]);

  const pulseStyle = useAnimatedStyle(() => ({
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
          overflow: 'hidden',
        },
        pulseStyle,
        style,
      ]}
    >
      {animation === 'shimmer' && (
        <ShimmerOverlay
          duration={duration ?? SkeletonDefaults.shimmerDuration}
          shimmerColor={shimmerColor}
          shimmerWidth={shimmerWidth}
        />
      )}
    </Animated.View>
  );
}

function ShimmerOverlay({
  duration,
  shimmerColor,
  shimmerWidth,
}: {
  duration: number;
  shimmerColor: string;
  shimmerWidth: number;
}) {
  const [layoutWidth, setLayoutWidth] = useState(0);
  const translateX = useSharedValue(0);

  const onLayout = (event: LayoutChangeEvent) => {
    setLayoutWidth(event.nativeEvent.layout.width);
  };

  const bandWidth = layoutWidth * shimmerWidth;

  useEffect(() => {
    if (layoutWidth === 0) {
      return;
    }

    translateX.value = -bandWidth;
    translateX.value = withRepeat(
      withTiming(layoutWidth, {
        duration,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, [duration, layoutWidth, bandWidth, translateX]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Animated.View
      style={StyleSheet.absoluteFill}
      onLayout={onLayout}
      pointerEvents="none"
    >
      {layoutWidth > 0 && (
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              width: bandWidth,
              backgroundColor: shimmerColor,
              opacity: 0.5,
            },
            animatedStyle,
          ]}
        />
      )}
    </Animated.View>
  );
}
