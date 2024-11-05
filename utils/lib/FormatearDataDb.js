export function formatearDataStore(dataStore) {
    return dataStore.map(store=>({
        idUsuario : store['Usuario_idUsuario'],
        nombre : store['razSocial'],
        ...store
    }))
}