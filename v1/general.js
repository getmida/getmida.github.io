const copy = document.querySelector('.logos-slide').cloneNode(true)
document.querySelector('.logos').appendChild(copy)

const yearDate = document.querySelector('#date-span')
yearDate.textContent = new Date().getFullYear()