import { Button, Card, Modal } from "react-bootstrap";
import { useState } from "react";
import EditAlbumModal from "./EditAlbumModal";

export default function AlbumCard({ album }) {
	const [modalShow, setModalShow] = useState(false);
	function closeModal() {
		setModalShow(false);
	}
	return (
		<div className="col">
			<Card
				className="container text-center"
				border="success"
				style={{
					width: "18rem",
					height: "23rem",
					margin: "10px 10px",
					backgroundColor: "rgba(215, 168, 110,0.2)",
				}}>
				<Card.Header className="mt-2">
					<Card.Img
						border="success"
						variant="top"
						style={{ width: "230px", height: "195px" }}
						src={album.cover_source || "record-cover.png"}
					/>
				</Card.Header>
				<Card.Body className="d-flex justify-content-between align-center">
					<div className="flex flex-col justify-content-between align-items-center text-start">
						<Card.Text className="text-small mb-0">
							Title: &nbsp;{album.title}
						</Card.Text>

						<Card.Text className="text-small mb-0">
							By: &nbsp;{album.artist.name}
						</Card.Text>
						<Card.Text className="small-text mb-0">
							Genre: &nbsp;{album.genre}
						</Card.Text>
						<Card.Text>{album.fav_level}</Card.Text>
					</div>

					<Button
						variant="outline-secondary"
						style={{
							color: "rgb(252, 248, 232)",
							backgroundColor: "rgb(166, 75, 42)",
							padding: "2px 5px",
							height: "35px",
						}}
						onClick={() => setModalShow(!modalShow)}>
						View
					</Button>

					<Modal show={modalShow} onHide={closeModal} centered>
						<EditAlbumModal album={album} closeModal={closeModal} />
					</Modal>
				</Card.Body>
			</Card>
		</div>
	);
}
