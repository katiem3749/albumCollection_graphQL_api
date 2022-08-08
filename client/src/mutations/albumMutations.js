import { gql } from "@apollo/client";

const ADD_ALBUM = gql`
	mutation AddAlbum(
		$title: String!
		$genre: AlbumGenre!
		$cover_source: String!
		$fav_level: AlbumFavLevel!
		$artistId: ID!
	) {
		addAlbum(
			title: $title
			genre: $genre
			cover_source: $cover_source
			fav_level: $fav_level
			artistId: $artistId
		) {
			id
			title
			genre
			cover_source
			fav_level
			artist {
				id
				name
				nationality
			}
		}
	}
`;

const REMOVE_ALBUM = gql`
	mutation RemoveAlbum($id: ID!) {
		removeAlbum(id: $id) {
			id
		}
	}
`;

const UPDATE_ALBUM = gql`
	mutation UpdateAlbum(
		$id: ID!
		$title: String!
		$genre: AlbumGenreUpdate!
		$cover_source: String!
		$fav_level: AlbumFavLevelUpdate!
	) {
		updateAlbum(
			id: $id
			title: $title
			genre: $genre
			cover_source: $cover_source
			fav_level: $fav_level
		) {
			id
			title
			genre
			cover_source
			fav_level
			artist {
				id
				name
				nationality
			}
		}
	}
`;

export { ADD_ALBUM, REMOVE_ALBUM, UPDATE_ALBUM };
