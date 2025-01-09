import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import starWars from "../../img/LogoStarWars.png";
import { Context } from "../store/appContext.js";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	const handleLogin = () => {
		if(store.isLogged) {
			actions.setIsLogged(false);
			actions.setUser({});
			navigate('/');
		} else {
			navigate('/login');
		}
	}

	const handleFavorito = (favoritoEliminado) => {
		actions.deleteFavorito(favoritoEliminado);
	}

	return (
		<nav className="navbar navbar-expand-lg bg-dark">
		<div className="container-fluid">
			<div className="col col-md-4">
				<Link to="/" className="text-decoration-none">
					<img src={starWars} className="img-fluid rounded-start w-25" alt="starWars" />
				</Link>
			</div>
			<div className="d-flex">
				<div className="collapse navbar-collapse text-end" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
					<li className="nav-item">
						<Link to="/characters" className="text-decoration-none">
							<span className="navbar-brand mb-0 h1 text-secondary">Characters</span>
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/planets" className="text-decoration-none">
							<span className="navbar-brand mb-0 h1 text-secondary">Planets</span>
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/starships" className="text-decoration-none">
							<span className="navbar-brand mb-0 h1 text-secondary">Starships</span>
						</Link>
					</li>
					{
						store.isLogged ?
						<div className="d-flex">
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
						</div>
						:
						<div></div>
					}
					</ul>
					<div class="dropdown me-2">
						<button class="btn btn-secondary dropdown-toggle text-dark" type="button" data-bs-toggle="dropdown" aria-expanded="false">
							Favoritos <i className="fa-regular fa-heart me-2"></i>
						</button>
						<ul class="dropdown-menu">
							{store.favoritos.map((item) =>
								<li className="list-group-item">{item} <i className="fa-solid fa-trash-can text-danger" onClick={() => handleFavorito(item)}></i></li>
							)}
						</ul>
					</div>
					<button onClick={() => handleLogin()} className="btn btn-outline-success">
						{store.isLogged ? 'Logout' : 'Login'}
					</button>
				</div>
			</div>
		</div>
	  </nav>
	);
};
