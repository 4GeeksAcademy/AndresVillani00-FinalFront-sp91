const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			personajes: [],
			idPersonaje: '',
			detallePersonaje: {},
			planetas: [],
			idPlaneta: '',
			detallePlaneta: {},
			naves: [],
			idNave: '',
			detalleNave: {},
			contactos: [],
			contactoParaEditar: {},
			hostStarWars: 'https://www.swapi.tech/api',
			hostContacto: 'https://playground.4geeks.com/contact',
    		slug: 'AndresVillani00'
		},
		actions: {
			getPersonajes: async () => {
				const uri = `${getStore().hostStarWars}/people`;
				const options = {
					method: 'GET'
				};
				
				const response = await fetch(uri, options);
				if(!response.ok){
					console.log('Error: ', response.status, response.statusText);
					return
				}
		
				const datos = await response.json();
				setStore({ personajes: datos.results });
			},
			getDetallePersonaje: async () => {
				const uri = `${getStore().hostStarWars}/people/${getStore().idPersonaje}`;
				const options = {
					method: 'GET'
				};
				
				const response = await fetch(uri, options);
				if(!response.ok){
					console.log('Error: ', response.status, response.statusText);
					return
				}
		
				const datos = await response.json();
				setStore({ detallePersonaje: datos.result.properties });
			},
			getPlanetas: async () => {
				const uri = `${getStore().hostStarWars}/planets`;
				const options = {
					method: 'GET'
				};
				
				const response = await fetch(uri, options);
				if(!response.ok){
					console.log('Error: ', response.status, response.statusText);
					return
				}
		
				const datos = await response.json();
				setStore({ planetas: datos.results });
			},
			getDetallePlaneta: async () => {
				const uri = `${getStore().hostStarWars}/planets/${getStore().idPlaneta}`;
				const options = {
					method: 'GET'
				};
				
				const response = await fetch(uri, options);
				if(!response.ok){
					console.log('Error: ', response.status, response.statusText);
					return
				}
		
				const datos = await response.json();
				setStore({ detallePlaneta: datos.result.properties });
			},
			getNaves: async () => {
				const uri = `${getStore().hostStarWars}/starships`;
				const options = {
					method: 'GET'
				};
				
				const response = await fetch(uri, options);
				if(!response.ok){
					console.log('Error: ', response.status, response.statusText);
					return
				}
		
				const datos = await response.json();
				setStore({ naves: datos.results });
			},
			getDetalleNave: async () => {
				const uri = `${getStore().hostStarWars}/starships/${getStore().idNave}`;
				const options = {
					method: 'GET'
				};
				
				const response = await fetch(uri, options);
				if(!response.ok){
					console.log('Error: ', response.status, response.statusText);
					return
				}
		
				const datos = await response.json();
				setStore({ detalleNave: datos.result.properties });
			},
			getContactos: async () => {
				const uri = `${getStore().hostContacto}/agendas/${getStore().slug}`;
				const options = {
					method: 'GET'
				};
				
				const response = await fetch(uri, options);
				if(!response.ok){
					console.log('Error: ', response.status, response.statusText);
					return
				}

				const datos = await response.json();
				setStore({ contactos: datos.contacts })
			},
			addContacto: async (dataToSend) => {
				const uri = `${getStore().hostContacto}/agendas/${getStore().slug}/contacts`;
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
				const uri = `${getStore().hostContacto}/agendas/${getStore().slug}/contacts/${getStore().contactoParaEditar.id}`;
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
				const uri = `${getStore().hostContacto}/agendas/${getStore().slug}/contacts/${idContacto}`;
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
