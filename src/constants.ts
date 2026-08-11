export const SkeletonColors = {
  base: '#E1E9EE',
  shimmer: '#F2F8FC',
  wave: '#F2F8FC',
  gradientCycle: ['#D3DCE3', '#B8C4CE', '#EDF3F7'] as string[],
  spinner: '#9FB3C2',
} as const;

export const SkeletonDefaults = {
  width: '100%' as const,
  height: 16,
  borderRadius: 4,
  duration: 800,
  minOpacity: 0.4,
  maxOpacity: 1,
  shimmerDuration: 1200,
  shimmerWidth: 0.3,
  waveDuration: 1600,
  waveWidth: 0.5,
  gradientCycleDuration: 1500,
  spinnerDuration: 900,
  spinnerSize: 0.4,
  spinnerMaxSize: 32,
  spinnerStrokeWidth: 2,
} as const;
