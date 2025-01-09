import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

export const DetailStarships = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getDetalleNave();
    }, [])

    return (
        <div className="container p-5">
            <div className="d-flex justify-content-center">
                <div className="card mb-3 bg-dark text-white" style={{width: '10000px'}}>
                    <div className="row g-0">
                        <div className="col-md-5">
                            <img src={'https://starwars-visualguide.com/assets/img/starships/'+store.idNave+'.jpg'} className="img-fluid rounded-start" alt="imagenDetalle" style={{height: '630px'}} />
                        </div>
                        <div className="col-md-7">
                            <div className="card-body">
                                <h5 className="card-title text-center">{store.detalleNave.name}</h5>
                                <p className="card-text"><strong>Model: </strong>{store.detalleNave.model}.</p>
                                <p className="card-text"><strong>Starship class: </strong>{store.detalleNave.starship_class}.</p>
                                <p className="card-text"><strong>Manufacturer: </strong>{store.detalleNave.manufacturer}.</p>
                                <p className="card-text"><strong>Cost in credits: </strong>{store.detalleNave.cost_in_credits}.</p>
                                <p className="card-text"><strong>Length: </strong>{store.detalleNave.length}.</p>
                                <p className="card-text"><strong>Crew: </strong>{store.detalleNave.crew}.</p>
                                <p className="card-text"><strong>Passengers: </strong>{store.detalleNave.passengers}.</p>
                                <p className="card-text"><strong>Max atmosphering speed: </strong>{store.detalleNave.max_atmosphering_speed}.</p>
                                <p className="card-text"><strong>Hyperdrive rating: </strong>{store.detalleNave.hyperdrive_rating}.</p>
                                <p className="card-text"><strong>MGLT: </strong>{store.detalleNave.MGLT}.</p>
                                <p className="card-text"><strong>Cargo capacity: </strong>{store.detalleNave.cargo_capacity}.</p>
                                <p className="card-text"><strong>Consumables: </strong>{store.detalleNave.consumables}.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}