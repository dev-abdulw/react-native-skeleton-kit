export const SkeletonColors = {
  base: '#E1E9EE',
  shimmer: '#F2F8FC',
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
} as const;
