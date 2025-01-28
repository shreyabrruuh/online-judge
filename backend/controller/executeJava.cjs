const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const executeJava = async (code, input) => {
  try {
    const jobId = uuid(); 
    const tempDir = path.join(__dirname, "temp", jobId);

   
    fs.mkdirSync(tempDir, { recursive: true });

  
    const javaFilePath = path.join(tempDir, "Main.java");
    const inputFilePath = path.join(tempDir, "input.txt");

   
    fs.writeFileSync(javaFilePath, code);
    fs.writeFileSync(inputFilePath, input);

    
    await new Promise((resolve, reject) => {
      exec(`javac ${javaFilePath}`, (error, stdout, stderr) => {
        if (error) {
          reject({ error: "Compilation Error", details: stderr });
        } else {
          resolve(stdout);
        }
      });
    });

   
    const output = await new Promise((resolve, reject) => {
      exec(
        `java -cp ${tempDir} Main < ${inputFilePath}`,
        { timeout: 5000 }, 
        (error, stdout, stderr) => {
          if (error) {
            reject({ error: "Runtime Error", details: stderr || error.message });
          } else {
            resolve(stdout);
          }
        }
      );
    });

   
    fs.rmSync(tempDir, { recursive: true, force: true });

    return { output: output.trim() };
  } catch (err) {
    console.error("Error during Java execution:", err);

    
    if (tempDir && fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }

    throw err; 
  }
};

module.exports = { executeJava };
