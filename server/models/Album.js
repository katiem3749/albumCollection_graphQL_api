const mongoose = require("mongoose");

const AlbumSchema = new mongoose.Schema({
	title: {
		type: String,
	},
	genre: {
		type: String,
		enum: ["Country", "Electronic", "Hip Hop", "Jazz", "Pop", "R&B", "Rock"],
	},
	artistId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Artist",
	},
	cover_source: {
		type: String,
	},
	fav_level: {
		type: String,
		enum: ["LOVE IT!", "Pretty Good!", "Not Bad!", "Maybe..."],
	},
});

module.exports = mongoose.model("Album", AlbumSchema);
