module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  extends: [
    "airbnb",
    "airbnb-typescript",
    "next",
    "next/core-web-vitals",
    "plugin:prettier/recommended", // ✨ 추가
  ],
  plugins: ["prettier"], // ✨ 추가
  rules: {
    "prettier/prettier": "error", // ✨ 포매팅 안 맞으면 에러로 표시
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": [
      1,
      { extensions: [".tsx", ".ts", ".jsx", ".js"] },
    ],
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
  },
};
