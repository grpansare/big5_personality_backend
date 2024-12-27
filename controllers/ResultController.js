const Result = require("../models/resultSchema");

const saveresult= async (req, res) => {
    try {
        const result = new Result(req.body);
        await result.save();
        res.status(200).json({ message: 'Result saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving result', error });
    }
};
const getResults= async (req, res) => {
    try {
        const {username}=req.params
       const results=await Result.find({username})
        
        res.status(200).json({ results:results});
    } catch (error) {
        res.status(500).json({ message: 'Error saving result', error });
    }
};


module.exports={saveresult,getResults}