// Código Velo para blank-6 (página dinámica de detalle de servicio)
$w.onReady(function () {
    const iframe = $w('#html14');
    const dataset = $w('#dataset1');

    if (!iframe || !dataset) return;

    iframe.onMessage(async (event) => {
        if (event.data === 'READY') {
            await dataset.onReady();
            const item = dataset.getCurrentItem();
            if (item) {
                const payload = {
                    titulo:      item.title   || item.titulo   || 'Servicio',
                    descripcion: item.descripcion || '',
                    icono:       extraerUrl(item.icono),
                    alcance:     item.alcance  || ''
                };
                iframe.postMessage({ type: 'DETALLE', payload }, '*');
            } else {
                iframe.postMessage({ type: 'DETALLE', payload: null }, '*');
            }
        }
    });
});

function extraerUrl(raw) {
    if (!raw) return '';
    const src = (typeof raw === 'object') ? (raw.src || raw.url || '') : String(raw);
    const match = src.match(/wix:image:\/\/v1\/([^\/\#]+)/);
    return match ? `https://static.wixstatic.com/media/${match[1]}` : src;
}