import Constants from 'expo-constants';
import React from 'react';
import { Text, View } from 'react-native';

const Index = () => {
  return (
    <View style={{ flex: 1 }}>
      <Text>Hello world</Text>
    </View>
  );
};

let EntryPoint = Index;

if (Constants.expoConfig?.extra?.storybookEnabled) {
  const StorybookUI = require('../.storybook').default;
  function Story() {
    return (
      <View style={{ flex: 1 }}>
        <StorybookUI />
      </View>
    );
  }
  EntryPoint = Story;
}

export default EntryPoint;
