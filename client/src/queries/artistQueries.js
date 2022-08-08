import { gql } from "@apollo/client";

const GET_ARTISTS = gql`
	query getArtists {
		artists {
			id
			name
			nationality
		}
	}
`;

export { GET_ARTISTS };
