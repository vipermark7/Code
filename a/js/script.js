const Events = (() => {
    // sticky navbar
    const navbar = document.querySelector(".navbar");

    // Add class to navbar
    window.addEventListener("scroll", () => {
        // Get the height
        let height = document.documentElement.scrollTop || window.pageYOffset;
        // console.log(height);
        (height > 76) ? navbar.classList.add("navbar-change") : navbar.classList.remove("navbar-change");
    });


    // Typing effect for PRELOADER
    var typed = new Typed(".typing", {
        strings: ["'Alexa... enable Growable Gardener.'"],
        loop: false,
        typeSpeed: 50
    });

    // $(document).ready(function() {
    //     $(".preloader").delay(5000).fadeOut();
    // });

    // adding popup functionality for "perform" buttons 
    f

    setTimeout(() => {
        document.querySelector(".preloader").classList.add("hide");
    }, 5000); 
})();