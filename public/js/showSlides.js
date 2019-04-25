window.onload = initSlides;

var slideIndex = 0;
var slides, dots;
var timeoutID;

function initSlides() {
    slides = document.getElementsByClassName("mySlides");
    dots = document.getElementsByClassName("dot");
    showSlides();
}

function showSlides() {
    // wrap around slides if greater than total
    slideIndex %= slides.length;

    // update slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex].style.display = "block";

    // update dots
    for (let i = 0; i < dots.length; i++){
        dots[i].className = dots[i].className.replace(" active", "");
    }
    dots[slideIndex].className += " active";

    // Change image every 4 seconds
    timeoutID =
        setTimeout(function () {
            slideIndex++;
            showSlides();
            }, 4000);
}

function currentSlide(index) {
    clearTimeout(timeoutID);
    // wrap around slides if index is negative
    slideIndex = index < 0 ? slides.length + index : index;
    showSlides();
}