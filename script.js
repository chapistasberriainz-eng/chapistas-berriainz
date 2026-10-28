const fotosServicios = {
    chapa: {
        nombre: 'Reparación de Chapa',
        fotos: ['images/chapas-antes.jpg', 'images/chapas-despues.jpg']
    },
    pintura: {
        nombre: 'Pintura Automotriz',
        fotos: ['images/color-antes.jpg', 'images/color-despues.jpg']
    },
    pulido: {
        nombre: 'Pulido y Abrillantado',
        fotos: ['images/chapas-despues.jpg', 'images/color-despues.jpg']
    },
    express: {
        nombre: 'Servicio Express',
        fotos: ['images/pintura.jpg', 'images/chapa.jpg']
    },
    color: {
        nombre: 'Cambio de Color',
        fotos: ['images/color-antes.jpg', 'images/color-despues.jpg']
    },
    mantenimiento: {
        nombre: 'Mantenimiento',
        fotos: ['images/mantenimiento.jpg', 'images/pulido.jpg']
    }
};

let fotoActualIndex = 0;
let servicioActual = '';

function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    if (navLinks) {
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
}

function setupGaleriaServicios() {
    const tarjetasServicios = document.querySelectorAll('[data-servicio]');
    tarjetasServicios.forEach(tarjeta => {
        tarjeta.style.cursor = 'pointer';
        tarjeta.addEventListener('click', function() {
            const servicio = this.getAttribute('data-servicio');
            abrirGaleriaServicio(servicio);
        });

        tarjeta.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const servicio = this.getAttribute('data-servicio');
                abrirGaleriaServicio(servicio);
            }
        });
    });

    const cerrarBtn = document.querySelector('.cerrar-galeria');
    const modal = document.getElementById('modal-galeria');
    if (cerrarBtn) cerrarBtn.addEventListener('click', cerrarGaleriaServicio);
    if (modal) {
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                cerrarGaleriaServicio();
            }
        });
    }

    const prevBtn = document.querySelector('.prev-foto');
    const nextBtn = document.querySelector('.next-foto');
    if (prevBtn) prevBtn.addEventListener('click', fotoAnterior);
    if (nextBtn) nextBtn.addEventListener('click', fotoSiguiente);

    document.addEventListener('keydown', function(e) {
        const modalActual = document.getElementById('modal-galeria');
        if (modalActual && modalActual.classList.contains('open')) {
            if (e.key === 'ArrowLeft') fotoAnterior();
            if (e.key === 'ArrowRight') fotoSiguiente();
            if (e.key === 'Escape') cerrarGaleriaServicio();
        }
    });
}

function abrirGaleriaServicio(servicio) {
    servicioActual = servicio;
    fotoActualIndex = 0;

    const modal = document.getElementById('modal-galeria');
    const titulo = document.getElementById('modal-titulo-servicio');

    if (!fotosServicios[servicio]) {
        console.error('Servicio no encontrado:', servicio);
        return;
    }

    const datos = fotosServicios[servicio];
    titulo.textContent = datos.nombre;

    mostrarFoto(0);
    if (modal) modal.classList.add('open');
}

function cerrarGaleriaServicio() {
    const modal = document.getElementById('modal-galeria');
    if (modal) modal.classList.remove('open');
}

function fotoAnterior() {
    const datos = fotosServicios[servicioActual];
    if (!datos) return;

    fotoActualIndex = (fotoActualIndex - 1 + datos.fotos.length) % datos.fotos.length;
    mostrarFoto(fotoActualIndex);
}

function fotoSiguiente() {
    const datos = fotosServicios[servicioActual];
    if (!datos) return;

    fotoActualIndex = (fotoActualIndex + 1) % datos.fotos.length;
    mostrarFoto(fotoActualIndex);
}

function mostrarFoto(index) {
    const datos = fotosServicios[servicioActual];
    if (!datos || !datos.fotos[index]) return;

    const imgElement = document.getElementById('foto-actual');
    const contadorElement = document.getElementById('contador-fotos');

    if (imgElement) imgElement.src = datos.fotos[index];
    if (contadorElement) contadorElement.textContent = `${index + 1} / ${datos.fotos.length}`;
}

function setupFormSubmission() {
    const formulario = document.getElementById('formularioContacto');

    if (formulario) {
        formulario.addEventListener('submit', function(e) {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const vehiculo = document.getElementById('vehiculo').value.trim();
            const servicio = document.getElementById('servicio').value;
            const mensaje = document.getElementById('mensaje').value.trim();

            const mensajeWhatsApp = `Hola CHAPISTAS BERRIANZ,\n\nMe gustaría solicitar un presupuesto con los siguientes datos:\n\n*Datos Personales:*\n- Nombre: ${nombre}\n- Email: ${email}\n- Teléfono: ${telefono}\n\n*Información del Vehículo:*\n- Modelo: ${vehiculo}\n- Servicio: ${servicio}\n\n*Descripción del Trabajo:*\n${mensaje}`;

            const urlWhatsApp = `https://wa.me/34636693893?text=${encodeURIComponent(mensajeWhatsApp)}`;
            window.open(urlWhatsApp, '_blank');
            formulario.reset();
        });
    }
}

function setupGalleryLinkBehavior() {
    const gallerySection = document.getElementById('galeria');
    const galleryLinks = document.querySelectorAll('a[href="#galeria"]');

    if (!gallerySection || galleryLinks.length === 0) return;

    gallerySection.classList.add('hidden-gallery');

    galleryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            gallerySection.classList.remove('hidden-gallery');
            gallerySection.classList.add('visible');
            setTimeout(() => {
                gallerySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 50);
        });
    });
}

function setupCarScrollBackground() {
    const scene = document.querySelector('.scroll-car-scene');
    if (!scene) return;

    const update = () => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0;

        document.documentElement.style.setProperty('--car-shift', `${-240 + progress * 480}px`);
        document.documentElement.style.setProperty('--car-scale', (0.68 + progress * 0.62).toFixed(3));
        document.documentElement.style.setProperty('--car-y', `${60 - progress * 110}px`);
        scene.style.opacity = (0.08 + progress * 0.72).toFixed(3);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
}

document.addEventListener('DOMContentLoaded', function() {
    setupMobileMenu();
    setupGalleryLinkBehavior();
    setupFormSubmission();
    setupGaleriaServicios();
    setupCarScrollBackground();
});
