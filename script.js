document.addEventListener('DOMContentLoaded', () => {
    // 1. Año dinámico en el Footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Menú Responsivo para Celulares
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-xmark');
            } else {
                icon.classList.replace('fa-xmark', 'fa-bars');
            }
        });

        // Cerrar menú al hacer clic en un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.classList.replace('fa-xmark', 'fa-bars');
            });
        });
    }

    // 3. Resaltar enlace activo según el scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-list a[href*=${sectionId}]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    });

    // 4. Filtro de Categorías en la Galería
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Actualizar botón activo
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                if (filterValue === 'all' || filterValue === itemCategory) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // 5. Lightbox (Vista ampliada de fotos de galería)
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const title = item.querySelector('h4').textContent;
            const desc = item.querySelector('p').textContent;

            lightboxImg.src = img.src;
            lightboxCaption.textContent = `${title} — ${desc}`;
            lightbox.classList.add('active');
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });
    }

    // 6. Formulario de Cotización conectado directo a WhatsApp (+52 55 4814 3679)
    const quoteForm = document.getElementById('quote-form');
    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('client-name').value.trim();
            const phone = document.getElementById('client-phone').value.trim();
            const date = document.getElementById('event-date').value;
            const kids = document.getElementById('kids-count').value;
            const location = document.getElementById('event-location').value.trim();
            const notes = document.getElementById('event-notes').value.trim();

            // Recopilar servicios seleccionados
            const selectedServices = [];
            document.querySelectorAll('input[name="services"]:checked').forEach(checkbox => {
                selectedServices.push(checkbox.value);
            });

            const servicesText = selectedServices.length > 0
                ? selectedServices.join(', ')
                : 'Información general de paquetes';

            // Construir mensaje estructurado para WhatsApp
            const whatsappNumber = '525548143679';
            const message = `¡Hola *Pacalaka Ludoteca Mágica*! 🎉 Me gustaría solicitar una cotización para mi evento:\n\n` +
                `👤 *Nombre:* ${name}\n` +
                `📱 *Teléfono:* ${phone}\n` +
                `📅 *Fecha del evento:* ${date}\n` +
                `👶 *Cantidad aprox. de niños:* ${kids}\n` +
                `📍 *Ubicación (CDMX / Área Met.):* ${location}\n` +
                `🎨 *Servicios de interés:* ${servicesText}\n` +
                (notes ? `📝 *Detalles adicionales:* ${notes}\n` : '') +
                `\n¡Quedo atento a su respuesta!`;

            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

            window.open(whatsappUrl, '_blank', 'noopener');
        });
    }
});