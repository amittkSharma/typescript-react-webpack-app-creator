'use strict';
var configurationFileCreator = require('./createConfigurationFiles');

var process = require('process');
var exec = require('child_process').exec,child;

var npmModules = [
   { name: 'awesome-typescript-loader', devDependency:'true', installed: false},
   { name: 'source-map-loader', devDependency:'true', installed: false},
   { name: 'ts-loader', devDependency:'true', installed: false},
   { name: 'tslint', devDependency:'true', installed: false},
   { name: 'tslint-loader', devDependency:'true', installed: false},
   { name: 'typescript', devDependency:'true', installed: false},
   { name: 'webpack', devDependency:'true', installed: false},
   { name: 'webpack-dev-server', devDependency:'true', installed: false},
   { name: '@types/react', devDependency:'false', installed: false},
   { name: '@types/react-dom', devDependency:'false', installed: false},
   { name: 'react', devDependency:'false', installed: false},
   { name: 'react-dom', devDependency:'false', installed: false},
]

function installingNpmPackages(callback) {
  console.log('start installing packages')

  npmModules.forEach(module => {
    var installerStr = 'npm install ' + module.name + ' --save' ;
    if ("devDependency" in module) {
      if (module.devDependency)
      {
        installerStr =  'npm install  ' + module.name + ' --save-dev ' ;
      }
    }
    console.log('installer string', installerStr)

    child = exec(installerStr, function (error, stdout, stderr) {
     console.log('stdout: ' + stdout);
     console.log('stderr: ' + stderr);
     if (error !== null) {
       console.log('exec error: ' + error);
       callback(false);
     }
     else {

      module.installed = true;

      console.log(`Successfully installed package ${module.name}`);
      var installedModules =  npmModules.filter(mod => mod.installed == true);

      console.log(`installed modules count ${installedModules.length}`)

      if (installedModules.length == npmModules.length) {
        callback(true);
      }
     }
    })
  })
}

function createPackageJson(pAppDirectory, callback) {
  process.chdir(pAppDirectory);

  child = exec('npm init -y', function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
       console.log('exec error: ' + error);
       callback(false);
     }
     else {
       callback(true);
     }
 });
}

module.exports = {
  initializeNpmForProject: function(pAppDirectory) {
    createPackageJson(pAppDirectory, (isPackageFileCreated) => {
      if (isPackageFileCreated) {
        console.log('package file is created.')
        configurationFileCreator.UpdatePackageJsonFile(() => {
          console.log('Start creating configuration files')
          configurationFileCreator.CreateConfigurationFiles();
        })
      }
    });
  }
}