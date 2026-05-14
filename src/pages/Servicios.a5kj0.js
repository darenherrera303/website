import wixData from 'wix-data';

$w.onReady(function () {
    const dataset = $w("#dataset2");      // Asegúrate de que coincida con tu dataset
    const htmlElement = $w("#html2");     // ID del elemento HTML donde incrustaste el código

    async function enviarDatos() {
        try {
            const result = await dataset.getItems(0, 20);
            const items = result.items;

            if (items.length > 0) {
                const dataParaEnviar = items.map(item => {
                    const dynamicLinkKey = Object.keys(item).find(key => key.startsWith('link-'));
                    
                    return {
                        // Tag / categoría
                        tag: item.tipoDeServicio || item.categoria || "Servicio",
                        
                        // Título del servicio
                        titulo: item.title || item.titulo || item.tipoDeServicio,
                        
                        // Descripción / enunciado
                        enunciado: item.enunciado || item.descripcion || "Descripción del servicio.",
                        
                        // Enlace a ficha completa
                        link: item[dynamicLinkKey] || item.link || "/",
                        
                        // Imágenes – enviamos todas las variantes para que el HTML decida
                        imagen: item.imagen || item.image || "",
                        imagenPrincipal: item.imagenPrincipal || "",
                        varianteImagen: item.varianteImagen || "",
                        
                        // Características y video
                        caracteristicas: item.caracteristicas || [],
                        videoUrl: item.videoUrl || item.video || "",
                        videoTitle: item.videoTitle || item.titulo || ""
                    };
                });
                
                htmlElement.postMessage(dataParaEnviar);
                console.log("Datos enviados al HTML", dataParaEnviar);
            }
        } catch (err) {
            console.error("Error al cargar servicios:", err);
        }
    }

    dataset.onReady(() => {
        enviarDatos();
    });

    htmlElement.onMessage((event) => {
        if (event.data === "READY") {
            enviarDatos();
        }
    });
});