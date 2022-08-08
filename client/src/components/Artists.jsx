import { useQuery } from "@apollo/client";
import ArtistRow from "./ArtistRow";
import { GET_ARTISTS } from "../queries/artistQueries";

export default function Artists() {
	const { loading, error, data } = useQuery(GET_ARTISTS);
	if (loading) return "loading to get all artists";
	if (error) return `Error message: ${error.message}`;

	return (
		<>
			{!loading && !error && (
				<table className="table table-hover table-striped table-responsive mt-5 text-center">
					<thead>
						<tr>
							<th>Name</th>
							<th>Region</th>
							<th># in Collection</th>
							<th></th>
						</tr>
					</thead>
					<tbody className="table-group-divider">
						{data.artists.map((artist) => (
							<ArtistRow key={artist.id} artist={artist} />
						))}
					</tbody>
				</table>
			)}
		</>
	);
}
