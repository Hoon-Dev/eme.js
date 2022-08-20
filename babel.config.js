module.exports = function(api) {
  api.cache(true);
  
  return {
    "presets": [
      [
        "@babel/preset-env",
        {
          "useBuiltIns": "entry",
          "corejs": "3"
        }
      ]
    ],
    "plugins": [
      "@babel/plugin-transform-typescript",
      [
        "@babel/plugin-transform-runtime",
        {
          "corejs": "3",
        }
      ]
    ]
  }
}