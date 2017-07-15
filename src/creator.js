'use strict';

var fs = require('fs');

var rootDirectories = ['src', 'dist', 'src/components'];

function createDirectory(pPath) {
  console.log('Directory path: ', pPath);

  if (!fs.existsSync(pPath)){
    fs.mkdirSync(pPath);

    return true;
  }
  else {
    console.error('The directory with same name is already present with name: ', pPath)

    return false;
  }
}

function createDirectories(pRootDirectoryName) {
  rootDirectories.forEach(x => {
      console.log('sub directory under creation:', x);

      var fullPath = pRootDirectoryName + '/' + x;
      createDirectory(fullPath);
  })
}

module.exports = {
  startCreationProcess : function(pRootDirectoryName) {
    var isRootDirectoryCreated = createDirectory(pRootDirectoryName)

    if (isRootDirectoryCreated) {
      createDirectories(pRootDirectoryName)

      return true;
    }
    else {
      return false;
    }

  }
}