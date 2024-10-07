import userCode from "../model/userCode.js";

export const saveCode = async (req, res) => {
    const { id, code } = req.body;
    console.log(req.body);
    try {
      await userCode.findOneAndUpdate({ problemId: id }, { code }, { upsert: true });
      res.status(200).send({ message: 'Code saved successfully' });
    } catch (error) {
      res.status(500).send({ error: 'Failed to save code' });
    }
  };
  
  // Get code
  export const getCode = async (req, res) => {
    const { id } = req.params;
    try {
      const codeData = await userCode.findOne({ problemId: id });
      res.status(200).send(codeData ? { code: codeData.code } : { code: '' });
    } catch (error) {
      res.status(500).send({ error: 'Failed to fetch code' });
    }
  };
  