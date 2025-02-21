const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			isLogged: false,
			usuario: {},
			usuarioActual: {},
			personajes: [],
			idPersonaje: '',
			detallePersonaje: {},
			planetas: [],
			idPlaneta: '',
			detallePlaneta: {},
			naves: [],
			idNave: '',
			detalleNave: {},
			favoritos: [],
			favoritoActual: {},
			contactos: [],
			contactoParaEditar: {},
			hostStarWars: 'https://www.swapi.tech/api',
			hostContacto: 'https://playground.4geeks.com/contact',
			alert: {text:'', background:'primary', visible: false}
		},
		actions: {
			login: async (dataToSend) => {
				const uri = `${process.env.BACKEND_URL}/api/login`;	
				const options = {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(dataToSend)
				};
				const response = await fetch(uri, options);
				if(!response.ok){
					if(response.status == 401){
						setStore({alert: {text:'Email o Contraseña incorrectos', background:'danger', visible: true}})
					}
					return
				}

				const datos = await response.json();
				setStore({
					isLogged: true,
					usuario: datos.results
				})
				localStorage.setItem( 'token', datos.access_token );
			},
			logout: () => {
				setStore({
					isLogged: false,
					usuario: {}
				})
				localStorage.removeItem('token')
			},
			setIsLogged: (value) => {
				setStore({ isLogged : value })
			},
			getUser: async (id) => {
				const uri = `${process.env.BACKEND_URL}/users_api/users/${id}`;
				const response = await fetch(uri);
				if(!response.ok){
					console.log('Error: ', response.status, response.statusText);
					return
				}

				const datos = await response.json()
				console.log(datos)
			},
			accessProtected: async () => {
				const uri = `${process.env.BACKEND_URL}/api/protected`;
				const options = {
					method: 'GET',
					headers: {
						"Authorization": `Bearer ${localStorage.getItem('token')}`
					}
				};
				const response = await fetch(uri, options);
				if(!response.ok){
					console.log('Error: ', response.status, response.statusText);
					return
				}

				const datos = await response.json()
				console.log(datos)
				console.log(localStorage.getItem('token'))
			},
			setUser: (usuarioActual) => {
				setStore({ usuario: usuarioActual })
			},
			setAlert: () => {
				setStore({alert: {text:'Email o Contraseña incorrectos', background:'danger', visible: false}})
			},
			getPersonajes: async () => {
				const uri = `${getStore().hostStarWars}/people`;	
				const response = await fetch(uri);
				if(!response.ok){
					console.log('Error: ', response.status, response.statusText);
					return
				}
		
				const datos = await response.json();
				setStore({ personajes: datos.results });
				localStorage.setItem( 'personajes', JSON.stringify(datos.results) );
			},
			getDetallePersonaje: async () => {
				const uri = `${getStore().hostStarWars}/people/${getStore().idPersonaje}`;
				const response = await fetch(uri);
				if(!response.ok){
					console.log('Error: ', response.status, response.statusText);
					return
				}
		
				const datos = await response.json();
				setStore({ detallePersonaje: datos.result.properties });
			},
			getPlanetas: async () => {
				const uri = `${getStore().hostStarWars}/planets`;			
				const response = await fetch(uri);
				if(!response.ok){
					console.log('Error: ', response.status, response.statusText);
					return
				}
		
				const datos = await response.json();
				setStore({ planetas: datos.results });
				localStorage.setItem( 'planetas', JSON.stringify(datos.results) );
			},
			getDetallePlaneta: async () => {
				const uri = `${getStore().hostStarWars}/planets/${getStore().idPlaneta}`;
				const response = await fetch(uri);
				if(!response.ok){
					console.log('Error: ', response.status, response.statusText);
					return
				}
		
				const datos = await response.json();
				setStore({ detallePlaneta: datos.result.properties });
			},
			getNaves: async () => {
				const uri = `${getStore().hostStarWars}/starships`;
				const response = await fetch(uri);
				if(!response.ok){
					console.log('Error: ', response.status, response.statusText);
					return
				}
		
				const datos = await response.json();
				setStore({ naves: datos.results });
				localStorage.setItem( 'naves', JSON.stringify(datos.results) );
			},
			getDetalleNave: async () => {
				const uri = `${getStore().hostStarWars}/starships/${getStore().idNave}`;
				const response = await fetch(uri);
				if(!response.ok){
					console.log('Error: ', response.status, response.statusText);
					return
				}
		
				const datos = await response.json();
				setStore({ detalleNave: datos.result.properties });
			},
			addFavorito: (favorito) => {
				setStore({ favoritos: [...getStore().favoritos, favorito] });
			},
			deleteFavorito: (favorito) => {
				setStore({ favoritos: getStore().favoritos.filter((fav) => fav !=  favorito) })
			},
			getContactos: async () => {
				const uri = `${getStore().hostContacto}/agendas/${getStore().usuario.usuario}`;
				const response = await fetch(uri);
				if(!response.ok){
					console.log('Error: ', response.status, response.statusText);
					return
				}

				const datos = await response.json();
				setStore({ contactos: datos.contacts })
			},
			addContacto: async (dataToSend) => {
				const uri = `${getStore().hostContacto}/agendas/${getStore().usuario.usuario}/contacts`;
				const options = {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(dataToSend)
				};
			
				const response = await fetch(uri, options);
				if(!response.ok){
					console.log('Error: ', response.status, response.statusText);
					return
				}

				getActions().getContactos();
			},
			editarContacto: async (dataToEdit) => {
				const uri = `${getStore().hostContacto}/agendas/${getStore().usuario.usuario}/contacts/${getStore().contactoParaEditar.id}`;
				const options = {
					method: 'PUT',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(dataToEdit)
				};
			
				const response = await fetch(uri, options);
				if(!response.ok){
					console.log('Error: ', response.status, response.statusText);
					return
				}
		
				getActions().getContactos();
			},
			deleteContactos: async (idContacto) => {
				const uri = `${getStore().hostContacto}/agendas/${getStore().usuario.usuario}/contacts/${idContacto}`;
				const options = {
					method: 'DELETE'
				};
				
				const response = await fetch(uri, options);
				if(!response.ok){
					console.log('Error: ', response.status, response.statusText);
					return
				}
		
				getActions().getContactos();
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
