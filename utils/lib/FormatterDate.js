export function formatearFecha(fechaString) {
    // Crear un objeto de fecha a partir de la cadena proporcionada
    const fecha = new Date(fechaString);
  
    // Obtener el día del mes
    const dia = fecha.getDate();
  
    // Obtener el nombre del mes en español
    const meses = [
      "ene.", "feb.", "mar.", "abr.", "may.", "jun.",
      "jul.", "ago.", "sep.", "oct.", "nov.", "dic."
    ];
    const mes = meses[fecha.getMonth()];
  
    // Obtener el año
    const año = fecha.getFullYear();
  
    // Formatear la hora y minutos (00:00)
    const hora = fecha.getHours();
    const minutos = String(fecha.getMinutes()).padStart(2,'0');
  
    // Construir la cadena de fecha formateada
    const fechaFormateada = `${dia} ${mes} ${año} - ${hora}:${minutos}`;
  
    return fechaFormateada;
  }

 export function formatearFechaActual() {
    const fecha = new Date();

    const dia = String(fecha.getDate()).padStart(2,'0');

    const mes = String(fecha.getMonth()+1).padStart(2,'0');
    const año = fecha.getFullYear();

    const fechaFormateada = `${año}-${mes}-${dia}`
    return fechaFormateada;
}
export function formatearFechaActualYYYMMdd() {
  const fecha = new Date();

  const dia = String(fecha.getDate()).padStart(2,'0');

  const mes = String(fecha.getMonth()+1).padStart(2,'0');
  const año = fecha.getFullYear();

  const fechaFormateada = `${año}-${mes}-${dia}`
  return fechaFormateada;
}