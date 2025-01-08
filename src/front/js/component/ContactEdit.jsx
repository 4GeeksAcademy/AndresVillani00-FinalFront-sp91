import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";

export const ContactEdit = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [ name, setName ] = useState(store.contactoParaEditar.name);
    const [ email, setEmail ] = useState(store.contactoParaEditar.email);
    const [ phone, setPhone ] = useState(store.contactoParaEditar.phone);
    const [ address, setAddress ] = useState(store.contactoParaEditar.address);

    const handleSubmitEdit = async (event) => {
        event.preventDefault();
        const contactoEditado = {
            name: name,
            phone: phone,
            email: email,
            address: address
          };
        actions.editarContacto(contactoEditado);
        navigate('/contact')
    }

    return (
        <div className="container p-5">
            <div className="container p-5 bg-dark">
                <h1 className="text-white text-start">Edit Contact</h1>
                <form onSubmit={handleSubmitEdit}>
                    <div className="mb-3">
                        <label htmlFor="inputName" className="form-label text-secondary d-flex">Full Name<p className="text-warning mx-2">*</p></label>
                        <input onChange={(event) => setName(event.target.value)} value={name} type="text" className="form-control" id="inputName" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputEmail" className="form-label text-secondary d-flex">Email Address<p className="text-warning mx-2">*</p></label>
                        <input onChange={(event) => setEmail(event.target.value)} value={email} type="email" className="form-control" id="inputEmail" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputPhone" className="form-label text-secondary d-flex">Phone<p className="text-warning mx-2">*</p></label>
                        <input onChange={(event) => setPhone(event.target.value)} value={phone} type="text" className="form-control" id="inputPhone" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputAddress" className="form-label text-secondary d-flex">Address<p className="text-warning mx-2">*</p></label>
                        <input onChange={(event) => setAddress(event.target.value)} value={address} type="text" className="form-control" id="inputAddress" />
                    </div>
                    <div className="mb-3 text-end">
                        <button type="submit" className="btn btn-warning me-2">Submit</button>
                        <button type="reset" onClick={() => navigate('/contact')} className="btn btn-secondary">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}