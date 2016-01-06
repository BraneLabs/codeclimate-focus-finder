var glob = require('glob'),
    exec = require('child_process').exec,
    fs = require('fs'),
    path = require('path'),
    util = require('./util'),
    fileBuilder = require('./file-builder');

module.exports = Focus;

function Focus() { }

Focus.prototype.runEngine = function(){
  var analysisFiles = [],
      self = this;

  if (fs.existsSync('/config.json')) {
    var engineConfig = JSON.parse(fs.readFileSync('/config.json'));

    if (util.checkNested(engineConfig, 'config', 'paths')) {
      analysisFiles = fileBuilder.withIncludes(engineConfig.config.paths);
    }
  }

  analysisFiles = fileBuilder.filterFiles(analysisFiles);

  analysisFiles.forEach(function(f, i, a){
    self.find(f);
  });
}

Focus.prototype.find = function(file){
  var focusString = "'focus: true'",
      self = this;

  // Prepare the grep string for execution
  var grepString = ["grep -nHwE", focusString, '"' + file + '"'].join(" ");

  // Execute grep with the focus: true pattern
  exec(grepString, function (error, stdout, stderr) {
    var results = stdout.toString();

    if (results !== ""){
      // Parses grep output
      var lines = results.split("\n");

      lines.forEach(function(line, index, array){
        // grep spits out an extra line that we can ignore
        if(index < (array.length-1)){
          // Grep output is colon delimited
          var cols = line.split(":");

          // Remove remnants of container paths for external display
          var fileName = cols[0].split("/code/")[1];
          var lineNum = cols[1];
          var matchedString = cols.slice(2, cols.length).join(":");

          if (matchedString !== undefined){
            self.printIssue(fileName, parseInt(lineNum), matchedString);
          }
        }
      })
    }
  })
}

Focus.prototype.printIssue = function(fileName, lineNum, matchedString) {
// Prints properly structured Issue data to STDOUT according to Code Climate Engine specification.
  var issue = {
    "type": "issue",
    "check_name": "Occurence of 'focus: true' found",
    "description": matchedString,
    "categories": ["Style"],
    "location":{
      "path": fileName,
      "lines": {
        "begin": lineNum,
        "end": lineNum
      }
    }
  };

  var issueString = JSON.stringify(issue)+"\0";
  console.log(issueString);
}
