import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

export const DetailPlanets = () => {
    const { store, actions } = useContext(Context);
    
        useEffect(() => {
                actions.getDetallePlaneta();
            }, [])

    return (
        <div className="container p-5">
            <div className="d-flex justify-content-center">
                <div className="card mb-3 bg-dark text-white" style={{width: '800px'}}>
                    <div className="row g-0">
                        <div className="col-md-5">
                            <img src={'https://starwars-visualguide.com/assets/img/planets/'+store.idPlaneta+'.jpg'} className="img-fluid rounded-start" alt="imagenDetalle" style={{height: '430px'}} />
                        </div>
                        <div className="col-md-7">
                            <div className="card-body">
                                <h5 className="card-title text-center">{store.detallePlaneta.name}</h5>
                                <p className="card-text"><strong>Diameter: </strong>{store.detallePlaneta.diameter}.</p>
                                <p className="card-text"><strong>Rotation period: </strong>{store.detallePlaneta.rotation_period}.</p>
                                <p className="card-text"><strong>Orbital period: </strong>{store.detallePlaneta.orbital_period}.</p>
                                <p className="card-text"><strong>Gravity: </strong>{store.detallePlaneta.gravity}.</p>
                                <p className="card-text"><strong>Population: </strong>{store.detallePlaneta.population}.</p>
                                <p className="card-text"><strong>Climate: </strong>{store.detallePlaneta.climate}.</p>
                                <p className="card-text"><strong>Terrain: </strong>{store.detallePlaneta.terrain}.</p>
                                <p className="card-text"><strong>Surface water: </strong>{store.detallePlaneta.surface_water}.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}