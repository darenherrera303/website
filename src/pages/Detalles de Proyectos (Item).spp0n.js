import wixStorage from 'wix-storage';

$w.onReady(() => {
  const item = $w("#dynamicDataset").getCurrentItem();

  if (!item) return;

  wixStorage.session.setItem("prevSlug", item.slug);
  wixStorage.session.setItem("prevCollection", $w("#dynamicDataset").getDatasetName());
});
import wixData from 'wix-data';

$w.onReady(function () {
    // ID del elemento HTML Embed (cambia '#html1' por el tuyo)
    const htmlEmbed = $w('#html14');

    // Espera a que el iframe esté listo
    htmlEmbed.onMessage((event) => {
        if (event.data && event.data.type === 'iframeReady') {
            console.log('Iframe listo, cargando datos...');
            cargarProyecto();
        }
    });

    async function cargarProyecto() {
        try {
            // Obtén el ID del proyecto desde la URL o un dataset
            const proyectoId = getProjectIdFromUrl(); // Implementa según tu lógica

            if (!proyectoId) {
                console.warn('No se encontró ID de proyecto en la URL');
                return;
            }

            // Consulta tu colección "Proyectos" (ajusta el nombre)
            const result = await wixData.get('Proyectos', proyectoId);
            const proyecto = result;

            // Construye el objeto con los campos exactos que espera el iframe
            const data = {
                title: proyecto.titulo,                 // Campo en Wix
                categora: proyecto.categoria,
                anunciado: proyecto.anunciado,
                alcance: proyecto.alcance,
                resultado: proyecto.resultado,
                objetivosDelProyecto: proyecto.objetivos,  // Campo de tipo texto con saltos de línea
                cliente: proyecto.cliente,
                categora1: proyecto.categoria1,
                ubicacin: proyecto.ubicacion,
                fecha: proyecto.fecha,
                _id: proyecto._id,
                imagenPrincipal: proyecto.imagenPrincipal,  // Puede ser URL o objeto {src}
                imagenSecundaria: proyecto.imagenSecundaria,
                mapa: proyecto.mapa,
                mediagallery: proyecto.galeria,            // Campo de tipo galería o array de URLs
                'link-proyectos-3-title': proyecto.botonTexto || 'Volver a proyectos'
            };

            // Enviar datos al iframe
            htmlEmbed.postMessage(data);
            console.log('Datos enviados al iframe:', data);

        } catch (error) {
            console.error('Error al cargar proyecto:', error);
        }
    }

    // Extraer ID de la URL: /proyectos/ssjs1-1 → ssjs1-1
    function getProjectIdFromUrl() {
        const path = window.location.pathname;
        const parts = path.split('/');
        return parts[parts.length - 1] || null;
    }
});