var directoryCreator = require('./src/creator');
var npmInitializer = require('./src/npmInitializer');

function startAppCreationProcess(directoryName) {
  console.info('Start creation process:  ', directoryName);
  var isDirectoryCreated = directoryCreator.startCreationProcess(directoryName);
  if(isDirectoryCreated) {
    console.log('Continue with the process');
    npmInitializer.initializeNpmForProject(directoryName);
  }
  else {
    console.log('Exit the projects');
  }
}

module.exports = {
  run: function(arguments) {
    console.info('Start app creation process with arguments:  ', arguments);
    startAppCreationProcess(arguments);
  }
}