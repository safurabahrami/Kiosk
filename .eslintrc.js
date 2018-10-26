module.exports = {
  "parser": "babel-eslint",
  "plugins": [
    "react",
    "import",
    "jest"
  ],
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "modules": true
    }
  },
  "env": {
    "es6": true,
    "browser": true,
    "node": true,
    "mocha": true,
    "jest/globals":true
  },
  "rules": {
    "indent": ["error", 2],
    'semi': ["error", "always"],
    'object-curly-spacing': ['error', 'always'],
    'quotes': ["error", "single"],
    'key-spacing': ['error', { beforeColon: false, afterColon: true }],
    'comma-dangle': ["error", "always-multiline"],
    'arrow-parens': ['error', 'as-needed', { requireForBlockBody: true, }],
    'operator-linebreak': ['error', 'before', { overrides: { '=': 'none' } }],
    'quote-props': ['error', 'as-needed', { keywords: false, unnecessary: true, numbers: false }],
    'object-shorthand': ['error', 'always', { ignoreConstructors: false, avoidQuotes: true, }],
    'no-trailing-spaces': ['error', { skipBlankLines: false, ignoreComments: false, }],
    'eol-last': ['error', 'always'],
    'arrow-spacing': ['error', { before: true, after: true }],
    'comma-spacing': ['error', { before: false, after: true }],
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: false }],
    'indent': ['error', 2, {
      SwitchCase: 1,
      VariableDeclarator: 1,
      outerIIFEBody: 1,
      // MemberExpression: null,
      FunctionDeclaration: {
        parameters: 1,
        body: 1
      },
      FunctionExpression: {
        parameters: 1,
        body: 1
      },
      CallExpression: {
        arguments: 1
      },
      ArrayExpression: 1,
      ObjectExpression: 1,
      ImportDeclaration: 1,
      flatTernaryExpressions: false,
      // list derived from https://github.com/benjamn/ast-types/blob/HEAD/def/jsx.js
      ignoredNodes: ['JSXElement', 'JSXElement > *', 'JSXAttribute', 'JSXIdentifier', 'JSXNamespacedName', 'JSXMemberExpression', 'JSXSpreadAttribute', 'JSXExpressionContainer', 'JSXOpeningElement', 'JSXClosingElement', 'JSXText', 'JSXEmptyExpression', 'JSXSpreadChild'],
      ignoreComments: false
    }],
    'space-before-blocks': 'error',
    'spaced-comment': ['error', 'always', {
      line: {
        exceptions: ['-', '+'],
        markers: ['=', '!'], // space here to support sprockets directives
      },
      block: {
        exceptions: ['-', '+'],
        markers: ['=', '!'], // space here to support sprockets directives
        balanced: true,
      }
    }],
    'keyword-spacing': ['error', {
      before: true,
      after: true,
      overrides: {
        return: { after: true },
        throw: { after: true },
        case: { after: true }
      }
    }],
    'padded-blocks': ['error', { blocks: 'never', classes: 'never', switches: 'never' }],
    'arrow-body-style': ['error', 'as-needed', { requireReturnForObjectLiteral: false, }],
    'space-infix-ops': 'error',
'dot-notation': ['error', { allowKeywords: true }],
    'react/jsx-indent': ['error', 2],
    'react/jsx-tag-spacing': ['error', {
      closingSlash: 'never',
      beforeSelfClosing: 'always',
      afterOpening: 'never',
      beforeClosing: 'never',
    }],
    'no-multi-spaces': ['error', { ignoreEOLComments: false, }],
    'react/jsx-props-no-multi-spaces': 'error',
    'implicit-arrow-linebreak': ['error', 'beside'],
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'always-multiline',
    }],
    'import/order': ['error', { groups: [['builtin', 'external', 'internal']] }],
    'space-in-parens': ['error', 'never'],
    'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 0 }],
    'no-spaced-func': 'error',
    'no-tabs': 'error',
    'import/no-duplicates': 'error',
    'radix': 'error',
    'prefer-destructuring': ['error', {
      VariableDeclarator: {
        array: false,
        object: true,
      },
      AssignmentExpression: {
        array: true,
        object: true,
      },
    }, {
      enforceForRenamedProperties: false,
    }],
    'react/prop-types': ['error', {
      ignore: [],
      customValidators: [],
      skipUndeclared: false
    }],
    }
};
