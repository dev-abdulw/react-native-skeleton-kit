import Animated from 'react-native-reanimated';
import { SkeletonColors, SkeletonDefaults } from './constants';
import type { SkeletonProps } from './types';
import { usePulseAnimation } from './animations/pulse';
import { useGradientCycleAnimation } from './animations/gradientCycle';
import { useCustomAnimation } from './animations/custom';
import { ShimmerOverlay } from './animations/shimmer';
import { WaveOverlay } from './animations/wave';
import { SpinnerHybridOverlay } from './animations/spinnerHybrid';

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
  spinnerColor = SkeletonColors.spinner,
  spinnerSize = SkeletonDefaults.spinnerSize,
  spinnerStrokeWidth = SkeletonDefaults.spinnerStrokeWidth,
  customDriver,
  style,
}: SkeletonProps) {
  const pulseStyle = usePulseAnimation({
    animation,
    duration,
    minOpacity,
    maxOpacity,
  });

  const gradientStyle = useGradientCycleAnimation({
    animation,
    duration,
    colors: gradientColors,
  });

  const customStyle = useCustomAnimation({
    animation,
    duration,
    driver: customDriver,
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
        customStyle,
        style,
      ]}
    >
      {animation === 'shimmer' && (
        <ShimmerOverlay
          duration={duration}
          color={shimmerColor}
          width={shimmerWidth}
        />
      )}
      {animation === 'wave' && (
        <WaveOverlay duration={duration} color={waveColor} width={waveWidth} />
      )}
      {animation === 'spinner-hybrid' && (
        <SpinnerHybridOverlay
          duration={duration}
          color={spinnerColor}
          sizeFraction={spinnerSize}
          strokeWidth={spinnerStrokeWidth}
        />
      )}
    </Animated.View>
  );
}
