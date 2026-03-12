'use strict'
//accordion-cycle
const accordionItems = document.querySelectorAll('.accordion-item')
const desktopAccordionImages = document.querySelectorAll(
  '.accordion-image-container .accordion-image'
)
const mobileAccordionImages = document.querySelectorAll(
  '.accordion-image-container-mobile .accordion-image'
)

let currentIndex = 0
const intervalTime = 3000 // Time between each accordion auto-click (in milliseconds)
let autoCycleInterval

// Function to handle accordion item click
function handleAccordionItemClick(index) {
  accordionItems.forEach((item, i) => {
    const isActive = i === index
    item.classList.toggle('active', isActive)
    const accordionItemBody = item.querySelector('.accordion-item-body')
    accordionItemBody.style.maxHeight = isActive
      ? accordionItemBody.scrollHeight + 'px'
      : 0

    // Dynamically add or remove mouse event listeners
    if (isActive) {
      item.addEventListener('mouseenter', stopAutoCycle)
      item.addEventListener('mouseleave', startAutoCycle)
    } else {
      item.removeEventListener('mouseenter', stopAutoCycle)
      item.removeEventListener('mouseleave', startAutoCycle)
    }
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
  handleAccordionItemClick(currentIndex)

  // Move to the next item, or loop back to the first item
  currentIndex = (currentIndex + 1) % accordionItems.length
}

// Start auto-cycling
function startAutoCycle() {
  autoCycleInterval = setInterval(autoCycleAccordion, intervalTime)
}

// Stop auto-cycling
function stopAutoCycle() {
  clearInterval(autoCycleInterval)
}

// Add click event listeners to all accordion items
accordionItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    stopAutoCycle() // Optionally stop auto-cycle on click
    handleAccordionItemClick(index)
    currentIndex = index // Update the current index
  })
})

// Initialize the first accordion item and start auto-cycling
handleAccordionItemClick(0)
startAutoCycle()


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
