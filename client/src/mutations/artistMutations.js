import { gql } from "@apollo/client";

const ADD_ARTIST = gql`
	mutation addArtist($name: String!, $nationality: String!) {
		addArtist(name: $name, nationality: $nationality) {
			id
			name
			nationality
		}
	}
`;

const REMOVE_ARTIST = gql`
	mutation removeArtist($id: ID!) {
		removeArtist(id: $id) {
			id
			name
			nationality
		}
	}
`;

export { ADD_ARTIST, REMOVE_ARTIST };
