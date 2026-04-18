module.exports = {
  presets: ['module:@react-native/babel-preset'],

  plugins: [
    ["module-resolver", {
      extensions: [
        ".ios.js",
        ".android.js",
        ".ios.jsx",
        ".android.jsx",
        ".js",
        ".jsx",
        ".json",
        ".ts",
        ".tsx",
        ".d.ts"
      ],

      root: ["."],

      alias: {
        "@src": "./src"
      }
    }],
    'react-native-worklets/plugin'
  ]
};
