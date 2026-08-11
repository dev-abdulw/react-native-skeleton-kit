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
  interpolateColor,
  Easing,
} from 'react-native-reanimated';
import { SkeletonColors, SkeletonDefaults } from './constants';

export type SkeletonAnimation =
  'pulse' | 'shimmer' | 'wave' | 'gradient-cycle' | 'none';

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
  waveColor?: string;
  waveWidth?: number;
  gradientColors?: string[];
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
  waveColor = SkeletonColors.wave,
  waveWidth = SkeletonDefaults.waveWidth,
  gradientColors = SkeletonColors.gradientCycle,
  style,
}: SkeletonProps) {
  const opacity = useSharedValue(maxOpacity);
  const gradientProgress = useSharedValue(0);

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

  useEffect(() => {
    if (animation !== 'gradient-cycle' || gradientColors.length < 2) {
      gradientProgress.value = 0;
      return;
    }

    gradientProgress.value = withRepeat(
      withTiming(gradientColors.length - 1, {
        duration:
          (duration ?? SkeletonDefaults.gradientCycleDuration) *
          (gradientColors.length - 1),
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, [animation, duration, gradientColors, gradientProgress]);

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const gradientStyle = useAnimatedStyle(() => {
    if (animation !== 'gradient-cycle' || gradientColors.length < 2) {
      return {};
    }

    return {
      backgroundColor: interpolateColor(
        gradientProgress.value,
        gradientColors.map((_, index) => index),
        gradientColors
      ),
    };
  });

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
        gradientStyle,
        style,
      ]}
    >
      {animation === 'shimmer' && (
        <SweepOverlay
          duration={duration ?? SkeletonDefaults.shimmerDuration}
          bands={[
            {
              color: shimmerColor,
              opacity: 0.5,
              widthFraction: shimmerWidth,
              offsetFraction: 0,
            },
          ]}
        />
      )}
      {animation === 'wave' && (
        <SweepOverlay
          duration={duration ?? SkeletonDefaults.waveDuration}
          bands={[
            {
              color: waveColor,
              opacity: 0.15,
              widthFraction: waveWidth,
              offsetFraction: 0,
            },
            {
              color: waveColor,
              opacity: 0.3,
              widthFraction: waveWidth * 0.5,
              offsetFraction: waveWidth * 0.25,
            },
            {
              color: waveColor,
              opacity: 0.15,
              widthFraction: waveWidth,
              offsetFraction: waveWidth * 0.5,
            },
          ]}
        />
      )}
    </Animated.View>
  );
}

interface SweepBand {
  color: string;
  opacity: number;
  widthFraction: number;
  offsetFraction: number;
}

function SweepOverlay({
  duration,
  bands,
}: {
  duration: number;
  bands: SweepBand[];
}) {
  const [layoutWidth, setLayoutWidth] = useState(0);
  const translateX = useSharedValue(0);

  const onLayout = (event: LayoutChangeEvent) => {
    setLayoutWidth(event.nativeEvent.layout.width);
  };

  const maxBandWidth =
    layoutWidth * Math.max(...bands.map((band) => band.widthFraction));

  useEffect(() => {
    if (layoutWidth === 0) {
      return;
    }

    translateX.value = -maxBandWidth;
    translateX.value = withRepeat(
      withTiming(layoutWidth, {
        duration,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, [duration, layoutWidth, maxBandWidth, translateX]);

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
        <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
          {bands.map((band, index) => (
            <Animated.View
              key={index}
              style={[
                StyleSheet.absoluteFill,
                {
                  left: layoutWidth * band.offsetFraction,
                  width: layoutWidth * band.widthFraction,
                  backgroundColor: band.color,
                  opacity: band.opacity,
                },
              ]}
            />
          ))}
        </Animated.View>
      )}
    </Animated.View>
  );
}
