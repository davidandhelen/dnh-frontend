module.exports = {
  env: {
    browser: true,
    es6: true
  },

  extends: ["eslint:recommended", "plugin:flowtype/recommended"],

  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },

  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },

  plugins: ["flowtype", "import", "react", "prettier"],

  settings: {
    react: {
      version: "16.0"
    }
  },

  rules: {
    "array-callback-return": 2,
    camelcase: [2, { properties: "never" }],
    curly: 2,
    eqeqeq: 2,
    "guard-for-in": 2,
    "new-cap": [2, { newIsCap: true, capIsNew: false }],
    "no-caller": 2,
    "no-cond-assign": 2,
    "no-console": 2,
    "no-debugger": 2,
    "no-dupe-args": 2,
    "no-dupe-class-members": 0,
    "no-dupe-keys": 2,
    "no-duplicate-case": 2,
    "no-else-return": 2,
    "no-empty": 2,
    "no-empty-pattern": 2,
    "no-extra-bind": 2,
    "no-fallthrough": 2,
    "no-func-assign": 2,
    "no-irregular-whitespace": 2,
    "no-lone-blocks": 2,
    "no-lonely-if": 2,
    "no-nested-ternary": 2,
    "no-new": 2,
    "no-new-object": 2,
    "no-restricted-imports": [2, "enzyme-to-json"],
    "no-return-assign": 2,
    "no-script-url": 2,
    "no-self-compare": 2,
    "no-sequences": 2,
    "no-shadow-restricted-names": 2,
    "no-sparse-arrays": 2,
    "no-template-curly-in-string": 2,
    "no-undef": 2,
    "no-underscore-dangle": [2, { allow: ["__path__"], allowAfterThis: true }],
    "no-unneeded-ternary": 2,
    "no-unreachable": 2,
    "no-unsafe-finally": 2,
    "no-unsafe-negation": 2,
    "no-unused-expressions": 2,
    "no-unused-vars": [2, { ignoreRestSiblings: true }],
    "no-use-before-define": [2, "nofunc"],
    "no-useless-call": 2,
    "no-useless-computed-key": 2,
    "no-useless-escape": 2,
    "no-useless-return": 2,
    "no-var": 2,
    "no-void": 2,
    "no-with": 2,
    "react/prefer-es6-class": [2, "always"],
    "prefer-const": 2,
    "prefer-rest-params": 2,
    "prefer-spread": 2,
    quotes: [2, "double"],
    semi: [2, "always"],
    "spaced-comment": [2, "always", { exceptions: ["/"] }],
    "use-isnan": 2,
    "valid-typeof": 2,
    yoda: [2, "never"],
    "dot-notation": 0,
    "no-extra-boolean-cast": 0,
    strict: 0,

    "one-var": [2, "never"],
    "prefer-template": 2,

    // Import rules.
    "import/default": 2,
    "import/export": 2,
    "import/imports-first": 2,
    "import/named": 2,
    "import/newline-after-import": 2,
    "import/no-deprecated": 2,
    "import/no-duplicates": 2,
    "import/extensions": [
      2,
      {
        js: "never",
        jsx: "never",
        scss: "always",
        jpg: "always",
        png: "always",
        gif: "always",
        svg: "always"
      }
    ],

    // React rules.
    "react/jsx-boolean-value": [2, "always"],
    "react/jsx-key": 2,
    "react/jsx-no-bind": [2, { ignoreRefs: true }],
    "react/jsx-no-comment-textnodes": 2,
    "react/jsx-no-duplicate-props": 2,
    "react/jsx-no-target-blank": 2,
    "react/jsx-no-undef": 2,
    "react/jsx-pascal-case": 2,
    "react/jsx-uses-react": 2,
    "react/jsx-uses-vars": 2,
    "react/no-children-prop": 2,
    "react/no-danger-with-children": 2,
    "react/no-deprecated": 2,
    "react/no-did-mount-set-state": 2,
    "react/no-did-update-set-state": 2,
    "react/no-direct-mutation-state": 2,
    "react/no-string-refs": 2,
    "react/no-unescaped-entities": 2,
    "react/no-unknown-property": 2,
    "react/sort-comp": 2,
    "react/sort-prop-types": [
      2,
      {
        callbacksLast: false,
        ignoreCase: true,
        requiredFirst: true
      }
    ],
    "react/jsx-sort-props": [
      1,
      {
        callbacksLast: false,
        shorthandFirst: false,
        ignoreCase: true
      }
    ],

    // Use eslint to run prettier.
    "prettier/prettier": "error"
  }
};
