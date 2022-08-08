import { Link } from "react-router-dom";

export default function NotFound() {
	return (
		<div className="d-flex flex-column justify-content-center align-items-center mt-5">
			<p>The page does not exist. Please </p>
			<Link to="/" className="btn btn-warning">
				return
			</Link>
		</div>
	);
}
