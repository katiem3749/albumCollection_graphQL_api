const mongoose = require("mongoose");

const ArtistSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	nationality: {
		type: String,
	},
});

module.exports = mongoose.model("Artist", ArtistSchema);
