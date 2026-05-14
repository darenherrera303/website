
$w.onReady(() => {
    let currentIndex = 0;

    // Espera a que el dataset esté listo
    $w("#datasetServicios").onReady(() => {
        let totalItems = $w("#datasetServicios").getTotalCount();

        // Botón Siguiente
        $w("#btnNext").onClick(() => {
            currentIndex = (currentIndex + 1) % totalItems;
            $w("#datasetServicios").setCurrentItemIndex(currentIndex);
        });

        // Botón Anterior
        $w("#btnPrev").onClick(() => {
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
            $w("#datasetServicios").setCurrentItemIndex(currentIndex);
        });

        // Auto-play (opcional)
        setInterval(() => {
            currentIndex = (currentIndex + 1) % totalItems;
            $w("#datasetServicios").setCurrentItemIndex(currentIndex);
        }, 5000); // Cambia cada 5 segundos
    });
});
