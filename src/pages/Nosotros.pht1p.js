import wixLocation from 'wix-location';

// =============== CONTADORES ===============
const timeDuration = 3;
const timeDuration2 = 60;
const timeDuration3 = 120;

let startNumber = 1;
const endNumber = 1378;   // text88

let startNumber2 = 1;
const endNumber2 = 60;    // text90

let startNumber3 = 1;
const endNumber3 = 4;     // text92

let intervalId, interval2Id, interval3Id;
let contadorActivo = false;

// Iniciar contadores
function iniciarContadores() {
    if (contadorActivo) return;
    contadorActivo = true;

    intervalId = setInterval(() => {
        if (startNumber <= endNumber) {
            $w("#text88").text = startNumber.toLocaleString();
            startNumber++;
        }
    }, timeDuration);

    interval2Id = setInterval(() => {
        if (startNumber2 <= endNumber2) {
            $w("#text90").text = startNumber2.toLocaleString();
            startNumber2++;
        }
    }, timeDuration2);

    interval3Id = setInterval(() => {
        if (startNumber3 <= endNumber3) {
            $w("#text92").text = startNumber3.toLocaleString();
            startNumber3++;
        }
    }, timeDuration3);
}

// Detener si sale de pantalla (opcional)
function detenerContadores() {
    clearInterval(intervalId);
    clearInterval(interval2Id);
    clearInterval(interval3Id);
    contadorActivo = false;
}


// =================== ONREADY ===================
$w.onReady(function () {

    // Mostrar/ocultar contenedores iniciales
    $w("#boxContainer").show();

    $w("#titlMision").hide();
    $w("#DescMision").hide();
    $w("#TitlVision").hide();
    $w("#DescVision").hide();
    $w("#TitlCompromisos").hide();
    $w("#groupCompromisos").hide();
    $w("#TitlCertificaciones").hide();
    $w("#galleryCertificaciones").hide();
    $w("#TitlPoliticas").hide();
    $w("#GropuPoliticas").hide();


    // ===========================
    // BOTÓN MISIÓN
    // ===========================
    $w("#btnMision").onClick(() => {
        if ($w("#titlMision").hidden) {
            $w("#titlMision").show();
            $w("#DescMision").show();

            $w("#TitlVision").hide();
            $w("#DescVision").hide();
            $w("#TitlCompromisos").hide();
            $w("#groupCompromisos").hide();
            $w("#TitlCertificaciones").hide();
            $w("#galleryCertificaciones").hide();
            $w("#TitlPoliticas").hide();
            $w("#GropuPoliticas").hide();
        } else {
            $w("#titlMision").hide();
            $w("#DescMision").hide();
        }
    });


    // ===========================
    // BOTÓN VISIÓN
    // ===========================
    $w("#btnVision").onClick(() => {
        if ($w("#TitlVision").hidden) {
            $w("#TitlVision").show();
            $w("#DescVision").show();

            $w("#titlMision").hide();
            $w("#DescMision").hide();
            $w("#TitlCompromisos").hide();
            $w("#groupCompromisos").hide();
            $w("#TitlCertificaciones").hide();
            $w("#galleryCertificaciones").hide();
            $w("#TitlPoliticas").hide();
            $w("#GropuPoliticas").hide();

        } else {
            $w("#TitlVision").hide();
            $w("#DescVision").hide();
        }
    });


    // ===========================
    // BOTÓN COMPROMISOS
    // ===========================
    $w("#btnCompromisos").onClick(() => {
        if ($w("#TitlCompromisos").hidden) {
            $w("#TitlCompromisos").show();
            $w("#groupCompromisos").show();

            $w("#titlMision").hide();
            $w("#DescMision").hide();
            $w("#TitlVision").hide();
            $w("#DescVision").hide();
            $w("#TitlCertificaciones").hide();
            $w("#galleryCertificaciones").hide();
            $w("#TitlPoliticas").hide();
            $w("#GropuPoliticas").hide();

        } else {
            $w("#TitlCompromisos").hide();
            $w("#groupCompromisos").hide();
        }
    });


    // ===========================
    // BOTÓN CERTIFICACIONES
    // ===========================
    $w("#btnCertificaciones").onClick(() => {
        if ($w("#TitlCertificaciones").hidden) {
            $w("#TitlCertificaciones").show();
            $w("#galleryCertificaciones").show();

            $w("#titlMision").hide();
            $w("#DescMision").hide();
            $w("#TitlVision").hide();
            $w("#DescVision").hide();
            $w("#TitlCompromisos").hide();
            $w("#groupCompromisos").hide();
            $w("#TitlPoliticas").hide();
            $w("#GropuPoliticas").hide();
        } else {
            $w("#TitlCertificaciones").hide();
            $w("#galleryCertificaciones").hide();
        }
    });


    // ===========================
    // BOTÓN POLÍTICAS
    // ===========================
    $w("#btnPoliticas").onClick(() => {
        if ($w("#TitlPoliticas").hidden) {
            $w("#TitlPoliticas").show();
            $w("#GropuPoliticas").show();

            $w("#titlMision").hide();
            $w("#DescMision").hide();
            $w("#TitlVision").hide();
            $w("#DescVision").hide();
            $w("#TitlCompromisos").hide();
            $w("#groupCompromisos").hide();
            $w("#TitlCertificaciones").hide();
            $w("#galleryCertificaciones").hide();
        } else {
            $w("#TitlPoliticas").hide();
            $w("#GropuPoliticas").hide();
        }
    });


    // ===========================
    // SLIDER (dataset3)
    // ===========================
    $w("#dataset3").onReady(() => {

        $w("#button48").onClick(() => {
            let currentIndex = $w("#dataset3").getCurrentItemIndex();
            let totalItems = $w("#dataset3").getTotalCount();
            $w("#dataset3").setCurrentItemIndex(
                currentIndex < totalItems - 1 ? currentIndex + 1 : 0
            );
        });

        $w("#button46").onClick(() => {
            let currentIndex = $w("#dataset3").getCurrentItemIndex();
            let totalItems = $w("#dataset3").getTotalCount();
            $w("#dataset3").setCurrentItemIndex(
                currentIndex > 0 ? currentIndex - 1 : totalItems - 1
            );
        });

    });


    // ===========================
    // CONTADOR – SOLO SE INICIA EN SECTION9
    // ===========================
    $w("#section9").onViewportEnter(() => {
        iniciarContadores();
    });

    $w("#section9").onViewportLeave(() => {
        detenerContadores(); // si no quieres que se resetee, te lo ajusto
    });

});
import wixData from 'wix-data';



$w.onReady(function () {
    const dataset = $w("#dataset2"); // Tu dataset de servicios
    const htmlElement = $w("#html1"); // ID del Embed HTML

    dataset.onReady(async () => {
        enviarDatos();
    });

    async function enviarDatos() {
        try {
            const result = await dataset.getItems(0, 20);
            const items = result.items;

            if (items.length > 0) {
                const dataParaEnviar = items.map(item => {
                    const dynamicLinkKey = Object.keys(item).find(key => key.startsWith('link-'));
                    return {
                        titulo: item.tipoDeServicio || item.title || "Servicio",
                        imagen: item.imagen || item.image,
                        link: item[dynamicLinkKey] || "/"
                    };
                });
                htmlElement.postMessage(dataParaEnviar);
            }
        } catch (err) {
            console.error("Error:", err);
        }
    }

    htmlElement.onMessage((event) => {
        if (event.data === "READY") enviarDatos();
    });
});
