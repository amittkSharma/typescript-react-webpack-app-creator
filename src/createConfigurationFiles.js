'use strict';

const createFile = require('create-file');
const fs = require('fs-extra')

var configurationFiles = [
  { name: 'webpack.config.js', content:'',  path:'../configuration/webpack.js'},
  { name: 'tslint.json', content:'', path:'../configuration/tslint.json'},
  { name: 'tsconfig.json', content:'', path:'../configuration/tsconfig.json'},
  { name: 'index.html', content:'',  path:'../sampleFiles/sample_index.html'},
  { name: './src/app.tsx', content:'', path:'../sampleFiles/sample_app.t'},
  { name: './src/components/hello.tsx', content:'', path:'../sampleFiles/sample_hello.t'}
]

function createFileFromFileInfo(fileInfo) {
  createFile(fileInfo.name, fileInfo.content, function (err) {
    if(err != null) {
      console.error(err);
    }
    else {
      var retVal =  copyConfigurationFiles(fileInfo);
    }
  });
}

function copyConfigurationFiles(fileInfo) {
  fs.copy(fileInfo.path, fileInfo.name)
  .then(() => {
    console.log(`success! File with name ${fileInfo.name} is created`)
  })
  .catch(err => {
    console.error(err)
  })
}

function readJsonFile(filePath) {
  return fs.readJsonSync(filePath);
}

function jsonConcat(o1, o2) {
 for (var key in o2) {
  o1[key] = o2[key];
 }
 return o1;
}

module.exports = {

  UpdatePackageJsonFile: function(callback) {
    var oldFile = readJsonFile ('./package.json');

    var newFile = readJsonFile ('../configuration/package.json');

    console.log('jsons', oldFile)
    console.log('new file', newFile);

    oldFile.scripts = newFile.scripts;

    var output = {};
    output = jsonConcat(output, oldFile);
    output = jsonConcat(output, newFile);

    console.log('updated file', output);

    //writing the new package json file
    fs.outputJson('./package.json', output, function (err) {
      if(err != null) {
        console.error(err);

        callback(false);
      }
      else {
        console.log('package json file is updated');

        callback(true);
      }
    })
  },

  CreateConfigurationFiles: function() {
    console.log('start creating the config files')

    configurationFiles.map( fileInfo => {
      console.log('fileInfo:', fileInfo);
      createFileFromFileInfo(fileInfo);
    });
  }
}