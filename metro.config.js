const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: ['db', 'mp3', 'ttf', 'png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'mp4', 'm4v', 'aac', 'otf', 'obj', 'mtl', 'glb', 'gltf', 'bin', 'arobject', 'caf', 'wav', 'html', 'pdf', 'zip', 'txt'],
    sourceExts: ['js', 'json', 'ts', 'tsx', 'jsx', 'svg'],
  },
};

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
module.exports = wrapWithReanimatedMetroConfig(mergeConfig(getDefaultConfig(__dirname), config));