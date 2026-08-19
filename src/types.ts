import type { StyleProp, ViewStyle, DimensionValue } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';

export type SkeletonAnimation =
  | 'pulse'
  | 'shimmer'
  | 'wave'
  | 'gradient-cycle'
  | 'spinner-hybrid'
  | 'custom'
  | 'none';

export type SkeletonCustomDriver = (progress: SharedValue<number>) => ViewStyle;

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
  spinnerColor?: string;
  spinnerSize?: number;
  spinnerStrokeWidth?: number;
  customDriver?: SkeletonCustomDriver;
  style?: StyleProp<ViewStyle>;
}
