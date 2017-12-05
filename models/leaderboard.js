var mongoose = require('mongoose')

var LeaderboardSchema = new mongoose.Schema({
	username:{
		type:String,
		unique: true,
		required: true
	},
	score:{
		type:Number,
		required: true
	}
});

const Score = module.exports = mongoose.model('Score', LeaderboardSchema);

module.exports.addScore = function(newScore, callback){
	newScore.save(callback);
}

module.exports.getScores = function(callback){
	Score.find({}, 'username score',function(err, scores) {
		if(err){
			callback(err);
		}else{
			callback(scores);
		}
	})
}