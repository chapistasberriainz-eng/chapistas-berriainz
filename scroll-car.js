/* scroll-car.js
   El coche del hero se acerca (escala), se desplaza un poco y gana opacidad
   mientras bajas por el hero. No toca el fondo ni el resto de la página. */
(function () {
    var hero = document.querySelector('.hero');
    var scene = document.querySelector('.scroll-car-scene');
    if (!hero || !scene) return;

    // Respeta a quien tiene desactivadas las animaciones
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        scene.style.opacity = '0.6';
        return;
    }

    var ticking = false;

    function updateCar() {
        // p: 0 arriba del todo -> 1 cuando el hero ya ha salido de pantalla
        var p = Math.min(Math.max(window.scrollY / hero.offsetHeight, 0), 1);

        scene.style.setProperty('--car-shift', (p * 90).toFixed(1) + 'px');
        scene.style.setProperty('--car-y', (p * 30).toFixed(1) + 'px');
        scene.style.setProperty('--car-scale', (0.85 + p * 0.4).toFixed(3));
        scene.style.opacity = (0.35 + p * 0.45).toFixed(3);
        ticking = false;
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(updateCar);
            ticking = true;
        }
    }, { passive: true });

    window.addEventListener('resize', updateCar);
    updateCar();
})();
