document.addEventListener("DOMContentLoaded", function () {
   document.body.classList.add("loading");
   document.body.style.overflow = "hidden";

   const mainContent = document.querySelector("main");
   mainContent.style.opacity = "0";
   mainContent.style.transition = "opacity 0.5s ease";

   var progressNumber = document.querySelector(".progress-number");
   var percentage = 0;

   function updateProgress() {
      progressNumber.textContent = percentage;
      percentage++;
      if (percentage <= 100) {
         setTimeout(updateProgress, 12);
      }
   }

   updateProgress();

   var images = document.querySelectorAll("img");
   images.forEach(function (image) {
      image.style.opacity = "0";
      image.style.transition = "opacity 0.5s ease";
   });

   setTimeout(function () {
      var loadingBar = document.querySelector(".loading-bar");
      var loadingLeft = document.querySelector(".loading-left");
      var loadingRight = document.querySelector(".loading-right");
      var progressSymbol = document.querySelector(".progress-symbol");

      requestAnimationFrame(function () {
         loadingBar.style.opacity = "0";
         loadingLeft.style.width = "0";
         loadingRight.style.width = "0";
         progressSymbol.style.opacity = "0";

         document.body.classList.add("changing-background");
         document.body.style.backgroundColor = "#000000";

         setTimeout(function () {
            document.body.classList.remove("changing-background");
            document.body.style.backgroundColor = "#ffffff";

            setTimeout(() => {
               mainContent.style.opacity = "1";
               document.body.classList.remove("loading");
               document.body.style.overflow = "auto";

               // show image one by one
               images.forEach(function (image, index) {
                  setTimeout(() => {
                     image.style.opacity = "1";
                  }, index * 100);
               });
            }, 100);
         }, 500);
      });
   }, 2500);
});

const backToTopButton = document.getElementById('backToTopButton');

// visibility after scroll
window.addEventListener('scroll', () => {
   if (window.scrollY > 300) {
      backToTopButton.classList.add('show');
   } else {
      backToTopButton.classList.remove('show');
   }
});

//Scroll to top
function scrollToTop() {
   window.scrollTo({
      top: 0,
      behavior: 'smooth'
   });
}