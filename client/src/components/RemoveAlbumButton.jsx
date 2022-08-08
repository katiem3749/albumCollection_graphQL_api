import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { GET_ALBUMS } from "../queries/albumQueries";
import { useMutation } from "@apollo/client";
import { REMOVE_ALBUM } from "../mutations/albumMutations";
import Button from "react-bootstrap/Button";

export default function RemoveAlbumButton({ album }) {
	const navigate = useNavigate();

	const [removeAlbum] = useMutation(REMOVE_ALBUM, {
		variables: { id: album.id },
		onCompleted: () => navigate("/"),
		refetchQueries: [{ query: GET_ALBUMS }], // refetch instead of updating cache
	});
	return (
		<Button className="btn btn-danger" onClick={removeAlbum}>
			<FaTrash className="icon" />
			Remove Album
		</Button>
	);
}
