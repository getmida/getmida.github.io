'use strict'
//accordion-cycle (skipped on pages without accordion, e.g. index)
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

function handleAccordionItemClick(index) {
  if (!accordionItems.length) return
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

function autoCycleAccordion() {
  if (!accordionItems.length) return
  handleAccordionItemClick(currentIndex)
  currentIndex = (currentIndex + 1) % accordionItems.length
}

function startAutoCycle() {
  if (!accordionItems.length) return
  autoCycleInterval = setInterval(autoCycleAccordion, intervalTime)
}

function stopAutoCycle() {
  if (autoCycleInterval) clearInterval(autoCycleInterval)
}

if (accordionItems.length > 0) {
  accordionItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      stopAutoCycle()
      handleAccordionItemClick(index)
      currentIndex = index
    })
  })
  handleAccordionItemClick(0)
  startAutoCycle()
}


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

/* Modular solutions tabs — auto-advance + pane transitions (index) */
;(function () {
  const root = document.querySelector('.modular-solutions')
  if (!root) return
  const tabs = Array.from(root.querySelectorAll('.modular-solutions-tab'))
  const panes = root.querySelectorAll('.modular-solutions-pane')
  const tabRow = root.querySelector('.modular-solutions-tabs')
  if (!tabs.length) return

  const INTERVAL_MS = 2000
  const EXIT_MS = 380
  let current = Math.max(
    0,
    tabs.findIndex((t) => t.classList.contains('is-active'))
  )
  let timer = null
  let exitingPane = null
  let exitHandler = null
  let exitFallbackTimer = null

  function scrollTabIntoView(tab) {
    if (
      tabRow &&
      tabRow.scrollWidth > tabRow.clientWidth + 2
    ) {
      tab.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      })
    }
  }

  function abortPaneTransition() {
    if (exitFallbackTimer != null) {
      window.clearTimeout(exitFallbackTimer)
      exitFallbackTimer = null
    }
    if (exitingPane && exitHandler) {
      exitingPane.classList.remove('modular-pane--exit')
      exitingPane.setAttribute('hidden', '')
      exitingPane.classList.remove('is-active')
    }
    exitingPane = null
    exitHandler = null
  }

  function revealPane(newPane, tab) {
    newPane.removeAttribute('hidden')
    newPane.classList.add('is-active')
    newPane.classList.add('modular-pane--enter')
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        newPane.classList.remove('modular-pane--enter')
      })
    })
    current = tabs.indexOf(tab)
    scrollTabIntoView(tab)
  }

  function activateTab(tab) {
    const paneId = tab.getAttribute('aria-controls')
    const newPane = paneId ? document.getElementById(paneId) : null
    if (!newPane) return

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    const oldPane = root.querySelector('.modular-solutions-pane:not([hidden])')

    abortPaneTransition()

    tabs.forEach((t) => {
      const on = t === tab
      t.classList.toggle('is-active', on)
      t.setAttribute('aria-selected', on ? 'true' : 'false')
    })

    if (oldPane === newPane) {
      current = tabs.indexOf(tab)
      scrollTabIntoView(tab)
      return
    }

    if (reduceMotion) {
      panes.forEach((p) => {
        p.setAttribute('hidden', '')
        p.classList.remove('is-active', 'modular-pane--exit', 'modular-pane--enter')
      })
      newPane.removeAttribute('hidden')
      newPane.classList.add('is-active')
      current = tabs.indexOf(tab)
      scrollTabIntoView(tab)
      return
    }

    if (!oldPane) {
      panes.forEach((p) => {
        p.setAttribute('hidden', '')
        p.classList.remove('is-active', 'modular-pane--exit', 'modular-pane--enter')
      })
      revealPane(newPane, tab)
      return
    }

    exitingPane = oldPane
    exitHandler = function finishExit() {
      if (exitFallbackTimer != null) {
        window.clearTimeout(exitFallbackTimer)
        exitFallbackTimer = null
      }
      exitingPane = null
      exitHandler = null
      oldPane.setAttribute('hidden', '')
      oldPane.classList.remove('is-active', 'modular-pane--exit')
      revealPane(newPane, tab)
    }
    window.requestAnimationFrame(() => {
      oldPane.classList.add('modular-pane--exit')
    })
    exitFallbackTimer = window.setTimeout(() => {
      exitFallbackTimer = null
      if (exitingPane === oldPane && exitHandler) exitHandler()
    }, EXIT_MS)
  }

  function goNext() {
    const next = (current + 1) % tabs.length
    activateTab(tabs[next])
  }

  function startAuto() {
    stopAuto()
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    timer = window.setInterval(goNext, INTERVAL_MS)
  }

  function stopAuto() {
    if (timer != null) {
      window.clearInterval(timer)
      timer = null
    }
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      activateTab(tab)
      stopAuto()
      startAuto()
    })
  })

  const paneBody = root.querySelector('.modular-solutions-panes')
  if (paneBody) {
    paneBody.addEventListener('mouseenter', stopAuto)
    paneBody.addEventListener('mouseleave', startAuto)
    paneBody.addEventListener('focusin', stopAuto)
    paneBody.addEventListener('focusout', (e) => {
      if (!e.relatedTarget || !paneBody.contains(e.relatedTarget)) {
        startAuto()
      }
    })
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAuto()
    else startAuto()
  })

  startAuto()
})()

/* Smooth scroll: Explore Our Solutions → #our-solutions (index) */
;(function () {
  var btn = document.querySelector('a.book-demo-button[href="#our-solutions"]')
  var target = document.getElementById('our-solutions')
  if (!btn || !target) return
  btn.addEventListener('click', function (e) {
    e.preventDefault()
    var smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    target.scrollIntoView({
      behavior: smooth ? 'smooth' : 'auto',
      block: 'start',
    })
    try {
      history.replaceState(null, '', '#our-solutions')
    } catch (err) {}
  })
})()
