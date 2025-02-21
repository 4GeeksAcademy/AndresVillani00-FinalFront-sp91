import React, { useContext } from "react";
import imgPortal from "../../img/fondoStarWars.jpg";
import chuwi from "../../img/chuwi.jpg";
import mandalorian from "../../img/mandalorian.jpg";
import r2d2 from "../../img/r2d2.jpg";
import vader from "../../img/vader.jpg";
import yoda from "../../img/yoda.jpg";
import "../../styles/home.css";
import { Context } from "../store/appContext";

export const Home = () => {
 	const { store } = useContext(Context);
	const imagenes = [
		chuwi,
		mandalorian,
		r2d2,
		vader,
		yoda
	];
	const aleatorio = Math.floor(Math.random() * imagenes.length);
	const randomImg = imagenes[aleatorio]

	return (
		<div className="container d-flex justify-content-center p-5">
			{
				!store.isLogged || store.usuario.isEmpty ?
				<img className="img-fluid" src={imgPortal} />
				: 
            	<div className="bg-dark">
            	<h1 className="text-white text-center">Usuario</h1>
					<div className="container d-flex p-5">
						<div className="row">
							<div className="card"  style={{width: '18rem'}}>
								<img src={randomImg} className="card-img-top" alt="..." />
								<div className="card-body">
									<h5 className="card-title">{store.usuario.email}</h5>
								</div>
								<ul className="list-group p-2">
									<li className="list-group-item">{store.usuario.first_name}</li>
									<li className="list-group-item">{store.usuario.last_name}</li>
								</ul>
							</div>
						</div>
					</div>
				</div>	
			}
		</div>
	);
};
