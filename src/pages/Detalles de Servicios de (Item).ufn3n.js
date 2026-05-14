import wixLocation from 'wix-location';

export function btnEstudios_click(event) {

    // Obtener el item actual del dataset
    const item = $w('#dataset2').getCurrentItem();

    if (!item) {
        console.error("❌ No hay item en el dataset");
        return;
    }

    // 🔥 Buscar automáticamente el campo link dinámico
    const dynamicLinkKey = Object.keys(item).find(key => key.startsWith('link-'));

    if (!dynamicLinkKey) {
        console.error("❌ No se encontró el campo link dinámico");
        console.log(item); // para depurar
        return;
    }

    const dynamicLink = item[dynamicLinkKey];

    console.log("🔗 Navegando a:", dynamicLink);

    // 🚀 Redirigir correctamente
    wixLocation.to(dynamicLink);
}