// function validateCheckboxes() {
//   const checkboxes = document.querySelectorAll('input[name="howDidYouHear[]"]')
//   const errorMessage = document.getElementById('error-message')
//   let isChecked = false

//   // Check if at least one checkbox is checked
//   checkboxes.forEach((checkbox) => {
//     if (checkbox.checked) {
//       isChecked = true
//     }
//   })

//   // Show error message and prevent submission if none are checked
//   if (!isChecked) {
//     errorMessage.style.display = 'block'
//     return false // Prevent form submission
//   } else {
//     errorMessage.style.display = 'none'
//     return true // Allow form submission
//   }
// }

// let selectedOptions = []
// let uploadedFileName = '' // Store uploaded file name

// // Initialize custom select dropdown
// function initializeCustomSelect(selectContainerId) {
//   const selectContainer = document.getElementById(selectContainerId)
//   const selectBox = selectContainer.querySelector('.select-box')
//   const optionsContainer = selectContainer.querySelector('.options-container')
//   const checkboxes = optionsContainer.querySelectorAll('input[type="checkbox"]')

//   // Toggle dropdown visibility
//   selectBox.addEventListener('click', function () {
//     selectContainer.classList.toggle('open')
//   })

//   // Listen to checkbox changes
//   checkboxes.forEach((checkbox) => {
//     checkbox.addEventListener('change', function (e) {
//       const value = e.target.value
//       if (e.target.checked) {
//         if (!selectedOptions.includes(value)) {
//           selectedOptions.push(value)
//         }
//       } else {
//         selectedOptions = selectedOptions.filter((item) => item !== value)
//       }
//       updateSelectBox(selectBox, selectedOptions)
//       document.getElementById('heardAboutUsField').value =
//         selectedOptions.join(',')
//     })
//   })

//   // Update the displayed text in the select box
//   function updateSelectBox(selectBox, selectedOptions) {
//     selectBox.innerHTML = ''
//     if (selectedOptions.length > 0) {
//       selectedOptions.forEach((option) => {
//         const item = document.createElement('div')
//         item.classList.add('selected-item')
//         item.innerHTML = `${option} <span class="remove">x</span>`
//         item.querySelector('.remove').addEventListener('click', function () {
//           removeOption(option)
//         })
//         selectBox.appendChild(item)
//       })
//     } else {
//       selectBox.textContent = 'Select'
//     }
//   }

//   // Remove option
//   function removeOption(value) {
//     const checkbox = optionsContainer.querySelector(`input[value="${value}"]`)
//     if (checkbox) checkbox.checked = false
//     selectedOptions = selectedOptions.filter((item) => item !== value)
//     updateSelectBox(selectBox, selectedOptions)
//     document.getElementById('heardAboutUsField').value =
//       selectedOptions.join(',')
//   }

//   // Close dropdown when clicking outside
//   document.addEventListener('click', function (e) {
//     if (!selectContainer.contains(e.target)) {
//       selectContainer.classList.remove('open')
//     }
//   })
// }

// // Initialize on DOM content load
// document.addEventListener('DOMContentLoaded', function () {
//   initializeCustomSelect('howDidYouHearAboutUs')

//   const dropArea = document.getElementById('drop-area')
//   const inputFile = document.getElementById('input-file')
//   const imageView = document.getElementById('img-view')
//   const loader = document.getElementById('loader')

//   dropArea.addEventListener('dragenter', (e) => {
//     e.preventDefault()
//     e.stopPropagation()
//     dropArea.classList.add('highlight')
//   })

//   dropArea.addEventListener('dragover', (e) => {
//     e.preventDefault()
//     e.stopPropagation()
//   })

//   dropArea.addEventListener('dragleave', (e) => {
//     e.preventDefault()
//     e.stopPropagation()
//     dropArea.classList.remove('highlight')
//   })

//   dropArea.addEventListener('drop', (e) => {
//     e.preventDefault()
//     e.stopPropagation()
//     dropArea.classList.remove('highlight')
//     const files = e.dataTransfer.files
//     if (files.length > 0) {
//       inputFile.files = files
//       inputFile.dispatchEvent(new Event('change'))
//     }
//   })

//   inputFile.addEventListener('change', handleFileUpload)

//   function handleFileUpload() {
//     const file = inputFile.files[0]
//     if (!file) return

//     showLoader(true)

//     if (file.type !== 'application/pdf') {
//       showLoader(false)
//       updateImgViewContent('Error: Please upload a valid PDF file.')
//       inputFile.value = '' // Reset file input
//       return
//     }

//     if (file.size > 1048576) {
//       showLoader(false)
//       updateImgViewContent(
//         'Error: File size exceeds 1MB. Please upload a smaller file.'
//       )
//       inputFile.value = '' // Reset file input
//       return
//     }

//     showLoader(false)
//     updateImgViewContent(`PDF uploaded: ${file.name}`)
//   }

//   function showLoader(visible) {
//     loader.classList.toggle('hidden', !visible)
//   }

//   function updateImgViewContent(message) {
//     imageView.innerHTML = `<p>${message}</p>`
//   }

// })

// add value of checked checkboxes to input field
const checkboxestwo = document.querySelectorAll(
    "#hearAbout input"
);
const inputtwo = document.querySelector("input[name=hearAboutUs]");
checkboxestwo.forEach((checkboxtwo) => {
    checkboxtwo.addEventListener("change", function () {
        let values = [];
        checkboxestwo.forEach((checkboxtwo) => {
            if (checkboxtwo.checked) {
                values.push(checkboxtwo.value);
            }
        });
        inputtwo.value = values.join(", ");
    });
});
