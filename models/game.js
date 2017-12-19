var mongoose = require('mongoose')

var GameSchema = new mongoose.Schema({
	gid:{
		type:Number,
		required: true
	},
	type:{
		type:String,
		required: true
	}
});

const Game = module.exports = mongoose.model('Game', GameSchema);

module.exports.addGame = function(newGame, callback){
	newGame.save(callback);
}

module.exports.getGames = function(callback){
	Game.find({}, '-_id gid type').exec(function(err, games){
		if(err){
			callback(err,null);
		}else{
			callback(null,games);
		}
	})
}

module.exports.removeGameById = function(id,callback){
	Game.remove({gid:id}).exec(function(err, games){
		if(err){
			callback(err,null);
		}else{
			callback(null,games);
		}
	})
}