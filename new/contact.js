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

  // Handle checkbox change events
  optionsContainer.addEventListener('change', function (e) {
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

// Initialize both dropdowns when the page loads
document.addEventListener('DOMContentLoaded', function () {
  initializeCustomSelect('howDidYouHearAboutUs')
  initializeCustomSelect('productInterestedIn')

  // Form submission event listener
  const form = document.querySelector('form')

  form.addEventListener('submit', function (event) {
    // Prevent default submission
    event.preventDefault()

    // Collect input values
    const companyName = document.getElementById('companyName').value
    const companyWebsite = document.getElementById('companyWebsite').value
    const companyLocation = document.getElementById('companyLocation').value
    const fullName = document.getElementById('fullName').value
    const emailAddress = document.getElementById('emailAddress').value
    const phoneNumber = document.getElementById('phoneNumber').value
    const companyRole = document.getElementById('companyRole').value
    const additionalInformation = document.getElementById(
      'additionalInformation'
    ).value

    // Validate required fields
    if (
      !companyName ||
      !companyWebsite ||
      !companyLocation ||
      !fullName ||
      !emailAddress ||
      !phoneNumber ||
      !companyRole ||
      selectedHearAboutUsOptions.length === 0 ||
      selectedProductOptions.length === 0
    ) {
      alert('Please fill out all required fields.')
      return
    }

    // Prepare form data to be submitted
    const formData = {
      companyName,
      companyWebsite,
      companyLocation,
      fullName,
      emailAddress,
      phoneNumber,
      companyRole,
      additionalInformation,
      howDidYouHearAboutUs: selectedHearAboutUsOptions,
      productInterestedIn: selectedProductOptions,
    }

    // Submit the form data via a fetch request
    fetch(form.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Form submitted successfully.')
        // Optional: Log the response data if needed
        // console.log('Response:', data);
      })
      .catch((error) => {
        alert('An error occurred while submitting the form.')
        // Optional: Log the error for debugging
        // console.error('Error:', error);
      })

    // Reset the form fields
    form.reset()
    selectedHearAboutUsOptions = []
    selectedProductOptions = []
    document.querySelector('#howDidYouHearAboutUs .select-box').textContent =
      'Select'
    document.querySelector('#productInterestedIn .select-box').textContent =
      'Select'
  })
})
