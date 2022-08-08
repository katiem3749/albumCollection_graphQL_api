import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { ADD_ARTIST } from "../mutations/artistMutations";
import { GET_ARTISTS } from "../queries/artistQueries";

export default function AddArtistModal() {
	const [name, setName] = useState("");
	const [nationality, setNationality] = useState("");

	const [addArtist] = useMutation(ADD_ARTIST, {
		variables: { name, nationality },
		update(cache, { data: { addArtist } }) {
			const { artists } = cache.readQuery({ query: GET_ARTISTS });
			cache.writeQuery({
				query: GET_ARTISTS,
				data: { artists: [...artists, addArtist] },
			});
		},
	});

	const onSubmit = (e) => {
		e.preventDefault();
		if (name === "") {
			return alert("Please fill in all fields");
		}
		addArtist(name, nationality);
		setName("");
		setNationality("");
	};
	return (
		<>
			<button
				type="button"
				className="btn btn-secondary"
				data-bs-toggle="modal"
				data-bs-target="#addArtistModal">
				<div className="d-flex align-items-center">
					<FaUser className="icon" />
					<div>Add Artist</div>
				</div>
			</button>
			<div
				className="modal fade"
				id="addArtistModal"
				tabIndex="-1"
				aria-labelledby="addArtistModalLabel"
				aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="addArtistModalLabel">
								Add Artist
							</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<form onSubmit={onSubmit}>
								<div className="mb-3">
									<label className="form-lable">Name</label>
									<input
										type="text"
										className="form-control"
										id="name"
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</div>
								<div className="mb-3">
									<label className="form-lable">Nationality</label>
									<input
										type="text"
										className="form-control"
										id="nationality"
										value={nationality}
										onChange={(e) => setNationality(e.target.value)}
									/>
								</div>

								<button
									type="submit"
									data-bs-dismiss="modal"
									className="btn btn-secondary">
									Submit
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
