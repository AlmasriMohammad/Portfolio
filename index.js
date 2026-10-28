/* -----------------------------------------
  Image Lightbox Modal with In-Window Navigation
---------------------------------------- */

let currentModalIndex = 0;
let modalImages = [];

function openModal(element) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    
    // Gather all slide images on the page
    const slideElements = document.querySelectorAll(".slide img");
    modalImages = Array.from(slideElements).map(img => img.src);
    
    // Find the index of the clicked image
    currentModalIndex = modalImages.indexOf(element.src);
    if (currentModalIndex === -1) currentModalIndex = 0;

    if (modal && modalImg) {
        modal.style.display = "block";
        modalImg.src = modalImages[currentModalIndex];
    }
}

function closeModal() {
    const modal = document.getElementById("imageModal");
    if (modal) {
        modal.style.display = "none";
    }
}

function changeModalSlide(n) {
    if (modalImages.length === 0) return;
    
    currentModalIndex += n;
    
    // Loop around if reaching the end or beginning
    if (currentModalIndex >= modalImages.length) {
        currentModalIndex = 0;
    } else if (currentModalIndex < 0) {
        currentModalIndex = modalImages.length - 1;
    }
    
    const modalImg = document.getElementById("modalImg");
    if (modalImg) {
        modalImg.src = modalImages[currentModalIndex];
    }
}

// Keyboard controls for modal (Escape to close, Left/Right arrows to navigate)
document.addEventListener('keydown', function(event) {
    const modal = document.getElementById("imageModal");
    if (!modal || modal.style.display !== "block") return;

    if (event.key === "Escape") {
        closeModal();
    } else if (event.key === "ArrowLeft") {
        changeModalSlide(-1);
    } else if (event.key === "ArrowRight") {
        changeModalSlide(1);
    }
});

// Close modal if clicking on the dark background area outside the image
window.addEventListener('click', function(event) {
    const modal = document.getElementById("imageModal");
    if (event.target === modal) {
        closeModal();
    }
});

/* -----------------------------------------
  Image Slider Functionality
---------------------------------------- */

let slideIndex = 0;
let autoPlayTimer = null;

document.addEventListener("DOMContentLoaded", () => {
  showSlides();
});

function showSlides() {
  let slides = document.querySelectorAll(".slide");
  let dots = document.querySelectorAll(".dot");
  
  if (slides.length === 0) return;

  slides.forEach(slide => slide.style.display = "none");
  slideIndex++;
  
  if (slideIndex > slides.length) { slideIndex = 1; }
  
  dots.forEach(dot => dot.classList.remove("active"));
  
  slides[slideIndex - 1].style.display = "block";
  if (dots[slideIndex - 1]) {
    dots[slideIndex - 1].classList.add("active");
  }
  
  // Switch image every 4 seconds
  clearTimeout(autoPlayTimer);
  autoPlayTimer = setTimeout(showSlides, 4000);
}

function currentSlide(n) {
  clearTimeout(autoPlayTimer);
  slideIndex = n - 1;
  
  let slides = document.querySelectorAll(".slide");
  let dots = document.querySelectorAll(".dot");
  
  if (slides.length === 0) return;

  slides.forEach(slide => slide.style.display = "none");
  dots.forEach(dot => dot.classList.remove("active"));
  
  if (slideIndex >= slides.length) slideIndex = 0;
  if (slideIndex < 0) slideIndex = slides.length - 1;

  slides[slideIndex].style.display = "block";
  if (dots[slideIndex]) {
    dots[slideIndex].classList.add("active");
  }
  
  autoPlayTimer = setTimeout(showSlides, 4000);
}