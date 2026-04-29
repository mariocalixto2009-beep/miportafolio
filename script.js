// Animaciones on-scroll (reveal)
const elements = document.querySelectorAll('.scroll-fade');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      entry.target.style.transition = "all 0.6s ease-out";
    }
  });
});

elements.forEach(el => observer.observe(el));


// Lógica de copiado al portapapeles (MULTILENGUAJE)
document.querySelectorAll(".contact-card").forEach(card => {
  card.addEventListener("click", () => {
    const text = card.getAttribute("data-copy");
    
    // Si no hay texto para copiar, sale de la función.
    if (!text) return; 

    navigator.clipboard.writeText(text).then(() => {
      // Show popup
      const popup = document.getElementById("copy-popup");
      
      // Detectar idioma de la página para el mensaje
      const isEnglish = document.documentElement.lang === 'en';
      const msg = isEnglish ? "copied ✅" : "copiado ✅";

      if (popup) {
        popup.textContent = `"${text}" ${msg}`;
        popup.classList.add("show");
  
        // Hide after 2 seconds
        setTimeout(() => {
          popup.classList.remove("show");
        }, 2000);
      }
    }).catch(err => {
      console.error("Error al copiar: ", err);
    });
  });
});

/* CONTADOR ANIMADO PARA VISTAS */
const counterSection = document.getElementById("video-counter-section");
const counterNumber = document.getElementById("counter-number");

// Función para animar el número
function animateCounter(element, target, duration) {
  let start = 0;
  const increment = target / (duration / 16); // 60 FPS aprox
  
  function updateTimer() {
    start += increment;
    element.textContent = Math.floor(start);
    
    if (start < target) {
      requestAnimationFrame(updateTimer);
    } else {
      element.textContent = target; // Asegurar número final exacto
    }
  }
  
  updateTimer();
}

// Observador para activar la animación solo cuando es visible
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      // Iniciar animación (META ACTUALIZADA: 260)
    if(counterNumber) animateCounter(counterNumber, 260, 2000);
      
      // Dejar de observar
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 }); 

if (counterSection) {
  counterObserver.observe(counterSection);
}