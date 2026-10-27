/*  
  ====================================================================
  CONTROL DE ACCESO, CARRUSEL DE DOCENTES Y FORMULARIOS - CBTis 166
  ====================================================================  
*/

document.addEventListener('DOMContentLoaded', () => {

    // 0. Lógica del Menú de Hamburguesa Responsive
    const hamburgerToggle = document.getElementById('hamburger-toggle');
    const navLinksMenu = document.getElementById('nav-links-menu');

    if (hamburgerToggle && navLinksMenu) {
        hamburgerToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinksMenu.classList.toggle('active');
            hamburgerToggle.textContent = navLinksMenu.classList.contains('active') ? '✕' : '☰';
        });

        // Ocultar menú al hacer clic en cualquier enlace (en móviles)
        navLinksMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinksMenu.classList.remove('active');
                hamburgerToggle.textContent = '☰';
            });
        });

        // Ocultar el menú si se hace clic fuera de él
        document.addEventListener('click', (e) => {
            if (!navLinksMenu.contains(e.target) && !hamburgerToggle.contains(e.target)) {
                navLinksMenu.classList.remove('active');
                hamburgerToggle.textContent = '☰';
            }
        });
    }

    // 1. Lógica del Formulario de Login (Alumnos)
    const formularioLogin = document.getElementById('form-login');

    if (formularioLogin) {
        formularioLogin.addEventListener('submit', (e) => {
            e.preventDefault();
            const usuario = document.getElementById('usuario').value;
            alert(`¡Acceso concedido!\nBienvenido al sistema escolar, usuario: ${usuario}`);
            formularioLogin.reset();
        });
    }

    // 2. Lógica de los Botones y Arrastre del Carrusel de Docentes
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const teachersTrack = document.getElementById('teachers-track');

    if (btnPrev && btnNext && teachersTrack) {
        
        const getScrollAmount = () => {
            const card = teachersTrack.querySelector('.teacher-card');
            if (!card) return 320;
            return card.offsetWidth + 24;
        };

        btnNext.addEventListener('click', () => {
            teachersTrack.scrollBy({
                left: getScrollAmount(),
                behavior: 'smooth'
            });
        });

        btnPrev.addEventListener('click', () => {
            teachersTrack.scrollBy({
                left: -getScrollAmount(),
                behavior: 'smooth'
            });
        });

        let isDown = false;
        let startX;
        let scrollLeft;

        teachersTrack.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - teachersTrack.offsetLeft;
            scrollLeft = teachersTrack.scrollLeft;
            teachersTrack.style.scrollBehavior = 'auto';
        });

        window.addEventListener('mouseup', () => {
            if (!isDown) return;
            isDown = false;
            teachersTrack.style.scrollBehavior = 'smooth';
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - teachersTrack.offsetLeft;
            const walk = (x - startX) * 1.5;
            teachersTrack.scrollLeft = scrollLeft - walk;
        });
    }

    // 3. Lógica para el Formulario de Solicitud de Informes (Index Hero)
    const formularioHero = document.getElementById('form-hero-informes');

    if (formularioHero) {
        formularioHero.addEventListener('submit', (e) => {
            e.preventDefault();
            const nombreUsuario = document.getElementById('info_nombre').value;
            alert(`¡Gracias por tu interés, ${nombreUsuario}!\nTus datos han sido enviados con éxito. Nos pondremos en contacto contigo pronto desde el CBTis 166.`);
            formularioHero.reset();
        });
    }

    // Lógica para el Carrusel de la Sesión 3 (Temas)
    const btnPrevS3 = document.getElementById('btn-prev-sesion3');
    const btnNextS3 = document.getElementById('btn-next-sesion3');
    const sesion3Track = document.getElementById('sesion3-track');

    if (btnPrevS3 && btnNextS3 && sesion3Track) {
        const getScrollAmountS3 = () => {
            const card = sesion3Track.querySelector('.teacher-card');
            if (!card) return 320;
            return card.offsetWidth + 24;
        };

        btnNextS3.addEventListener('click', () => {
            sesion3Track.scrollBy({ left: getScrollAmountS3(), behavior: 'smooth' });
        });

        btnPrevS3.addEventListener('click', () => {
            sesion3Track.scrollBy({ left: -getScrollAmountS3(), behavior: 'smooth' });
        });

        let isDownS3 = false;
        let startXS3;
        let scrollLeftS3;

        sesion3Track.addEventListener('mousedown', (e) => {
            isDownS3 = true;
            startXS3 = e.pageX - sesion3Track.offsetLeft;
            scrollLeftS3 = sesion3Track.scrollLeft;
            sesion3Track.style.scrollBehavior = 'auto';
        });

        window.addEventListener('mouseup', () => {
            if (!isDownS3) return;
            isDownS3 = false;
            sesion3Track.style.scrollBehavior = 'smooth';
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDownS3) return;
            e.preventDefault();
            const x = e.pageX - sesion3Track.offsetLeft;
            const walk = (x - startXS3) * 1.5;
            sesion3Track.scrollLeft = scrollLeftS3 - walk;
        });
    }

    // Lógica de evaluación del cuestionario
    const quizForm = document.getElementById('quiz-form');
    if (quizForm) {
        quizForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let totalScore = 0;
            const formData = new FormData(this);

            for (let pair of formData.entries()) {
                totalScore += parseFloat(pair[1]);
            }

            totalScore = Math.min(100, Math.round(totalScore));

            const resultsDiv = document.getElementById('quiz-results');
            const scoreText = document.getElementById('score-text');
            const feedbackText = document.getElementById('feedback-text');

            scoreText.textContent = `Tu Calificación: ${totalScore} / 100 Puntos`;
            
            if (totalScore >= 80) {
                feedbackText.textContent = "¡Excelente trabajo! Has demostrado un gran dominio de los conceptos de la Sesión 3.";
                resultsDiv.style.backgroundColor = "#ecfdf5";
                resultsDiv.style.borderColor = "#a7f3d0";
                resultsDiv.style.color = "#065f46";
            } else if (totalScore >= 60) {
                feedbackText.textContent = "Buen intento. Te recomendamos repasar algunos temas antes de volver a intentarlo.";
                resultsDiv.style.backgroundColor = "#fffbe0";
                resultsDiv.style.borderColor = "#fef08a";
                resultsDiv.style.color = "#854d0e";
            } else {
                feedbackText.textContent = "Revisa las secciones de la sesión e intenta nuevamente para mejorar tu puntaje.";
                resultsDiv.style.backgroundColor = "#fef2f2";
                resultsDiv.style.borderColor = "#fecaca";
                resultsDiv.style.color = "#991b1b";
            }

            resultsDiv.style.display = 'block';
            resultsDiv.scrollIntoView({ behavior: 'smooth' });
        });
    }

});

// Funciones globales (fuera de DOMContentLoaded para que se puedan llamar desde el HTML onclick)
function scrollToDetail(themeId) {
    const targetElement = document.getElementById(themeId);
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
    }
}

function openModal(src) {
    const modal = document.getElementById('imageModal');
    const expandedImg = document.getElementById('imgExpanded');
    if (modal && expandedImg) {
        expandedImg.src = src;
        modal.classList.add('active');
    }
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        closeModal();
    }
});
