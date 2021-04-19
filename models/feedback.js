const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    username: {type: String, required: true},
    heading: {type: String, required: true},
    body: {type: String, required: 'Details must must be provided'}
});

const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;