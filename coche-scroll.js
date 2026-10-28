/* coche-scroll.js
   El coche aparece cuando termina la portada y se va desmontando
   (techo, capó, puertas, trasera y ruedas) mientras bajas por la página.
   No modifica ningún otro elemento de la web. */
(function () {
    var bg = document.querySelector('.car-bg');
    var hero = document.querySelector('.hero');
    var stage = document.querySelector('.car-stage');
    if (!bg || !hero || !stage) return;

    // Cuánto se mueve cada pieza (como fracción del ancho del coche), giro (grados) y escala extra
    var MOVE = {
        roof:    { dx:  0.05, dy: -0.34, r:  -6, s: 0.06 },
        front:   { dx: -0.28, dy: -0.14, r: -10, s: 0.04 },
        door1:   { dx: -0.10, dy:  0.30, r:   7, s: 0.04 },
        door2:   { dx:  0.07, dy:  0.38, r:  -5, s: 0.04 },
        rear:    { dx:  0.30, dy: -0.12, r:   9, s: 0.04 },
        wheel_f: { dx: -0.22, dy:  0.42, r: -110, s: 0.05 },
        wheel_r: { dx:  0.26, dy:  0.34, r:  140, s: 0.05 },
        base:    { dx:  0,    dy:  0.02, r:   0, s: 0 }
    };

    var parts = [].slice.call(stage.querySelectorAll('.car-part')).map(function (el) {
        return { el: el, m: MOVE[el.getAttribute('data-part')] || MOVE.base };
    });

    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var ticking = false;

    function clamp(v, a, b) { return Math.min(Math.max(v, a), b); }
    function smooth(a, b, v) { var t = clamp((v - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); }

    function update() {
        ticking = false;
        var vh = window.innerHeight;
        var docH = document.documentElement.scrollHeight;
        var heroBottom = hero.offsetTop + hero.offsetHeight;

        // t: 0 cuando la portada está a medio salir de pantalla -> 1 al final de la página
        var start = heroBottom - vh * 0.55;
        var end = Math.max(docH - vh, start + 1);
        var t = clamp((window.scrollY - start) / (end - start), 0, 1);

        // Aparece suavemente justo después de la portada
        bg.style.opacity = (smooth(0, 0.05, t) * 0.9).toFixed(3);

        // Progreso del desmontaje: empieza enseguida y termina antes del final
        var p = reduce ? 0 : smooth(0.02, 0.85, t);
        var w = stage.offsetWidth;
        var fade = 1 - smooth(0.6, 1, p) * 0.85;   // las piezas se apagan al alejarse

        parts.forEach(function (o) {
            var m = o.m;
            var isBase = o.el.getAttribute('data-part') === 'base';
            o.el.style.transform =
                'translate3d(' + (p * m.dx * w).toFixed(1) + 'px,' + (p * m.dy * w).toFixed(1) + 'px,0) ' +
                'rotate(' + (p * m.r).toFixed(2) + 'deg) scale(' + (1 + p * m.s).toFixed(3) + ')';
            // la base oscura se queda y rellena el hueco hasta casi el final
            o.el.style.opacity = isBase ? (1 - smooth(0.75, 1, p) * 0.8).toFixed(3) : fade.toFixed(3);
        });
    }

    function onScroll() {
        if (!ticking) {
            ticking = true;
            window.requestAnimationFrame(update);
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    window.addEventListener('load', update);
    update();
})();
