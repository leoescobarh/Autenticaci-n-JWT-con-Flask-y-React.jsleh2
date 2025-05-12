import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">Inicio</Link> |{" "}
				<Link to="/signup">Signup</Link> |{" "}
				<Link to="/login">Login</Link> |{" "}
				<Link to="/private">Private</Link>
				</div>
		</nav>
	);
};