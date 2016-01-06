var Promise = require('bluebird')
var temp = require('temp')
var fs = Promise.promisifyAll(require('fs'))
var execFile = require('child_process').execFile

var RCOMMANDER_PATH = process.env.RCOMMANDER_PATH ||
  'C:\\RBTI\\RCommander95_64\\RCommander95_64.exe'

function runCommandFile (commandPath) {
  return new Promise(function (resolve, reject) {
    execFile(RCOMMANDER_PATH, [commandPath], function (err, stdout, stderr) {
      if (err) {
        err.stdout = stdout
        err.stderr = stderr
        reject(err)
      } else {
        resolve({
          stdout: stdout,
          stderr: stderr
        })
      }
    })
  })
}

function runCommand (command) {
  var commandPath = temp.path({
    prefix: 'rcommander-',
    suffix: '.rmd'
  })

  return fs.writeFileAsync(commandPath, command, 'utf8')
    .then(function () {
      return runCommandFile(commandPath)
    })
    .catch(function (err) {
      err.command = command
      throw err
    })
    .finally(function () {
      return fs.unlinkAsync(commandPath)
    })
}

module.exports = {
  runCommandFile: runCommandFile,
  runCommand: runCommand
}
