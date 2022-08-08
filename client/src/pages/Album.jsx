import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { useQuery } from "@apollo/client";
import { GET_ALBUM } from "../queries/albumQueries";

export default function Album() {
	const { id } = useParams();
	const { loading, error, data } = useQuery(GET_ALBUM, { variables: { id } });

	if (loading) return "loading to get the ablum";
	if (error) return `Error message: ${error.message}`;

	return (
		<>
			{!loading && !error && (
				<div className="mx-auto w-50 card p-5">
					<div className="d-flex align-items-between mb-2 justify-content-between">
						<h1>{data.album.title}</h1>
						<Button href="/" className="btn btn-danger ">
							<p className="font-weight-bold my-auto">Back</p>
						</Button>
					</div>
					<ListGroup>
						<ListGroup.Item>
							Genre:&nbsp;
							{data.album.genre}
						</ListGroup.Item>

						<ListGroup.Item>
							Artist:&nbsp;
							{data.album.artist.name}
						</ListGroup.Item>

						<ListGroup.Item>{data.album.fav_level}</ListGroup.Item>
					</ListGroup>
				</div>
			)}
		</>
	);
}
