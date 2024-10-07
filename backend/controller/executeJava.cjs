const { exec } = require("child_process");
const fs = require('fs');
const path = require('path');

const getClassName = (fileContent) => {
  const classNameMatch = fileContent.match(/public\s+class\s+(\w+)/);
  if (classNameMatch) {
    return classNameMatch[1];
  }
  throw new Error("No public class found in the file.");
};

const executeJava = (filepath, inputPath) => {
  const dirPath = path.dirname(filepath);
  const fileContent = fs.readFileSync(filepath, 'utf-8');
  const className = getClassName(fileContent);
  const tempFilePath = path.join(dirPath, `Main.java`);

  return new Promise((resolve, reject) => {
    // Rename the file to Main.java
    fs.rename(filepath, tempFilePath, (renameErr) => {
      if (renameErr) {
        return reject({ error: renameErr });
      }
      console.log("going for compilation");
      // Compile the Java file
      exec(
        `javac ${tempFilePath}`,
        (compileError, compileStdout, compileStderr) => {
          if (compileError) {
            return reject({ error: compileError, stderr: compileStderr });
          }
          console.log("Compile Stdout: ", compileStdout);
          // Construct the command to run the compiled Java class
          let command = `java -cp ${dirPath} ${className}`;
          if (inputPath) {
            command += ` < ${inputPath}`;
          }

          // Execute the Java class
          exec(command, (runError, stdout, stderr) => {
            if (runError) {
              return reject({ error: runError, stderr });
            }
            if (stderr) {
              return reject(stderr);
            }

            // Clean up: Rename the file back to its original name
            fs.rename(tempFilePath, filepath, (cleanupErr) => {
              if (cleanupErr) {
                return reject({ error: cleanupErr });
              }
              resolve(stdout);
            });
          });
        }
      );
    });
  });
};

module.exports= {
  executeJava,
};
