module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "vue/no-parsing-error": [2, {
      "x-invalid-end-tag": false
    }],
    "no-var" : "error",
    "no-undef": "warn",
    "camelcase": "off",
    "semi" : ["warn", "always"],
    "no-unused-vars": ["warn", { "vars": "all", "args": "none", "ignoreRestSiblings": false }]

  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
