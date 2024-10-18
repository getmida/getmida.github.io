'use strict'
//accordion-cycle
const accordionItems = document.querySelectorAll('.accordion-item')
const desktopAccordionImages = document.querySelectorAll(
  '.accordion-image-container .accordion-image'
)
const mobileAccordionImages = document.querySelectorAll(
  '.accordion-image-container-mobile .accordion-image'
)

let currentIndexs = 0
const intervalTime = 3000 // Time between each accordion auto-click (in milliseconds)

// Function to handle accordion item click
function handleAccordionItemClick(index) {
  accordionItems.forEach((item, i) => {
    const isActive = i === index
    item.classList.toggle('active', isActive)
    const accordionItemBody = item.querySelector('.accordion-item-body')
    accordionItemBody.style.maxHeight = isActive
      ? accordionItemBody.scrollHeight + 'px'
      : 0
  })

  // Show the associated image and hide others for desktop
  desktopAccordionImages.forEach((image, i) => {
    image.style.display = i === index ? 'block' : 'none'
  })

  // Show the associated image and hide others for mobile
  mobileAccordionImages.forEach((image, i) => {
    image.style.display = i === index ? 'block' : 'none'
  })
}

// Function to auto-cycle through accordion items
function autoCycleAccordion() {
  handleAccordionItemClick(currentIndexs)

  // Move to the next item, or loop back to the first item
  currentIndexs = (currentIndexs + 1) % accordionItems.length
}

// Set up automatic cycling of accordion items
setInterval(autoCycleAccordion, intervalTime)

// Activate the first accordion item and show its image by default
handleAccordionItemClick(0)

document.addEventListener('DOMContentLoaded', function () {
  var swiper = new Swiper('.mySwiper', {
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
    keyboard: {
      enabled: true,
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
    },
  })
})
