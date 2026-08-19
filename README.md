# react-native-skeleton-kit

Skeleton loading placeholders for React Native and Expo: shimmer, pulse, wave, gradient-cycle, and spinner-hybrid animations with ready-made shapes.

> **Status:** Phase 1 — the `Skeleton` primitive with `pulse`, `shimmer`, `wave`, `gradient-cycle`, and `spinner-hybrid` animations, plus a custom-driver escape hatch, is available now. Shape presets (text, avatar, card, list item, table, media) are planned next.

## Installation

This library uses [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/) (v4) to drive animations, so it and its `react-native-worklets` peer must be installed alongside it:

```sh
npm install react-native-skeleton-kit react-native-reanimated react-native-worklets
```

Then follow the [Reanimated installation guide](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started) for your project (bare React Native or Expo) to finish setting up the Babel plugin/worklets config.

## Usage

```tsx
import { Skeleton } from 'react-native-skeleton-kit';

function ProfileLoading() {
  return (
    <>
      <Skeleton width={200} height={20} style={{ marginBottom: 8 }} />
      <Skeleton width={160} height={20} style={{ marginBottom: 8 }} />
      <Skeleton width={60} height={60} borderRadius={30} />
    </>
  );
}
```

By default, `Skeleton` renders a rounded rectangle that pulses (fades in and out). Pass `animation="shimmer"` for a moving highlight sweep, `animation="wave"` for a softer multi-band sweep, `animation="gradient-cycle"` for a smooth color-cycling background, `animation="spinner-hybrid"` for a pulsing placeholder with a small spinner centered on top, `animation="custom"` to drive the style yourself, or `animation="none"` for a static placeholder.

```tsx
<Skeleton
  width="100%"
  height={16}
  borderRadius={4}
  animation="pulse" // "pulse" | "shimmer" | "wave" | "gradient-cycle" | "spinner-hybrid" | "custom" | "none"
  duration={800} // ms per fade half-cycle
  minOpacity={0.4}
  maxOpacity={1}
  backgroundColor="#E1E9EE"
/>
```

```tsx
<Skeleton
  width="100%"
  height={16}
  animation="shimmer"
  duration={1200} // ms per sweep across the placeholder
  shimmerColor="#F2F8FC"
  shimmerWidth={0.3} // sweep band width as a fraction of the placeholder width
/>
```

```tsx
<Skeleton
  width="100%"
  height={16}
  animation="wave"
  duration={1600} // ms per sweep across the placeholder
  waveColor="#F2F8FC"
  waveWidth={0.5} // widest band's width as a fraction of the placeholder width
/>
```

```tsx
<Skeleton
  width="100%"
  height={16}
  animation="gradient-cycle"
  duration={1500} // ms spent transitioning between each pair of colors
  gradientColors={['#D3DCE3', '#B8C4CE', '#EDF3F7']}
/>
```

```tsx
<Skeleton
  width={120}
  height={120}
  borderRadius={12}
  animation="spinner-hybrid"
  duration={900} // ms per full spinner rotation
  spinnerColor="#9FB3C2"
  spinnerSize={0.4} // spinner diameter as a fraction of min(width, height), capped at 32px
  spinnerStrokeWidth={2}
/>
```

If none of the built-in animations fit, pass `animation="custom"` with a `customDriver` function. It receives a Reanimated `SharedValue<number>` that loops `0 → 1 → 0` (paced by `duration`) and must return a `ViewStyle` object. **It must start with a `'worklet'` directive** so Reanimated's Babel plugin compiles it to run on the UI thread — without it you'll hit a `[Worklets] Tried to synchronously call a Remote Function` error at runtime.

```tsx
import { interpolate, interpolateColor } from 'react-native-reanimated';
import { Skeleton, type SkeletonCustomDriver } from 'react-native-skeleton-kit';

const scaleBreathDriver: SkeletonCustomDriver = (progress) => {
  'worklet';
  return {
    transform: [{ scale: interpolate(progress.value, [0, 1], [0.94, 1]) }],
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      ['#E1E9EE', '#B8C4CE']
    ),
  };
};

<Skeleton
  width="100%"
  height={16}
  animation="custom"
  customDriver={scaleBreathDriver}
  duration={800} // ms per 0→1 half-cycle, same pacing as pulse
/>
```

### Props

| Prop                  | Type                       | Default    | Description                                   |
| --------------------- | -------------------------- | ---------- | ---------------------------------------------- |
| `width`               | `DimensionValue`           | `'100%'`   | Placeholder width.                             |
| `height`              | `DimensionValue`           | `16`       | Placeholder height.                            |
| `borderRadius`        | `number`                   | `4`        | Corner radius.                                 |
| `animation`           | `'pulse' \| 'shimmer' \| 'wave' \| 'gradient-cycle' \| 'spinner-hybrid' \| 'custom' \| 'none'` | `'pulse'`  | Animation style. |
| `duration`            | `number`                   | `800`/`1200`/`1600`/`1500`/`900`/`800` | Duration (ms) of each fade half-cycle (pulse/spinner-hybrid/custom), full sweep (shimmer/wave), per-color-pair transition (gradient-cycle), or full rotation (spinner-hybrid's spinner). |
| `minOpacity`          | `number`                   | `0.4`      | Opacity at the dimmest point of the pulse.     |
| `maxOpacity`          | `number`                   | `1`        | Opacity at the brightest point of the pulse.   |
| `backgroundColor`     | `string`                   | `#E1E9EE`  | Placeholder fill color.                        |
| `shimmerColor`        | `string`                   | `#F2F8FC`  | Color of the shimmer sweep band.               |
| `shimmerWidth`        | `number`                   | `0.3`      | Shimmer band width as a fraction of the placeholder width. |
| `waveColor`           | `string`                   | `#F2F8FC`  | Color of the wave sweep bands.                 |
| `waveWidth`           | `number`                   | `0.5`      | Widest wave band's width as a fraction of the placeholder width. |
| `gradientColors`      | `string[]`                 | `['#D3DCE3', '#B8C4CE', '#EDF3F7']` | Colors the background cycles through, in order. |
| `spinnerColor`        | `string`                   | `#9FB3C2`  | Color of the spinner-hybrid ring.              |
| `spinnerSize`         | `number`                   | `0.4`      | Spinner diameter as a fraction of `min(width, height)`, capped at 32px. |
| `spinnerStrokeWidth`  | `number`                   | `2`        | Stroke width of the spinner ring.              |
| `customDriver`        | `(progress: SharedValue<number>) => ViewStyle` | —  | Worklet mapping a looping `0→1` progress value to a style, used when `animation="custom"`. |
| `style`               | `StyleProp<ViewStyle>`     | —          | Additional styles, merged last.                |

`SkeletonColors` and `SkeletonDefaults` are also exported if you want to reuse the library's default theme values in your own components.


## Contributing

- [Development workflow](CONTRIBUTING.md#development-workflow)
- [Sending a pull request](CONTRIBUTING.md#sending-a-pull-request)
- [Code of conduct](CODE_OF_CONDUCT.md)

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
