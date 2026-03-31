document.querySelectorAll('.logos').forEach((logos) => {
  if (logos.closest('.logo-slider--static')) return
  const slide = logos.querySelector('.logos-slide')
  if (slide) logos.appendChild(slide.cloneNode(true))
})

const yearDate = document.querySelector('#date-span')
yearDate.textContent = new Date().getFullYear()