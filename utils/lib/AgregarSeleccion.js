export function AgregarSeleccion(lista) {
    const nuevaLista = lista.map((val, key)=>{
      if (key==0) {
        return {
          ...val,
          seleccionado : true
        }
      }
      return {
        ...val,
        seleccionado : false
      }
    });
    return nuevaLista;
}
export function AgregarSeleccionObjeto(objetoCliente) {
  return {
    ...objetoCliente,
    seleccionado : false
  }
}
export function AgregarSeleccionPorId(lista, idAgregado, labelIdAgregado){
  const nuevaLista =  lista.map((val,key)=>{
    if (val[labelIdAgregado]==idAgregado) {
      return {
        ...val,
        seleccionado : true
      }
    }
    return {
      ...val,
      seleccionado : false
    }
  });
  return nuevaLista
}