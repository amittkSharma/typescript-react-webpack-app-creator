var directoryCreator = require('./src/creator');

var npmInitializer = require('./src/npmInitializer');

var parameters = process.argv.slice(2).join(' ');
console.log('parameters: ', parameters);
var directoryName = parameters;

var isDirectoryCreated = directoryCreator.startCreationProcess(directoryName);
if(isDirectoryCreated) {
  console.log('Continue with the process');
  npmInitializer.initializeNpmForProject(directoryName);
}
else {
  console.log('Exit the projects');
}