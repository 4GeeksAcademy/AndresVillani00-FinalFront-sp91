import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext";
//Custom Component
import ScrollToTop from "./component/ScrollToTop.jsx";
import { BackendURL } from "./component/BackendURL.jsx";
import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";
//Custom Pages
import { Demo } from "./pages/demo.js";
import { Single } from "./pages/single.js";
import { Home } from "./pages/Home.jsx";
import { Error404 } from "./pages/Error404.jsx";
import { Login } from "./pages/Login.jsx";
import { TodoList } from "./pages/TodoList.jsx";
import { ContactList } from "./pages/ContactList.jsx";
import { Characters } from "./pages/Characters.jsx";
import { ContactAdd } from "./component/ContactAdd.jsx";
import { ContactEdit } from "./component/ContactEdit.jsx";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Characters />} path="/characters" />
                        <Route element={<TodoList />} path="/list" />
                        <Route element={<ContactList />} path="/contact" />
                        <Route element={<ContactAdd />} path="/contact/add" />
                        <Route element={<ContactEdit />} path="/contact/edit" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Error404 />} path="*" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
