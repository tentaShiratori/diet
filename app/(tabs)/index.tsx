import { StyleSheet, useWindowDimensions, View, StatusBar } from 'react-native';
import { Canvas, Circle } from '@shopify/react-native-skia';
import React from 'react';
import Animated, { useSharedValue, withDecay, useAnimatedStyle } from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Link } from 'expo-router';

export default function HomeScreen() {
  const { width, height } = useWindowDimensions();
  const tabBarHeight = useBottomTabBarHeight();
  const statusHeight = StatusBar.currentHeight;
  const translateX = useSharedValue(width / 2);
  const translateY = useSharedValue(height / 2);
  const radius = 30;
  const verticalBounds = [radius + (statusHeight ?? 0), height - tabBarHeight - radius];
  const horizontalBounds = [radius, width - radius];

  const gesture = Gesture.Pan()
    .onChange((e) => {
      if (translateX.value + e.changeX > horizontalBounds[0] && translateX.value + e.changeX < horizontalBounds[1]) {
        translateX.value += e.changeX;
      }
      if (translateY.value + e.changeY > verticalBounds[0] && translateY.value + e.changeY < verticalBounds[1]) {
        translateY.value += e.changeY;
      }
    })
    .onEnd((e) => {
      translateX.value = withDecay({
        velocity: e.velocityX,
        clamp: [horizontalBounds[0], horizontalBounds[1]],
      });
      translateY.value = withDecay({
        velocity: e.velocityY,
        clamp: [verticalBounds[0], verticalBounds[1]],
      });
    });
  const style = useAnimatedStyle(() => ({
    position: 'absolute',
    top: -radius,
    left: -radius,
    width: radius * 2,
    height: radius * 2,
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
  }));
  const singleTap = Gesture.Tap()
    .maxDuration(250)
    .onStart(() => {
      console.log('Single tap!');
    });
  const compose = Gesture.Race(singleTap, gesture);
  return (
    <View style={{ flex: 1 }}>
      <Canvas style={{ flex: 1, height: 300 }}>
        <Circle cx={translateX} cy={translateY} r={radius} color="#3E3" />
      </Canvas>
      <GestureDetector gesture={compose}>
        <Animated.View style={style} />
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
