import wixData from 'wix-data';

$w.onReady(function () {
    const dataset = $w("#dataset3");
    const htmlElement = $w("#html4");

    dataset.onReady(async () => {
        enviarDatos();
    });

    async function enviarDatos() {
        try {
            const result = await dataset.getItems(0, 50);
            const items = result.items;

            if (items.length > 0) {
                const dataParaEnviar = items.map(item => {
                    // 🔥 BUSQUEDA AUTOMÁTICA: Encuentra cualquier campo que empiece por 'link-'
                    const dynamicLinkKey = Object.keys(item).find(key => key.startsWith('link-'));
                    
                    return {
                        titulo: item.tipoDeServicio || item.title || "Servicio",
                        descripcion: item.enunciado || "",
                        icono: item.imagen || item["image"], 
                        linkDetalle: item[dynamicLinkKey] || "/"
                    };
                });
                htmlElement.postMessage(dataParaEnviar);
            }
        } catch (err) {
            console.error("Error al obtener datos:", err);
        }
    }

    htmlElement.onMessage((event) => {
        if (event.data === "READY") enviarDatos();
    });
});


$w.onReady(function () {
    // ⚠️ OJO AQUÍ: Asegúrate de que este ID (#dataset1) coincida con el de tu página.
    // Si usaste #dataset3 o #dataset4 antes, cámbialo aquí.
    const dataset = $w("#dataset1"); 
    
    // Este es el ID de tu recuadro HTML embed
    const htmlElement = $w("#html5"); 

    dataset.onReady(async () => {
        enviarDatos();
    });

    async function enviarDatos() {
        try {
            // Obtenemos los primeros 20 items (puedes subir este número)
            const result = await dataset.getItems(0, 20);
            const items = result.items;

            if (items.length > 0) {
                const dataParaEnviar = items.map(item => {
                    
                    // 🕵️ BUSCADOR AUTOMÁTICO DE LINK
                    // Esto encuentra tu campo "Detalles de Proyectos (Item)" automáticamente
                    const dynamicLinkKey = Object.keys(item).find(key => key.startsWith('link-'));

                    return {
                        id: item._id,

                        // 1. TÍTULO (Visto en tu imagen como "Proyecto")
                        // Intentamos 'proyecto'. Si fallara, usa 'title'.
                        titulo: item.proyecto || item.title || "Proyecto", 
                        
                        // 2. DESCRIPCIÓN (Visto en tu imagen como "Anunciado")
                        // Intentamos 'anunciado'.
                        descripcion: item.anunciado || item.descripcion || "",
                        
                        // 3. IMAGEN (Visto en tu imagen como "Imagen Principal")
                        // Wix suele usar camelCase. Probamos las variantes más comunes.
                        imagen: item.imagenPrincipal || item.imagen_principal || item.image, 
                        
                        // 4. LINK (Detectado automáticamente)
                        link: item[dynamicLinkKey] || "/" 
                    };
                });
                
                // Enviamos los datos limpios al HTML
                htmlElement.postMessage(dataParaEnviar);
                // Esto imprimirá los datos en la consola (abajo) para que verifiques si llegan bien
                console.log("✅ Datos enviados al carrusel:", dataParaEnviar);
            }
        } catch (err) {
            console.error("❌ Error al leer el Dataset:", err);
        }
    }

    // Espera a que el HTML diga "estoy listo" para enviar la info
    htmlElement.onMessage((event) => {
        if (event.data === "READY") {
            enviarDatos();
        }
    });
});
$w.onReady(function () {
    const dataset = $w("#dataset3");
    const htmlElement = $w("#html6");

    dataset.onReady(async () => {
        enviarDatos();
    });

    async function enviarDatos() {
        try {
            const result = await dataset.getItems(0, 50);
            const items = result.items;

            if (items.length > 0) {
                const dataParaEnviar = items.map(item => {
                    // 🔥 BUSQUEDA AUTOMÁTICA: Encuentra cualquier campo que empiece por 'link-'
                    const dynamicLinkKey = Object.keys(item).find(key => key.startsWith('link-'));
                    
                    return {
                        titulo: item.tipoDeServicio || item.title || "Servicio",
                        descripcion: item.enunciado || "",
                        icono: item.imagen || item["image"], 
                        linkDetalle: item[dynamicLinkKey] || "/"
                    };
                });
                htmlElement.postMessage(dataParaEnviar);
            }
        } catch (err) {
            console.error("Error al obtener datos:", err);
        }
    }

    htmlElement.onMessage((event) => {
        if (event.data === "READY") enviarDatos();
    });
});
