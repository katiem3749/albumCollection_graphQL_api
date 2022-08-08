import { useState } from "react";
import { FaList } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALBUMS } from "../queries/albumQueries";
import { GET_ARTISTS } from "../queries/artistQueries";
import { ADD_ALBUM } from "../mutations/albumMutations";

export default function AddAlbumModal() {
	const [title, setTitle] = useState("");
	const [genre, setGenre] = useState("");
	const [artistId, setArtistId] = useState("");
	const [cover_source, setCoverSource] = useState("");
	const [fav_level, setFavLevel] = useState("");

	const [addAlbum] = useMutation(ADD_ALBUM, {
		variables: { title, genre, cover_source, fav_level, artistId },
		update(cache, { data: { addAlbum } }) {
			const { albums } = cache.readQuery({ query: GET_ALBUMS });
			cache.writeQuery({
				query: GET_ALBUMS,
				data: { albums: [...albums, addAlbum] },
			});
		},
	});

	//get artists for select
	const { loading, error, data } = useQuery(GET_ARTISTS);

	const onSubmit = (e) => {
		e.preventDefault();
		if (title === "" || genre === "" || fav_level === "") {
			return alert("Please fill in all fields");
		}
		addAlbum(title, genre, cover_source, fav_level, artistId);

		setTitle("");
		setGenre("");
		setCoverSource("");
		setFavLevel("");
		setArtistId("");
	};

	if (loading) return `loading to get all artists`;
	if (error) return "Something went wrong";

	return (
		<>
			{!loading && !error && (
				<>
					<button
						type="button"
						className="btn btn-primary"
						data-bs-toggle="modal"
						data-bs-target="#addAlbumModal">
						<div className="d-flex align-items-center">
							<FaList className="icon" />
							<div>New Album</div>
						</div>
					</button>
					<div
						className="modal fade"
						id="addAlbumModal"
						aria-labelledby="addAlbumModalLabel"
						aria-hidden="true">
						<div className="modal-dialog">
							<div className="modal-content">
								<div className="modal-header">
									<h5 className="modal-title" id="addAlbumModalLabel">
										New Album
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
											<label className="form-lable">Title</label>
											<input
												type="text"
												className="form-control"
												id="title"
												value={title}
												onChange={(e) => setTitle(e.target.value)}
											/>
										</div>
										<div className="mb-3">
											<label className="form-lable">Genre</label>
											<select
												id="genre"
												className="form-select"
												value={genre}
												onChange={(e) => setGenre(e.target.value)}>
												<option value=""></option>
												<option value="country">Country</option>
												<option value="electronic">Electronic</option>
												<option value="hip_hop">Hip Hop</option>
												<option value="jazz">Jazz</option>
												<option value="pop">Pop</option>
												<option value="rnb">R&B</option>
												<option value="rock">Rock</option>
											</select>
										</div>
										<div className="mb-3">
											<label className="form-lable">Cover Image</label>
											<textarea
												className="form-control"
												id="cover_source"
												value={cover_source}
												onChange={(e) =>
													setCoverSource(e.target.value)
												}></textarea>
										</div>

										<div className="mb-3">
											<label className="form-lable">Rating</label>
											<select
												id="fav_level"
												className="form-select"
												value={fav_level}
												onChange={(e) => setFavLevel(e.target.value)}>
												<option value=""></option>
												<option value="level_1">LOVE IT!</option>
												<option value="level_2">Pretty Good!</option>
												<option value="level_3">Not Bad!</option>
												<option value="level_4">Maybe...</option>
											</select>
										</div>

										<div className="mb-3">
											<label className="form-lable">Artist</label>
											<select
												id="artistId"
												className="form-select"
												value={artistId}
												onChange={(e) => setArtistId(e.target.value)}>
												<option value="">Select Artist</option>
												{data.artists.map((artist) => (
													<option key={artist.id} value={artist.id}>
														{artist.name}
													</option>
												))}
											</select>
										</div>

										<button
											type="submit"
											data-bs-dismiss="modal"
											className="btn btn-primary">
											Submit
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
}
