const mongoose=require('mongoose')
const resultSchema = new mongoose.Schema({
    username: String,
    openness: Number,
    extraversion: Number,
    conscientiousness: Number,
    neuroticism: Number,
    agreeableness: Number,
    date: { type: Date, default: Date.now }, // Automatically store the current date
});

const Result = mongoose.model('Result', resultSchema);
module.exports=Result