import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";

export const Characters = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleDetail = (idPersonaje) => {
        store.idPersonaje = idPersonaje;
        navigate('/characters/detail')
    }

    const handleImagen = (event) => {
        event.target.src = 'https://starwars-visualguide.com/assets/img/big-placeholder.jpg'
    }

    const handleAddFavorito = (favoritoActual) => {
        actions.addFavorito(favoritoActual);
    }

    const handleDeleteFavorito = (favoritoActual) => {
        actions.deleteFavorito(favoritoActual);
    }

    return (
        <div className="container p-5">
            <div className="bg-dark">
            <h1 className="text-white text-center">Characters</h1>
                <div className="container d-flex p-5">
                    <div className="row">
                        {store.personajes.map((item) =>
                            <div key={item.uid} className="col my-5">
                                <div className="card" style={{width: '12rem'}}>
                                    <img src={'https://starwars-visualguide.com/assets/img/characters/'+item.uid+'.jpg'} className="card-img-top" alt="imagen" onError={handleImagen} />
                                    <div className="card-body">
                                        <h6 className="card-title">{item.name}</h6>
                                        <div className="d-flex justify-content-between">
                                            <button onClick={() => handleDetail(item.uid)} type="button" className="btn btn-secondary">Details</button>
                                            {
                                                store.favoritos.find((favoritoActual) => favoritoActual.name == item.name) ?
                                                <button onClick={() => handleDeleteFavorito(item)} type="button" className='btn btn-warning'><i className="fa-regular fa-heart"></i></button>
                                                :
                                                <button onClick={() => handleAddFavorito(item)} type="button" className='btn btn-outline-warning'><i className="fa-regular fa-heart"></i></button>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}