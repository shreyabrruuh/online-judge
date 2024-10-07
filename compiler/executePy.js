const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const outputPath = path.join(__dirname, "outputs/py");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executePy = (filepath, inputPath) => {
  return new Promise((resolve, reject) => {
    // Construct the command to execute the Python script
    const useInput = inputPath && fs.existsSync(inputPath);
    let command = `python ${filepath}`;
    console.log("Command: ",command);
    if (useInput) {
      command += ` < ${inputPath}`;
    }
    console.log("Final Command: ", command);

    exec(command, { maxBuffer: 1024 * 1024 }, (error, stdout, stderr) => {
      if (error) {
        // Compilation error occurred
        console.log("Compilation error: ",error.message);
        reject(new Error(`Compilation error: ${error.message}\n${stderr}`));
      } else if (stderr) {
        // Runtime warnings or minor errors
        resolve(stdout + "\n" + stderr);
      } else {
        // Successful execution
        console.log(stdout);
        resolve(stdout);
      }
    });
  });
};

module.exports = {
  executePy,
};
