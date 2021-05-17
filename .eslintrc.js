module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
