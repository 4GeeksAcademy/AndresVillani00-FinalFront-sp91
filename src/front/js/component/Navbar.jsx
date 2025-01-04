import React from "react";
import { Link } from "react-router-dom";
import starWars from "../../img/LogoStarWars.png";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg bg-dark">
		<div className="container-fluid">
			<div className="col col-md-4">
				<img src={starWars} className="img-fluid rounded-start w-25" alt="starWars" />
			</div>
			<div className="d-flex">
				<Link to="/" className="text-decoration-none">
					<span className="navbar-brand mb-0 h1 text-secondary">Home</span>
				</Link>
				<div className="collapse navbar-collapse text-end" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
					<li className="nav-item">
						<Link to="/list" className="text-decoration-none">
							<span className="navbar-brand mb-0 h1 text-secondary">To do List</span>
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/contact" className="text-decoration-none">
							<span className="navbar-brand mb-0 h1 text-secondary">Contact List</span>
						</Link>
					</li>
					</ul>
				</div>
			</div>
		</div>
	  </nav>
	);
};
