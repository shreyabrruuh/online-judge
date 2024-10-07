const {executeCpp} = require('./executeCpp.cjs');
const {executeJava} = require('./executeJava.cjs');
const {executePy} = require('./executePy.cjs');

const executeCode = async (language, filepath, inputPath) => {
    switch (language) {
        case 'cpp':
            console.log("going for cpp execution");
            return executeCpp(filepath, inputPath);
        case 'java':
          console.log("going for java execution");
            return executeJava(filepath, inputPath);
        case 'py':
          console.log("going for py execution");
            return executePy(filepath, inputPath);
        default:
            throw new Error('Unsupported language');
    }
};

module.exports = {executeCode};