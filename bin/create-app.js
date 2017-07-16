#!/usr/bin/env node
'use strict';

process.title = 'typescript-react-webpack-app-creator';

process.on('uncaughtException', function(err) {
  console.error('Caught exception:\n', err.stack);
});

var appCreator = require('../index.js');
var parameter = process.argv.slice(2).join(' ');

console.log(`project name entered ${parameter}`)

appCreator.run(parameter);