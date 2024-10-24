let selectedOptions = []
let uploadedFileName = '' // Store uploaded file name

// Initialize custom select dropdown
function initializeCustomSelect(selectContainerId) {
  const selectContainer = document.getElementById(selectContainerId)
  const selectBox = selectContainer.querySelector('.select-box')
  const optionsContainer = selectContainer.querySelector('.options-container')

  selectBox.addEventListener('click', function () {
    selectContainer.classList.toggle('open')
  })

  optionsContainer.addEventListener('change', function (e) {
    const value = e.target.value
    if (e.target.checked) {
      selectedOptions.push(value)
    } else {
      selectedOptions = selectedOptions.filter((item) => item !== value)
    }
    updateSelectBox(selectBox, selectedOptions)
    document.getElementById('heardAboutUsField').value =
      selectedOptions.join(',') // Update hidden field
  })

  // Update the displayed text in the select box
  function updateSelectBox(selectBox, selectedOptions) {
    selectBox.innerHTML = ''

    if (selectedOptions.length > 0) {
      selectedOptions.forEach((option) => {
        const item = document.createElement('div')
        item.classList.add('selected-item')
        item.innerHTML = `${option} <span class="remove">x</span>`

        item.querySelector('.remove').addEventListener('click', function () {
          removeOption(option)
        })

        selectBox.appendChild(item)
      })
    } else {
      selectBox.textContent = 'Select'
    }
  }

  function removeOption(value) {
    const checkbox = optionsContainer.querySelector(`input[value="${value}"]`)
    if (checkbox) checkbox.checked = false
    selectedOptions = selectedOptions.filter((item) => item !== value)
    updateSelectBox(selectBox, selectedOptions)
    document.getElementById('heardAboutUsField').value =
      selectedOptions.join(',')
  }

  document.addEventListener('click', function (e) {
    if (!selectContainer.contains(e.target)) {
      selectContainer.classList.remove('open')
    }
  })
}

// Form and File Upload Initialization
document.addEventListener('DOMContentLoaded', function () {
  initializeCustomSelect('howDidYouHearAboutUs')

  const dropArea = document.getElementById('drop-area')
  const inputFile = document.getElementById('input-file')
  const imageView = document.getElementById('img-view')
  const loader = document.getElementById('loader')

  inputFile.addEventListener('change', handleFileUpload)

  function handleFileUpload() {
    const file = inputFile.files[0]

    showLoader(true)

    if (file && file.type !== 'application/pdf') {
      showLoader(false)
      updateImgViewContent('Error: Please upload a valid PDF file.')
      return
    }

    if (file && file.size > 1048576) {
      showLoader(false)
      updateImgViewContent(
        'Error: File size exceeds 1MB. Please upload a smaller file.'
      )
      return
    }

    showLoader(false)
    uploadedFileName = file.name
    updateImgViewContent(`PDF uploaded: ${uploadedFileName}`)
  }

  dropArea.addEventListener('dragover', function (e) {
    e.preventDefault()
  })

  dropArea.addEventListener('drop', function (e) {
    e.preventDefault()
    inputFile.files = e.dataTransfer.files
    handleFileUpload()
  })

  function showLoader(visible) {
    loader.classList.toggle('hidden', !visible)
  }

  function updateImgViewContent(message) {
    imageView.innerHTML = `<p>${message}</p>`
  }

  // Form Submission using fetch
  const form = document.querySelector('form')
  form.addEventListener('submit', function (event) {
    event.preventDefault() // Prevent default form submission

    // Collect form data
    const formData = new FormData(form)

    // Submit form data using fetch()
    fetch(form.action, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          return response.json() // Assuming JSON response; adjust if necessary
        } else {
          throw new Error('Form submission failed')
        }
      })
      .then((data) => {
        // Handle success, e.g., display a success message
        alert('Form submitted successfully!')
        form.reset() // Optionally reset the form
        updateImgViewContent('Choose a file or drag & drop it here') // Reset file input display
        selectedOptions = []
        updateSelectBox(document.querySelector('.select-box'), selectedOptions) // Reset custom select
      })
      .catch((error) => {
        // Handle error, e.g., display an error message
        alert('Error: ' + error.message)
      })
  })
})
