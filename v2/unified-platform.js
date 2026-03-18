;(function () {
  var diagram = document.getElementById('unified-platform-diagram')
  if (!diagram) return

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    diagram.classList.add('unified-platform--reduce-motion')
  }

  // Touch: brief label flash before navigation (optional feedback)
  var hotspots = diagram.querySelectorAll('.unified-hotspot')
  var touchStart = 0
  hotspots.forEach(function (el) {
    el.addEventListener('touchstart', function () {
      touchStart = Date.now()
    })
    el.addEventListener('touchend', function (e) {
      if (Date.now() - touchStart > 500) return
      var label = el.querySelector('.unified-hotspot-label')
      if (label) {
        label.style.opacity = '1'
        label.style.visibility = 'visible'
        setTimeout(function () {
          label.style.opacity = ''
          label.style.visibility = ''
        }, 900)
      }
    })
  })
})()
