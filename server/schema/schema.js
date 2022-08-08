// Mongoose models
const Album = require("../models/Album");
const Artist = require("../models/Artist");

const {
	GraphQLObjectType,
	GraphQLSchema,
	GraphQLID,
	GraphQLString,
	GraphQLList,
	GraphQLEnumType,
	GraphQLNonNull,
	GraphQLInt,
} = require("graphql");

// Album type
const AlbumType = new GraphQLObjectType({
	name: "Album",
	fields: () => ({
		id: { type: GraphQLID },
		title: { type: GraphQLString },
		genre: { type: GraphQLString },
		cover_source: { type: GraphQLString },
		fav_level: { type: GraphQLString },
		artist: {
			type: ArtistType,
			resolve(parent, args) {
				return Artist.findById(parent.artistId);
			},
		},
	}),
});

// Artist type
const ArtistType = new GraphQLObjectType({
	name: "Artist",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		nationality: { type: GraphQLString },
	}),
});

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		albums: {
			type: new GraphQLList(AlbumType),
			resolve(parent, args) {
				return Album.find();
			},
		},
		album: {
			type: AlbumType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Album.findById(args.id);
			},
		},
		artists: {
			type: new GraphQLList(ArtistType),
			resolve(parent, args) {
				return Artist.find();
			},
		},
		artist: {
			type: ArtistType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Artist.findById(args.id);
			},
		},
	},
});

// Mutation
const mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		// add an artist
		addArtist: {
			type: ArtistType,
			args: {
				name: { type: GraphQLNonNull(GraphQLString) },
				nationality: { type: GraphQLNonNull(GraphQLString) },
			},
			resolve(parent, args) {
				const artist = new Artist({
					name: args.name,
					nationality: args.nationality,
				});
				return artist.save();
			},
		},

		// remove an artist
		removeArtist: {
			type: ArtistType,
			args: {
				id: { type: GraphQLNonNull(GraphQLID) },
			},
			resolve(parent, args) {
				Album.find({ artistId: args.id }).then((albums) => {
					albums.forEach((album) => album.remove());
				});
				return Artist.findByIdAndRemove(args.id);
			},
		},

		// Add an album
		addAlbum: {
			type: AlbumType,
			args: {
				title: { type: GraphQLNonNull(GraphQLString) },
				genre: {
					type: new GraphQLEnumType({
						name: "AlbumGenre",
						values: {
							country: { value: "Country" },
							electronic: { value: "Electronic" },
							hip_hop: { value: "Hip Hop" },
							jazz: { value: "Jazz" },
							pop: { value: "Pop" },
							rnb: { value: "R&B" },
							rock: { value: "Rock" },
						},
					}),
				},
				cover_source: {
					type: GraphQLString,
				},
				fav_level: {
					type: new GraphQLEnumType({
						name: "AlbumFavLevel",
						values: {
							level_1: { value: "LOVE IT!" },
							level_2: { value: "Pretty Good!" },
							level_3: { value: "Not Bad!" },
							level_4: { value: "Maybe..." },
						},
					}),
				},
				artistId: { type: GraphQLNonNull(GraphQLID) },
			},
			resolve(parent, args) {
				const album = new Album({
					title: args.title,
					genre: args.genre,
					cover_source: args.cover_source,
					fav_level: args.fav_level,
					artistId: args.artistId,
				});
				return album.save();
			},
		},

		// remove an album
		removeAlbum: {
			type: AlbumType,
			args: {
				id: { type: GraphQLNonNull(GraphQLID) },
			},
			resolve(parent, args) {
				return Album.findByIdAndRemove(args.id);
			},
		},

		// update an album
		updateAlbum: {
			type: AlbumType,
			args: {
				id: { type: GraphQLNonNull(GraphQLID) },
				title: { type: GraphQLString },
				genre: {
					type: new GraphQLEnumType({
						name: "AlbumGenreUpdate",
						values: {
							country: { value: "Country" },
							electronic: { value: "Electronic" },
							hip_hop: { value: "Hip Hop" },
							jazz: { value: "Jazz" },
							pop: { value: "Pop" },
							rnb: { value: "R&B" },
							rock: { value: "Rock" },
						},
					}),
				},
				cover_source: { type: GraphQLString },
				fav_level: {
					type: new GraphQLEnumType({
						name: "AlbumFavLevelUpdate",
						values: {
							level_1: { value: "LOVE IT!" },
							level_2: { value: "Pretty Good!" },
							level_3: { value: "Not Bad!" },
							level_4: { value: "Maybe..." },
						},
					}),
				},
			},
			resolve(parent, args) {
				return Album.findByIdAndUpdate(
					args.id,
					{
						$set: {
							title: args.title,
							genre: args.genre,
							cover_source: args.cover_source,
							fav_level: args.fav_level,
						},
					},
					{ new: true }
				);
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation,
});
