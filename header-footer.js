/*=============== SHOW MENU ===============*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

  toggle.addEventListener('click', () => {
    // Add show-menu class to nav menu
    nav.classList.toggle('show-menu')
    // Add show-icon to show and hide menu icon
    toggle.classList.toggle('show-icon')
  })
}

showMenu('nav-toggle', 'nav-menu')

/*=============== SHOW DROPDOWN MENU ===============*/
const dropdownItems = document.querySelectorAll('.dropdown__item')

// 1. Select each dropdown item
dropdownItems.forEach((item) => {
  const dropdownButton = item.querySelector('.dropdown__button')

  // 2. Select each button click
  dropdownButton.addEventListener('click', () => {
    // 7. Select the current show-dropdown class
    const showDropdown = document.querySelector('.show-dropdown')

    // 5. Call the toggleItem function
    toggleItem(item)

    // 8. Remove the show-dropdown class from other items
    if (showDropdown && showDropdown !== item) {
      toggleItem(showDropdown)
    }
  })
})

// 3. Create a function to display the dropdown
const toggleItem = (item) => {
  // 3.1. Select each dropdown content
  const dropdownContainer = item.querySelector('.dropdown__container')

  // 6. If the same item contains the show-dropdown class, remove
  if (item.classList.contains('show-dropdown')) {
    dropdownContainer.removeAttribute('style')
    item.classList.remove('show-dropdown')
  } else {
    // 4. Add the maximum height to the dropdown content and add the show-dropdown class
    dropdownContainer.style.height = dropdownContainer.scrollHeight + 'px'
    item.classList.add('show-dropdown')
  }
}

/*=============== DELETE DROPDOWN STYLES ===============*/
const mediaQuery = matchMedia('(min-width: 931px)'),
  dropdownContainer = document.querySelectorAll('.dropdown__container')

// Function to remove dropdown styles in mobile mode when browser resizes
const removeStyle = () => {
  // Validate if the media query reaches 1118px
  if (mediaQuery.matches) {
    // Remove the dropdown container height style
    dropdownContainer.forEach((e) => {
      e.removeAttribute('style')
    })

    // Remove the show-dropdown class from each dropdown item
    dropdownItems.forEach((e) => {
      e.classList.remove('show-dropdown')
    })
  }
}

addEventListener('resize', removeStyle)

/*=============== DESKTOP MEGA MENU: stay open while moving to submenu ===============*/
;(function () {
  const DESKTOP = matchMedia('(min-width: 931px)')
  const CLOSE_DELAY_MS = 380
  const headerContainer = document.querySelector('.header-container')

  function clearOpenState() {
    document.querySelectorAll('.dropdown__item.dropdown--open').forEach((el) => {
      el.classList.remove('dropdown--open')
    })
    if (headerContainer && DESKTOP.matches) {
      headerContainer.style.backgroundColor = ''
      headerContainer.style.width = ''
    }
  }

  function setupDesktopMegaHover() {
    if (!DESKTOP.matches) {
      clearOpenState()
      return
    }

    dropdownItems.forEach((item) => {
      if (item.dataset.megaNavHoverBound === '1') return
      item.dataset.megaNavHoverBound = '1'

      const container = item.querySelector('.dropdown__container')
      if (!container) return

      let closeTimer

      const armOpen = () => {
        clearTimeout(closeTimer)
        item.classList.add('dropdown--open')
        if (headerContainer) {
          headerContainer.style.backgroundColor = 'white'
          headerContainer.style.width = '100%'
        }
      }

      const scheduleClose = () => {
        clearTimeout(closeTimer)
        closeTimer = setTimeout(() => {
          item.classList.remove('dropdown--open')
          const anyOpen = document.querySelector('.dropdown__item.dropdown--open')
          if (headerContainer && !anyOpen) {
            headerContainer.style.backgroundColor = ''
            headerContainer.style.width = ''
          }
        }, CLOSE_DELAY_MS)
      }

      item.addEventListener('mouseenter', armOpen)
      item.addEventListener('mouseleave', scheduleClose)
      container.addEventListener('mouseenter', armOpen)
      container.addEventListener('mouseleave', scheduleClose)
    })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupDesktopMegaHover)
  } else {
    setupDesktopMegaHover()
  }

  DESKTOP.addEventListener('change', () => {
    clearOpenState()
    setupDesktopMegaHover()
  })
})()
