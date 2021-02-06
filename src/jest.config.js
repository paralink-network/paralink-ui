// Ideally we need to have react-scripts to handle the tests from this file , instead of package.json
module.exports = {
  verbose: true,
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!(jsoneditor-react))/']
};
