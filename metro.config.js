// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const withStorybook = require('@storybook/react-native/metro/withStorybook');
const path = require('node:path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);
// drizzle用の設定
config.resolver.sourceExts.push('sql');
module.exports = withStorybook(config, {
  enabled: true,
  configPath: path.resolve(__dirname, './.storybook'),
});
