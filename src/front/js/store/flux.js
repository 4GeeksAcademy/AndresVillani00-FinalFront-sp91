import axios from "axios";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			currentUser: null,
			auth: false,
			error: {},
			mercadoPago: {},
			products: [],
			product: {},
			favorites: [],
		},
		actions: {
			login: async (email, password) => {
				// hacer fetch que envie el email y password para poder loguearme
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							"email": email,
							"password": password
						})
					})
					let data = await response.json()
					console.log(response);
					
					if (response.status === 200) {
						setStore({ currentUser: data.user })
						localStorage.setItem("token", data.access_token)
						return true
					}
					if (response.status === 404) {
						setStore({ error: data.msj })

						return false
					}


				} catch (error) {
					console.log(error);
					return false
				}
			},
			logout: () => {
				// console.log("funciona");
				localStorage.removeItem("token");
				setStore({ auth: false })
				return true

			},
			validToken: async () => {
				let token = localStorage.getItem("token");
				try {
					let response = await fetch(`${process.env.BACKEND_URL}/api/valid_token`, {
						method: 'GET',
						headers: {

							'Authorization': `Bearer ${token}`
						},

					})
					if (response.ok) {
						let data = await response.json()
						setStore({
							currentUser: data.user
						})
					}



				}
				catch (error) {
					console.log(error);
					return false
				}
			},
			register: async (name, email, password, address, phone) => {
				// hacer fetch que envie el email y password para poder loguearme
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/user`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							"name": name,
							"email": email,
							"password": password,
							"address": address,
							"phone": phone,
							"is_active": true,
							"role_id": 1
						})
					})

					if (response.status === 201) {
						let data = await response.json()

						// localStorage.setItem("token", data.access_token)
						setStore({ auth: data.logged })

						return true
					}
					if (response.status === 404) {
						let data = await response.json()
						setStore({ error: data.msj })

						return false
					}
				} catch (error) {
					console.log(error);
					return false
				}
			},

			pagoMercadoPago: async (total) => {
				try {
					const response = await axios.post(`${process.env.BACKEND_URL}/api/preference`, {
						total: total,  //acá está de nuevo la variable  donde se guarda el total a pagar por el cliente 
					});
					console.log(response.data);
					setStore({ mercadoPago: response.data });  //guardamos  la info en el objeto que creamos en store 
				} catch (error) {
					console.log(error);
				}
			},

			// Obtener todos los productos
			getProducts: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/products`);
					// if (response.ok) {
					const data = await response.json();
					// 	//return { success: true, data: data.results };
					// } else {
					// 	const errorData = await response.json();
					// 	return { success: false, error: errorData.msj };
					// }
					console.log(data)
					setStore({ products: data.results })
					return true
				} catch (error) {
					return { success: false, error: error.message };
				}
			},
			// Obtener un producto específico
			getProduct: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/product/${id}`);
					if (response.ok) {
						const data = await response.json();
						return { success: true, data };
					} else {
						const errorData = await response.json();
						return { success: false, error: errorData.msj };
					}
				} catch (error) {
					return { success: false, error: error.message };
				}
			},
			// Agregar un nuevo producto
			addProduct: async (product) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/product`, {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(product),
					});
					if (response.ok) {
						const data = await response.json();
						return { success: true, data };
					} else {
						const errorData = await response.json();
						return { success: false, error: errorData.msj };
					}
				} catch (error) {
					return { success: false, error: error.message };
				}
			},
			// Eliminar un producto
			deleteProduct: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/product/${id}`, { method: 'DELETE' });
					if (response.ok) {
						return { success: true };
					} else {
						const errorData = await response.json();
						return { success: false, error: errorData.msj };
					}
				} catch (error) {
					return { success: false, error: error.message };
				}
			},
			// Actualizar un producto
			updateProduct: async (id, updates) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/products/${id}`, {
						method: 'PUT',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(updates),
					});
					if (response.ok) {
						const data = await response.json();
						return { success: true, data };
					} else {
						const errorData = await response.json();
						return { success: false, error: errorData.msj };
					}
				} catch (error) {
					return { success: false, error: error.message };
				}
			},

			getFavorites: async (user_id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/wishlist/users/${user_id}`);
					const data = await response.json();
					console.log(data)
					setStore({ favorites: data.results })
					return true
				} catch (error) {
					return { success: false, error: error.message };
				}
			},

			getFavoritesByUserId: async (user_id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/wishlist/users/${user_id}`, {
						method: 'GET',
					});
					if (response.ok) {
						const data = await response.json();
						return { success: true, data };
					} else {
						const errorData = await response.json();
						return { success: false, error: errorData.msj };
					}
				} catch (error) {
					return { success: false, error: error.message };
				}
			},
			uploadImage: async (data) => {
				console.log(data)
				const response = await fetch(`${process.env.BACKEND_URL}/api/upload`, {
					method: 'POST',
					body: data,
					headers: {
						'Authorization': `Bearer ${localStorage.getItem('token')}`

					}
				})
				const data_result = await response.json()
				console.log(data_result)
			}

			// // Agregar a Favoritos
			// addFavorite: (name) => {
			// 	const actions = getActions();
			// 	const store = getStore();
			// 	let isFavorite = actions.favoriteExist(name)
			// 	console.log(isFavorite);
			// 	if (!isFavorite) {
			// 		setStore({ favorites: [...store.favorites, { name: name }] })
			// 	}
			// },
			// // Borrar de Favoritos
			// deleteFavorite: (name) => {
			// 	const store = getStore();
			// 	setStore({ favorites: store.favorites.filter(item => item.name != name) })
			// },
			// // Verificar si existe favorito para evitar duplicados
			// favoriteExist: (name) => {
			// 	const actions = getActions();
			// 	const store = getStore();
			// 	let isFavorite = store.favorites.some(item => item.name == name)
			// 	if (isFavorite) {
			// 		actions.deleteFavorite(name)
			// 		return true
			// 	}
			// 	return false
			// }
		}
	}
};


export default getState;