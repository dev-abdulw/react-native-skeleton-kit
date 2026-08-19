import { SweepOverlay } from './sweepOverlay';
import { SkeletonDefaults } from '../constants';

export function ShimmerOverlay({
  duration,
  color,
  width,
}: {
  duration?: number;
  color: string;
  width: number;
}) {
  return (
    <SweepOverlay
      duration={duration ?? SkeletonDefaults.shimmerDuration}
      bands={[
        {
          color,
          opacity: 0.5,
          widthFraction: width,
          offsetFraction: 0,
        },
      ]}
    />
  );
}
