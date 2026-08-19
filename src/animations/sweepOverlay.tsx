import { useEffect, useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import { StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

export interface SweepBand {
  color: string;
  opacity: number;
  widthFraction: number;
  offsetFraction: number;
}

export function SweepOverlay({
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
