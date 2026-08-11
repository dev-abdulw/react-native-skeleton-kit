# react-native-skeleton-kit

Skeleton loading placeholders for React Native and Expo: shimmer, pulse, wave, gradient-cycle, and spinner-hybrid animations with ready-made shapes.

> **Status:** Phase 1 — the `Skeleton` primitive with `pulse`, `shimmer`, `wave`, and `gradient-cycle` animations is available now. Spinner-hybrid, a custom-driver escape hatch, and shape presets (text, avatar, card, list item, table, media) are planned next.

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

By default, `Skeleton` renders a rounded rectangle that pulses (fades in and out). Pass `animation="shimmer"` for a moving highlight sweep, `animation="wave"` for a softer multi-band sweep, `animation="gradient-cycle"` for a smooth color-cycling background, or `animation="none"` for a static placeholder.

```tsx
<Skeleton
  width="100%"
  height={16}
  borderRadius={4}
  animation="pulse" // "pulse" | "shimmer" | "wave" | "gradient-cycle" | "none"
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

### Props

| Prop              | Type                       | Default    | Description                                   |
| ----------------- | -------------------------- | ---------- | ---------------------------------------------- |
| `width`           | `DimensionValue`           | `'100%'`   | Placeholder width.                             |
| `height`          | `DimensionValue`           | `16`       | Placeholder height.                            |
| `borderRadius`    | `number`                   | `4`        | Corner radius.                                 |
| `animation`       | `'pulse' \| 'shimmer' \| 'wave' \| 'gradient-cycle' \| 'none'` | `'pulse'`  | Animation style. |
| `duration`        | `number`                   | `800`/`1200`/`1600`/`1500` | Duration (ms) of each fade half-cycle (pulse), full sweep (shimmer/wave), or per-color-pair transition (gradient-cycle). |
| `minOpacity`      | `number`                   | `0.4`      | Opacity at the dimmest point of the pulse.     |
| `maxOpacity`      | `number`                   | `1`        | Opacity at the brightest point of the pulse.   |
| `backgroundColor` | `string`                   | `#E1E9EE`  | Placeholder fill color.                        |
| `shimmerColor`    | `string`                   | `#F2F8FC`  | Color of the shimmer sweep band.               |
| `shimmerWidth`    | `number`                   | `0.3`      | Shimmer band width as a fraction of the placeholder width. |
| `waveColor`       | `string`                   | `#F2F8FC`  | Color of the wave sweep bands.                 |
| `waveWidth`       | `number`                   | `0.5`      | Widest wave band's width as a fraction of the placeholder width. |
| `gradientColors`  | `string[]`                 | `['#D3DCE3', '#B8C4CE', '#EDF3F7']` | Colors the background cycles through, in order. |
| `style`           | `StyleProp<ViewStyle>`     | —          | Additional styles, merged last.                |

`SkeletonColors` and `SkeletonDefaults` are also exported if you want to reuse the library's default theme values in your own components.


## Contributing

- [Development workflow](CONTRIBUTING.md#development-workflow)
- [Sending a pull request](CONTRIBUTING.md#sending-a-pull-request)
- [Code of conduct](CODE_OF_CONDUCT.md)

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
