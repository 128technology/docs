/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

const {FlatCompat} = require('@eslint/eslintrc');

const compat = new FlatCompat({baseDirectory: __dirname});

const OFF = 0;
const ERROR = 2;

module.exports = [
  // Ignore auto-generated and build directories
  {
    ignores: ['.docusaurus/**', 'build/**', 'offline-docs/**', '.eslintrc.js', 'eslint.config.js'],
  },
  ...compat.extends('airbnb', 'prettier'),
  ...compat.env({browser: true, commonjs: true, jest: true, node: true}),
  ...compat.plugins('react-hooks'),
  {
    languageOptions: {
      parser: require('@babel/eslint-parser'),
      parserOptions: {
        allowImportExportEverywhere: true,
        requireConfigFile: false,
        babelOptions: {presets: ['@babel/preset-react']},
      },
    },
    rules: {
      // Ignore certain webpack alias because it can't be resolved
      'import/no-unresolved': [
        ERROR,
        {ignore: ['^@theme', '^@docusaurus', '^@generated']},
      ],
      'import/extensions': OFF,
      'react/jsx-closing-bracket-location': OFF, // Conflicts with Prettier.
      'react/jsx-filename-extension': OFF,
      'react-hooks/rules-of-hooks': ERROR,
      'react/prop-types': OFF, // PropTypes aren't used much these days.
    },
  },
];
