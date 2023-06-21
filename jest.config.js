/** @type {import('jest').Config} */
const config = {
    verbose: true,
    coverageReporters: [['text-summary', {file:"text-summary.txt"}], ['text', {file: 'text-coverage.txt'}]],
  };

  
  module.exports = config;