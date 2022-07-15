const path = require('path');

const joinFileNames = (fileNames) =>
  fileNames.map((f) => path.relative(process.cwd(), f)).join(' ');

const eslintCommand = (fileNames) => {
  return `npx eslint --fix ${joinFileNames(fileNames)}`;
};

const prettierCommand = (fileNames) =>
  `npx prettier --wrtie ${joinFileNames(fileNames)}`;

module.exports = {
  '*.{js,ts}': [eslintCommand],
  '*.{js,ts,json,md}': [prettierCommand],
};
