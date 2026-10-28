/* script.js - Chapistas Berriainz
   Menú móvil + formulario por WhatsApp.
   (El coche con scroll vive ahora en scroll-car.js y los servicios
   enlazan directamente a la galería, así que ya no hace falta
   el modal, la galería oculta ni el coche aquí.) */

function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (!hamburger || !navLinks) return;

    const toggle = () => navLinks.classList.toggle('active');

    hamburger.addEventListener('click', toggle);
    hamburger.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle();
        }
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('active'));
    });
}

function setupFormSubmission() {
    const formulario = document.getElementById('formularioContacto');
    if (!formulario) return;

    formulario.addEventListener('submit', function (e) {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const vehiculo = document.getElementById('vehiculo').value.trim();
        const servicio = document.getElementById('servicio').value;
        const mensaje = document.getElementById('mensaje').value.trim();

        const mensajeWhatsApp = `Hola CHAPISTAS BERRIANZ,\n\nMe gustaría solicitar un presupuesto con los siguientes datos:\n\n*Datos Personales:*\n- Nombre: ${nombre}\n- Email: ${email}\n- Teléfono: ${telefono}\n\n*Información del Vehículo:*\n- Modelo: ${vehiculo}\n- Servicio: ${servicio}\n\n*Descripción del Trabajo:*\n${mensaje}\n\nEspero respuesta pronto.\n\nGracias.`;

        const urlWhatsApp = `https://wa.me/34636693893?text=${encodeURIComponent(mensajeWhatsApp)}`;
        window.open(urlWhatsApp, '_blank');
        formulario.reset();
    });
}

document.addEventListener('DOMContentLoaded', function () {
    setupMobileMenu();
    setupFormSubmission();
});
