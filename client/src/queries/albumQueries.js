import { gql } from "@apollo/client";

const GET_ALBUMS = gql`
	query getAlbums {
		albums {
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

const GET_ALBUM = gql`
	query getAlbum($id: ID!) {
		album(id: $id) {
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

export { GET_ALBUMS, GET_ALBUM };
