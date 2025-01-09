import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Detail = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
            actions.getDetallePersonaje();
        }, [])

    return (
        <div className="container p-5">
            <div className="d-flex justify-content-center">
                <div className="card mb-3 bg-dark text-white" style={{width: '540px'}}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={'https://starwars-visualguide.com/assets/img/characters/'+store.idPersonaje+'.jpg'} className="img-fluid rounded-start" alt="imagenDetalle" style={{height: '330px'}} />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{store.detallePersonaje.name}</h5>
                                <p className="card-text"><strong>Height: </strong>{store.detallePersonaje.height}.</p>
                                <p className="card-text"><strong>Mass: </strong>{store.detallePersonaje.mass}.</p>
                                <p className="card-text"><strong>Hair color: </strong>{store.detallePersonaje.hair_color}.</p>
                                <p className="card-text"><strong>Skin color: </strong>{store.detallePersonaje.skin_color}.</p>
                                <p className="card-text"><strong>Eye color: </strong>{store.detallePersonaje.eye_color}.</p>
                                <p className="card-text"><strong>Birth year: </strong>{store.detallePersonaje.birth_year}.</p>
                                <p className="card-text"><strong>Gender: </strong>{store.detallePersonaje.gender}.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}