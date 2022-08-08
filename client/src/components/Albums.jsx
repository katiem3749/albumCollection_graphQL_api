import AlbumCard from "./AlbumCard";
import { useQuery } from "@apollo/client";
import { GET_ALBUMS } from "../queries/albumQueries";

export default function Albums() {
	const { loading, error, data } = useQuery(GET_ALBUMS);
	if (loading) return "loading to get all albums";
	if (error) return `Error message: ${error.message}`;

	return (
		<>
			{data.albums.length > 0 ? (
				<div className="row mt-4 ">
					{data.albums.map((album) => (
						<AlbumCard key={album.id} album={album} />
					))}
				</div>
			) : (
				<p>Nothing good yet!</p>
			)}
		</>
	);
}
