export function formatCategorie(dataCategories) {
    return dataCategories.map((categorie)=>{
        return {
            id : categorie.idTipoTienda,
            title : categorie.nombre,
            value : categorie.idTipoNegocio,
        }
    })
}