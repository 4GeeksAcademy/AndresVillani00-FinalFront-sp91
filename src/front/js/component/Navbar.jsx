import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary">
		<div className="container-fluid">
			<Link to="/">
				<span className="navbar-brand mb-0 h1">React Boilerplate</span>
			</Link>
		  <div className="collapse navbar-collapse" id="navbarSupportedContent">
			<ul className="navbar-nav me-auto mb-2 mb-lg-0">
			  <li className="nav-item">
			  	<Link to="/list">
					<span className="navbar-brand mb-0 h1">To do List</span>
				</Link>
			  </li>
			  <li className="nav-item">
			  	<Link to="/contact">
					<span className="navbar-brand mb-0 h1">Contact List</span>
				</Link>
			  </li>
			</ul>
		  </div>
		</div>
	  </nav>
	);
};
