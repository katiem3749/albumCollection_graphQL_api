import Artists from "../components/Artists";
import Albums from "../components/Albums";
import AddAlbumModal from "../components/AddAlbumModal";
import AddArtistModal from "../components/AddArtistModal";
import Header from "../components/Header";
export default function Home() {
	return (
		<div className="mx-10 flex flex-col">
			<Header />

			<div className="mx-40 body-container">
				<div className="d-flex gap-3 px-5 mt-2 float-end">
					<AddArtistModal />
					<AddAlbumModal />
				</div>
				<br />
				<Albums />
				<Artists />
			</div>
		</div>
	);
}
