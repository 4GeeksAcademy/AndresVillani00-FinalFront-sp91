import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";

export const Characters = () => {
    const { store } = useContext(Context);
    const navigate = useNavigate();

    const handleDetail = (idPersonaje) => {
        store.idPersonaje = idPersonaje;
        navigate('/characters/detail')
    }

    return (
        <div className="container p-5">
            <div className="bg-dark">
            <h1 className="text-white text-center">Characters</h1>
                <div className="container d-flex p-5">
                    <div className="row">
                        {store.personajes.map((item) =>
                            <div className="col my-5">
                                <div className="card" style={{width: '12rem'}}>
                                    <img src={'https://starwars-visualguide.com/assets/img/characters/'+item.uid+'.jpg'} className="card-img-top" alt="imagen" />
                                    <div className="card-body">
                                        <h6 className="card-title">{item.name}</h6>
                                        <div className="d-flex justify-content-between">
                                            <button onClick={() => handleDetail(item.uid)} className="btn btn-secondary">Details</button>
                                            <button type="button" className="btn btn-outline-warning"><i className="fa-regular fa-heart"></i></button>
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