import Constants from 'expo-constants';
import { useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

const Storybook = () => {
  return (
    <View style={{ flex: 1 }}>
      <Text>Set extra.storybookEnabled to true in app.json</Text>
    </View>
  );
};

let Default = Storybook;

if (Constants.expoConfig?.extra?.storybookEnabled) {
  const StorybookUI = require('../.storybook').default;
  function Story() {
    const navigation = useNavigation();
    useEffect(() => {
      navigation.setOptions({ headerShown: false });
    }, [navigation]);
    return (
      <View style={{ flex: 1 }}>
        <StorybookUI />
      </View>
    );
  }
  Default = Story;
}

export default Default;
