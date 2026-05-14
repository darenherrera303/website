import { guardarPostulacion } from 'backend/postulaciones';

$w.onReady(() => {
    // Escucha los mensajes del iframe (ID debe coincidir con tu HTML Embed)
    $w('#html14').onMessage(async (event) => {
        const data = event.data;
        
        if (data.type === 'POSTULACION') {
            try {
                await guardarPostulacion(data.payload);
                // Confirmación al iframe
                $w('#html14').postMessage({ type: 'POSTULACION_OK' });
            } catch (err) {
                console.error('Error al guardar postulación', err);
                $w('#html14').postMessage({ 
                    type: 'POSTULACION_ERROR',
                    message: 'No se pudo guardar la postulación. Intenta más tarde.'
                });
            }
        }
    });
});