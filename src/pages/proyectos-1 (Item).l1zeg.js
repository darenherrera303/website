import wixLocation from 'wix-location';
import wixData from 'wix-data';

$w.onReady(async () => {
    const urlParams = wixLocation.query;
    const projectId = urlParams.id;

    if (!projectId) {
        console.warn('No se encontró ?id= en la URL');
        return;
    }

    try {
        // Cambia 'Proyectos' por el nombre real de tu colección
        const result = await wixData.get('Proyectos', projectId);
        const item = result;

        // Construye el objeto que espera el HTML
        const payload = {
            _id: item._id,
            title: item.title || item.titulo,
            titulo: item.titulo || item.title,
            categora: item.categora || item.categoria,
            categoria: item.categoria || item.categora,
            fecha: item.fecha,
            anunciado: item.anunciado,
            alcance: item.alcance,
            imagenPrincipal: item.imagenPrincipal,
            imagenSecundaria: item.imagenSecundaria,
            resultado: item.resultado,
            objetivosDelProyecto: item.objetivosDelProyecto || item.objetivos,
            objetivos: item.objetivos,
            cliente: item.cliente,
            duracion: item.duracion || item.duraci,
            ubicacin: item.ubicacin || item.ubicacion,
            ubicacion: item.ubicacion || item.ubicacin,
            mapa: item.mapa,
            estado: item.estado,
            mediagallery: item.mediagallery || item.galeria,
            galeria: item.galeria,
            relacionados: item.relacionados,
            // Estos links los puedes calcular si tienes lógica de navegación
            linkAnterior: item.linkAnterior || '',
            linkSiguiente: item.linkSiguiente || ''
        };

        // Envía los datos al iframe
        $w('#html1').postMessage({
            type: 'DETALLE',
            payload: payload
        });
    } catch (error) {
        console.error('Error al cargar proyecto:', error);
    }
});