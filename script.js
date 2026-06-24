/* ============================================
   INTERACTIVIDAD Y FUNCIONALIDAD
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    setupMobileMenu();
    setupFormSubmission();
    setupScrollAnimations();
});

/* ============================================
   MENÚ MÓVIL
   ============================================ */

function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Cerrar menú al hacer clic en un enlace
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
}

/* ============================================
   FORMULARIO DE CONTACTO
   ============================================ */

function setupFormSubmission() {
    const formulario = document.getElementById('formularioContacto');

    if (formulario) {
        formulario.addEventListener('submit', function(e) {
            e.preventDefault();

            // Obtener valores del formulario
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const telefono = document.getElementById('telefono').value;
            const vehiculo = document.getElementById('vehiculo').value;
            const servicio = document.getElementById('servicio').value;
            const mensaje = document.getElementById('mensaje').value;

            // Crear mensaje para WhatsApp
            const mensajeWhatsApp = `
Hola CHAPISTAS BERRIANZ,

Me gustaría solicitar un presupuesto con los siguientes datos:

*Datos Personales:*
- Nombre: ${nombre}
- Email: ${email}
- Teléfono: ${telefono}

*Información del Vehículo:*
- Modelo: ${vehiculo}
- Servicio: ${servicio}

*Descripción del Trabajo:*
${mensaje}

Espero respuesta pronto.

Gracias.
            `.trim();

            // Crear mensaje para Email
            const asuntoEmail = `Solicitud de Presupuesto - ${vehiculo}`;
            const cuerpoEmail = `
Estimados,

Le escribo para solicitar un presupuesto para mi vehículo.

Datos Personales:
- Nombre: ${nombre}
- Email: ${email}
- Teléfono: ${telefono}

Información del Vehículo:
- Modelo: ${vehiculo}
- Servicio Solicitado: ${servicio}

Descripción del Trabajo:
${mensaje}

Espero respuesta pronto.

Saludos,
${nombre}
            `;

            // Mostrar opciones de contacto
            mostrarOpciones(nombre, email, telefono, mensajeWhatsApp, asuntoEmail, cuerpoEmail);
        });
    }
}

function mostrarOpciones(nombre, email, telefono, mensajeWhatsApp, asuntoEmail, cuerpoEmail) {
    // Crear modal con opciones
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Selecciona cómo enviar tu solicitud</h2>
            <p>Hola ${nombre}, ¿cómo prefieres ponerte en contacto?</p>
            <div class="modal-options">
                <button class="modal-btn whatsapp-btn">
                    <i class="fab fa-whatsapp"></i>
                    Enviar por WhatsApp
                </button>
                <button class="modal-btn email-btn">
                    <i class="fas fa-envelope"></i>
                    Enviar por Email
                </button>
                <button class="modal-btn manual-btn">
                    <i class="fas fa-copy"></i>
                    Copiar Mensaje
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    modal.style.display = 'block';

    // Cerrar modal
    const closeBtn = modal.querySelector('.close');
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        modal.remove();
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            modal.remove();
        }
    });

    // WhatsApp
    const whatsappBtn = modal.querySelector('.whatsapp-btn');
    whatsappBtn.addEventListener('click', () => {
        const numeroWhatsApp = '34636693893';
        const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensajeWhatsApp)}`;
        window.open(urlWhatsApp, '_blank');
        modal.style.display = 'none';
        modal.remove();
        resetearFormulario();
    });

    // Email
    const emailBtn = modal.querySelector('.email-btn');
    emailBtn.addEventListener('click', () => {
        const urlEmail = `mailto:chapistasberriainz@gmail.com?subject=${encodeURIComponent(asuntoEmail)}&body=${encodeURIComponent(cuerpoEmail)}`;
        window.location.href = urlEmail;
        modal.style.display = 'none';
        modal.remove();
        resetearFormulario();
    });

    // Copiar mensaje
    const manualBtn = modal.querySelector('.manual-btn');
    manualBtn.addEventListener('click', () => {
        const mensajeFinal = `${mensajeWhatsApp}\n\n---\n\nTambién puede enviar un email a: chapistasberriainz@gmail.com`;
        navigator.clipboard.writeText(mensajeFinal).then(() => {
            alert('Mensaje copiado al portapapeles. Puedes pegarlo en WhatsApp u otro medio de contacto.');
            modal.style.display = 'none';
            modal.remove();
            resetearFormulario();
        });
    });
}

function resetearFormulario() {
    const formulario = document.getElementById('formularioContacto');
    if (formulario) {
        formulario.reset();
    }
}

/* ============================================
   ANIMACIONES AL SCROLL
   ============================================ */

function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar elementos
    document.querySelectorAll('.servicio-card, .galeria-item, .info-box').forEach(el => {
        observer.observe(el);
    });
}

/* ============================================
   ESTILOS ADICIONALES PARA MODAL
   ============================================ */

const style = document.createElement('style');
style.textContent = `
    .modal {
        position: fixed;
        z-index: 2000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    .modal-content {
        background-color: #2d2d2d;
        margin: 15% auto;
        padding: 2rem;
        border: 2px solid #ff6b35;
        border-radius: 10px;
        width: 80%;
        max-width: 500px;
        text-align: center;
        animation: slideDown 0.3s ease;
        color: #e0e0e0;
    }

    @keyframes slideDown {
        from {
            transform: translateY(-50px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    .modal-content h2 {
        color: #ff6b35;
        margin-bottom: 1rem;
        font-size: 1.5rem;
    }

    .modal-content p {
        margin-bottom: 2rem;
        color: #e0e0e0;
    }

    .close {
        color: #aaa;
        float: right;
        font-size: 1.5rem;
        font-weight: bold;
        cursor: pointer;
        transition: color 0.3s ease;
    }

    .close:hover,
    .close:focus {
        color: #ff6b35;
    }

    .modal-options {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .modal-btn {
        padding: 1rem;
        font-size: 1rem;
        border: 2px solid #ff6b35;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s ease;
        background-color: #1a1a1a;
        color: #ff6b35;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
    }

    .modal-btn:hover {
        background-color: #ff6b35;
        color: white;
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(255, 107, 53, 0.4);
    }

    .modal-btn i {
        font-size: 1.2rem;
    }

    .whatsapp-btn:hover {
        border-color: #25d366;
        background-color: #25d366;
    }

    .email-btn:hover {
        border-color: #ff6b35;
    }

    .manual-btn:hover {
        border-color: #4caf50;
        background-color: #4caf50;
    }

    /* Animación de entrada para tarjetas */
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* Responsive modal */
    @media (max-width: 600px) {
        .modal-content {
            width: 90%;
            margin: 30% auto;
            padding: 1.5rem;
        }

        .modal-content h2 {
            font-size: 1.2rem;
        }

        .modal-btn {
            padding: 0.8rem;
            font-size: 0.9rem;
        }
    }
`;

document.head.appendChild(style);

/* ============================================
   FUNCIÓN PARA EDITAR IMÁGENES EN LA GALERÍA
   ============================================ */

window.editarImagenGaleria = function(indice, tipo, urlNueva) {
    const items = document.querySelectorAll('.galeria-item');
    if (items[indice]) {
        const item = items[indice];
        const img = item.querySelector(`.${tipo} img`);
        if (img) {
            img.src = urlNueva;
            console.log(`✓ Imagen ${tipo} actualizada en galería ${indice + 1}`);
        }
    }
};

console.log('CHAPISTAS BERRIANZ - Sistema de Edición Disponible');
console.log('Para editar imágenes, usa: editarImagenGaleria(índice, "antes" o "después", "URL")');
