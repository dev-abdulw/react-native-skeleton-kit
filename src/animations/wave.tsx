import { SweepOverlay } from './sweepOverlay';
import { SkeletonDefaults } from '../constants';

export function WaveOverlay({
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
      duration={duration ?? SkeletonDefaults.waveDuration}
      bands={[
        {
          color,
          opacity: 0.15,
          widthFraction: width,
          offsetFraction: 0,
        },
        {
          color,
          opacity: 0.3,
          widthFraction: width * 0.5,
          offsetFraction: width * 0.25,
        },
        {
          color,
          opacity: 0.15,
          widthFraction: width,
          offsetFraction: width * 0.5,
        },
      ]}
    />
  );
}
