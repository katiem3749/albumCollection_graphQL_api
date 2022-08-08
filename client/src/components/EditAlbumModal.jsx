import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_ALBUM } from "../queries/albumQueries";
import { UPDATE_ALBUM } from "../mutations/albumMutations";
import RemoveAlbumButton from "./RemoveAlbumButton";

export default function EditAlbumModal({ album, closeModal }) {
	const [title, setTitle] = useState(album.title);
	const [genre, setGenre] = useState(() => {
		switch (album.genre) {
			case "Country":
				return "country";
			case "Electronic":
				return "electronic";
			case "Hip Hop":
				return "hip_hop";
			case "Jazz":
				return "jazz";
			case "Pop":
				return "pop";
			case "R&B":
				return "rnb";
			case "Rock":
				return "rock";
			default:
				throw new Error(`Unknown genre: ${album.genre}`);
		}
	});

	const [fav_level, setFavLevel] = useState(() => {
		switch (album.fav_level) {
			case "LOVE IT!":
				return "level_1";
			case "Pretty Good!":
				return "level_2";
			case "Not Bad!":
				return "level_3";
			case "Maybe...":
				return "level_4";
			default:
				throw new Error(`Unknown level: ${album.fav_level}`);
		}
	});
	const [cover_source, setCoverSource] = useState(album.cover_source);

	const [updateAlbum] = useMutation(UPDATE_ALBUM, {
		variables: { id: album.id, title, genre, cover_source, fav_level },
		refetchQueries: [{ query: GET_ALBUM, variables: { id: album.id } }],
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!title || !genre || !fav_level) {
			return alert("Please fill in all fields");
		}
		updateAlbum(title, genre, cover_source, fav_level);
		closeModal();
	};

	return (
		<>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Update Album Details
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit} className="d-grid gap-3">
					{/*  Title */}
					<Form.Group>
						<Form.Label>Title</Form.Label>
						<Form.Control
							type="text"
							id="title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</Form.Group>

					{/* Genre */}
					<Form.Group>
						<Form.Label>Genre</Form.Label>
						<Form.Select
							type="text"
							id="genre"
							value={genre}
							onChange={(e) => setGenre(e.target.value)}>
							<option></option>
							<option value="country">Country</option>
							<option value="electronic">Electronic</option>
							<option value="hip_hop">Hip Hop</option>
							<option value="jazz">Jazz</option>
							<option value="pop">Pop</option>
							<option value="rnb">R&B</option>
							<option value="rock">Rock</option>
						</Form.Select>
					</Form.Group>

					{/*  Cover source */}
					<Form.Group>
						<Form.Label>Album Cover Link</Form.Label>
						<Form.Control
							type="text"
							id="cover_source"
							value={cover_source}
							placeholder={album.cover_source}
							onChange={(e) => setCoverSource(e.target.value)}
						/>
					</Form.Group>

					{/* Rating */}
					<Form.Group>
						<Form.Label>My Rating</Form.Label>
						<Form.Select
							aria-label="fav_level"
							id="fav_level"
							value={fav_level}
							onChange={(e) => setFavLevel(e.target.value)}>
							<option></option>
							<option value="level_1">LOVE IT!</option>
							<option value="level_2">Pretty Good!</option>
							<option value="level_3">Not Bad!</option>
							<option value="level_4">Maybe...</option>
						</Form.Select>
					</Form.Group>

					<div className="d-flex mt-5 justify-content-between">
						<Button type="submit" className=" align-right text-white ">
							Submit
						</Button>
						<RemoveAlbumButton album={album} />
					</div>
				</Form>
			</Modal.Body>
		</>
	);
}
