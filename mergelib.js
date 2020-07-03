const merge = require('concat');

const files = [
  './dist/runtime-es5.js',
  './dist/polyfills-es5.js',
  './dist/scripts.js',
  './dist/main-es5.js'
]

merge(files, './dist/syncwebapp.js');
console.info('file generated');