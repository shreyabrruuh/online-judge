const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');


const generateFile = (language,code)=>{
    try {
        console.log("generateFile called");
        const dirCodes = path.join(__dirname, `code/${language}`);

        if (!fs.existsSync(dirCodes)) {
            fs.mkdirSync(dirCodes, { recursive: true });
        }

        const jobID = uuid();
        const filename = `${jobID}.${language}`;
        const filePath = path.join(dirCodes, filename);

        fs.writeFileSync(filePath, code);
        console.log(`File created at ${filePath}`);
        return filePath;
    } catch (error) {
        console.error("Error in generateFile:", error);
        throw new Error('File generation failed');
    }
};

module.exports = {generateFile};