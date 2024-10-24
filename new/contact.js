// Maintain selected options globally
let selectedHearAboutUsOptions = []
let selectedProductOptions = []

// Function to initialize custom select dropdown
function initializeCustomSelect(selectContainerId) {
  const selectContainer = document.getElementById(selectContainerId)
  const selectBox = selectContainer.querySelector('.select-box')
  const optionsContainer = selectContainer.querySelector('.options-container')

  // Toggle dropdown visibility
  selectBox.addEventListener('click', function () {
    selectContainer.classList.toggle('open')
  })

  // Handle checkbox change events for each checkbox
  optionsContainer
    .querySelectorAll('input[type="checkbox"]')
    .forEach((checkbox) => {
      checkbox.addEventListener('change', function (e) {
        const value = e.target.value

        if (e.target.checked) {
          // Prevent duplicates
          if (
            selectContainerId === 'howDidYouHearAboutUs' &&
            !selectedHearAboutUsOptions.includes(value)
          ) {
            selectedHearAboutUsOptions.push(value)
          } else if (
            selectContainerId === 'productInterestedIn' &&
            !selectedProductOptions.includes(value)
          ) {
            selectedProductOptions.push(value)
          }
        } else {
          // Remove unchecked value from selected options
          if (selectContainerId === 'howDidYouHearAboutUs') {
            selectedHearAboutUsOptions = selectedHearAboutUsOptions.filter(
              (item) => item !== value
            )
          } else if (selectContainerId === 'productInterestedIn') {
            selectedProductOptions = selectedProductOptions.filter(
              (item) => item !== value
            )
          }
        }

        // Update the select box for the specific dropdown
        updateSelectBox(
          selectBox,
          selectContainerId === 'howDidYouHearAboutUs'
            ? selectedHearAboutUsOptions
            : selectedProductOptions
        )
      })
    })

  // Update the displayed text in the select box
  function updateSelectBox(selectBox, selectedOptions) {
    selectBox.innerHTML = ''

    if (selectedOptions.length > 0) {
      selectedOptions.forEach((option) => {
        const item = document.createElement('div')
        item.classList.add('selected-item')
        item.innerHTML = `${option} <span class="remove">x</span>`

        // Add a click event to the "X" to remove the selected option
        item.querySelector('.remove').addEventListener('click', function () {
          removeOption(option, selectContainerId)
        })

        selectBox.appendChild(item)
      })
    } else {
      selectBox.textContent = 'Select'
    }
  }

  // Remove the option when "X" is clicked
  function removeOption(value, selectContainerId) {
    const checkbox = optionsContainer.querySelector(`input[value="${value}"]`)
    if (checkbox) checkbox.checked = false

    if (selectContainerId === 'howDidYouHearAboutUs') {
      selectedHearAboutUsOptions = selectedHearAboutUsOptions.filter(
        (item) => item !== value
      )
    } else if (selectContainerId === 'productInterestedIn') {
      selectedProductOptions = selectedProductOptions.filter(
        (item) => item !== value
      )
    }

    updateSelectBox(
      selectBox,
      selectContainerId === 'howDidYouHearAboutUs'
        ? selectedHearAboutUsOptions
        : selectedProductOptions
    )
  }

  // Close dropdown if clicking outside
  document.addEventListener('click', function (e) {
    if (!selectContainer.contains(e.target)) {
      selectContainer.classList.remove('open')
    }
  })
}
