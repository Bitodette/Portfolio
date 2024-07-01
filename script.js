document.addEventListener("DOMContentLoaded", function () {
   document.body.classList.add("loading");
   document.body.style.overflow = "hidden";

   const mainContent = document.querySelector("main");
   mainContent.style.opacity = "0";
   mainContent.style.transition = "opacity 0.5s ease";

   var progressNumber = document.querySelector(".progress-number");
   var percentage = 0;

   const circle = document.getElementById('circle');
   circle.classList.add('hidden-circle');

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

               checkScreenSize(); // Ensure the circle is hidden on small screens
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

// Scroll to top
function scrollToTop() {
   window.scrollTo({
      top: 0,
      behavior: 'smooth'
   });
}

// Circle Animation
let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;

function updateCirclePosition() {
   const circle = document.getElementById('circle');
   if (circle) {
      const scrollTop = window.scrollY;
      const scrollLeft = window.scrollX;
      currentX = lerp(currentX, targetX, 0.2); // Adjusted to 0.1 for smoother transition
      currentY = lerp(currentY, targetY, 0.2); // Adjusted to 0.1 for smoother transition
      circle.style.left = `${currentX - circle.clientWidth / 2 + scrollLeft}px`;
      circle.style.top = `${currentY - circle.clientHeight / 2 + scrollTop}px`;
   }
}

function lerp(start, end, amt) {
   return (1 - amt) * start + amt * end;
}

document.addEventListener('mousemove', function (e) {
   targetX = e.clientX;
   targetY = e.clientY;
});

document.addEventListener('scroll', function () {
   updateCirclePosition();
});

function animate() {
   updateCirclePosition();
   requestAnimationFrame(animate);
}

animate();

// Hide circle on screens with max width of 480px
function checkScreenSize() {
   const circle = document.getElementById('circle');
   if (window.innerWidth <= 480) {
      circle.classList.add('hidden-circle');
   } else {
      circle.classList.remove('hidden-circle');
   }
}

// Initial check
checkScreenSize();

// Listen for window resize events
window.addEventListener('resize', checkScreenSize);
