import { triggeredEmails, contacts } from 'wix-crm-backend';
import { webMethod, Permissions } from 'wix-web-module';

export const enviarCorreo = webMethod(Permissions.Anyone, async (datos) => {
    try {
        // 1. Mapa de plantillas (Tus IDs reales)
        const correosPorArea = {
            "comercial@eiatec.com": "b0d54481-9508-415e-b714-7080893e2261",
            "gestionhumana@eiatec.com": "0057fd93-3901-4c47-9442-0d9f318a6b20",
            "contabilidad@eiatec.com": "bc165193-c88c-4ffd-aead-864c50e26544",
            "gerenciatecnica@eiatec.com": "bc165193-c88c-4ffd-aead-864c50e26544",
            "hseq@eiatec.com": "3c5b78f1-b4a2-4b6d-9972-6f48ea3cd952",
            "compras@eiatec.com": "cda0cd37-f324-4b99-823c-977f75b01e7f",
            "gestionjuridica@eiatec.com": "15bccd87-10bc-4a59-ad19-9d0d113a4041"
        };

        const emailId = correosPorArea[datos.departamento];
        if (!emailId) {
            throw new Error("No se encontró una plantilla para el área: " + datos.departamento);
        }

        // 2. Crear contacto con el correo del DEPARTAMENTO (no del usuario)
        const contacto = await contacts.createContact({
            name: {
                first: datos.nombreDepartamento, // Nombre del área (ej: "Comercial")
                last: "Eiatec"
            },
            emails: [{ email: datos.departamento }] // Correo destino real
        });

        // 3. Disparar el correo automático con las variables del usuario
        await triggeredEmails.emailContact(emailId, contacto._id, {
            variables: {
                nombre: datos.nombre,
                apellido: datos.apellido,
                email: datos.email,
                departamento: datos.nombreDepartamento,
                mensaje: datos.mensaje
            }
        });

        console.log(`✅ Correo enviado a ${datos.departamento}`);
        return { success: true };

    } catch (error) {
        console.error("❌ Error en el backend de correo:", error);
        throw error;
    }
});