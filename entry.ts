import Constants from 'expo-constants';
// コピペ元: https://github.com/expo/expo/blob/main/packages/expo-router/entry.js
if (Constants.expoConfig?.extra?.storybookEnabled) {
  const { registerRootComponent } = require('expo');
  const Storybook = require('./.storybook').default;
  registerRootComponent(Storybook);
} else {
  require('expo-router/entry-classic');
}
