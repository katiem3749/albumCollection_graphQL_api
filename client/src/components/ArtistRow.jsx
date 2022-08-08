import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { REMOVE_ARTIST } from "../mutations/artistMutations";
import { GET_ALBUMS } from "../queries/albumQueries";
import { GET_ARTISTS } from "../queries/artistQueries";
import { useQuery } from "@apollo/client";

export default function ArtistRow({ artist }) {
	const [removeArtist] = useMutation(REMOVE_ARTIST, {
		variables: { id: artist.id },
		refetchQueries: [{ query: GET_ARTISTS }, { query: GET_ALBUMS }],
	});

	const { loading, error, data } = useQuery(GET_ALBUMS);
	if (loading) return "loading to get all albums";
	if (error) return `Error message: ${error.message}`;

	const count = data.albums.filter(
		(album) => album.artist.id === artist.id
	).length;
	return (
		<tr>
			<td>{artist.name}</td>
			<td>{artist.nationality}</td>
			<td>{count}</td>
			<td>
				<button className="btn btn-danger btn-sm" onClick={removeArtist}>
					<FaTrash />
				</button>
			</td>
		</tr>
	);
}
