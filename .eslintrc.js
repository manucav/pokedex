module.exports = {
  root: true,

  parserOptions: {
    parser: "@babel/eslint-parser",
    ecmaVersion: 2018,
    sourceType: "module",
  },

  env: {
    browser: true,
    "vue/setup-compiler-macros": true,
  },

  extends: ["plugin:vue/vue3-essential", "prettier"],

  plugins: ["vue"],

  globals: {
    ga: "readonly",
    cordova: "readonly",
    __statics: "readonly",
    __QUASAR_SSR__: "readonly",
    __QUASAR_SSR_SERVER__: "readonly",
    __QUASAR_SSR_CLIENT__: "readonly",
    __QUASAR_SSR_PWA__: "readonly",
    process: "readonly",
    Capacitor: "readonly",
    chrome: "readonly",
  },

  rules: {
    "prefer-promise-reject-errors": "off",

    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
  },
};
