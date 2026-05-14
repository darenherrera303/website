import wixData from 'wix-data';

$w.onReady(function () {
    const htmlEmbed = $w("#html15"); // Ajustar ID

    htmlEmbed.onMessage((event) => {
        if (event.data === 'READY') {
            enviarProyectos();
        }
    });

    async function enviarProyectos() {
        try {
            const result = await wixData.query("Proyectos")
                .limit(50)                           // Ajusta el límite si es necesario
                .find();
            const items = result.items;

            const payload = items.map(item => {
                // ── Imagen ──────────────────────────────────
                let imagenUrl = '';
                if (item.imagenPrincipal) {
                    if (typeof item.imagenPrincipal === 'string') {
                        imagenUrl = item.imagenPrincipal;
                    } else if (item.imagenPrincipal.src) {
                        imagenUrl = item.imagenPrincipal.src;
                    } else if (item.imagenPrincipal.url) {
                        imagenUrl = item.imagenPrincipal.url;
                    }
                }

                // ── Año ─────────────────────────────────────
                let year = '';
                if (item.fecha) {
                    const d = new Date(item.fecha);
                    if (!isNaN(d.getTime())) {
                        year = d.getFullYear().toString();
                    } else if (typeof item.fecha === 'string') {
                        const match = item.fecha.match(/\b(20\d{2})\b/);
                        year = match ? match[1] : item.fecha;
                    }
                }

                // ── Enlace ──────────────────────────────────
                const dynamicLinkKey = Object.keys(item).find(key => key.startsWith('link-'));
                const link = item[dynamicLinkKey] || item.link || '#';

                return {
                    titulo:          item.title || item.titulo,
                    imagenPrincipal: imagenUrl,
                    fecha:           item.fecha ? item.fecha.toString() : '',
                    year:            year,
                    categoria:       item.categoria || item.categora,
                    // 🔽 CAMPO ACTUALIZADO: la descripción ahora se envía como "anunciado"
                    anunciado:       item.anunciado || item.descripcion || item.alcance || '',
                    link:            link,
                    destacado:       item.destacado || false
                };
            });

            htmlEmbed.postMessage({ type: 'PROYECTOS', payload: payload });
        } catch (err) {
            htmlEmbed.postMessage({ type: 'ERROR', message: 'Error al leer la colección: ' + err.message });
        }
    }
});