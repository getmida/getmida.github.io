const accordionItemHeaders = document.querySelectorAll('.accordion-item-header')

accordionItemHeaders.forEach((accordionItemHeader) => {
  accordionItemHeader.addEventListener('mouseover', (event) => {
    const currentlyActiveAccordionItemHeader = document.querySelector(
      '.accordion-item-header.active'
    )

    // If there's an active accordion that isn't the one being hovered, deactivate it
    if (
      currentlyActiveAccordionItemHeader &&
      currentlyActiveAccordionItemHeader !== accordionItemHeader
    ) {
      currentlyActiveAccordionItemHeader.classList.remove('active')
      currentlyActiveAccordionItemHeader.nextElementSibling.style.maxHeight = 0
      currentlyActiveAccordionItemHeader.style.color = 'black' // Reset color of previously active item
    }

    // Toggle active class for the current accordion
    accordionItemHeader.classList.toggle('active')

    const accordionItemBody = accordionItemHeader.nextElementSibling
    if (accordionItemHeader.classList.contains('active')) {
      // If active, expand and set the color
      accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + 'px'
      accordionItemHeader.style.color = 'rgba(237, 15, 132, 1)' // Active color
    } else {
      // If not active, collapse and reset the color
      accordionItemBody.style.maxHeight = 0
      accordionItemHeader.style.color = 'black' // Default color when inactive
    }
  })
})


