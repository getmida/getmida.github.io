'use strict'

function syncCheckboxGroup(containerSelector, hiddenInput) {
  var box = document.querySelector(containerSelector)
  if (!box || !hiddenInput) return
  var values = []
  box.querySelectorAll('input[type="checkbox"]').forEach(function (cb) {
    if (cb.checked) values.push(cb.value)
  })
  hiddenInput.value = values.join(', ')
}

document.addEventListener('DOMContentLoaded', function () {
  var productBox = document.querySelector('#productInterestedIn')
  var hearBox = document.querySelector('#hearAbout')
  var productHidden = document.querySelector('input[name="product"]')
  var hearHidden = document.querySelector('input[name="hearAboutUs"]')
  var form = document.getElementById('contact-page-form')
  var errEl = document.getElementById('contact-form-error')

  function showError(msg) {
    if (errEl) {
      errEl.textContent = msg
      errEl.hidden = false
    } else {
      window.alert(msg)
    }
  }

  function clearError() {
    if (errEl) {
      errEl.textContent = ''
      errEl.hidden = true
    }
  }

  if (productBox && productHidden) {
    productBox.querySelectorAll('input[type="checkbox"]').forEach(function (cb) {
      cb.addEventListener('change', function () {
        syncCheckboxGroup('#productInterestedIn', productHidden)
        clearError()
      })
    })
  }

  if (hearBox && hearHidden) {
    hearBox.querySelectorAll('input[type="checkbox"]').forEach(function (cb) {
      cb.addEventListener('change', function () {
        syncCheckboxGroup('#hearAbout', hearHidden)
        clearError()
      })
    })
  }

  if (form && hearHidden && productHidden) {
    form.addEventListener('submit', function (e) {
      syncCheckboxGroup('#hearAbout', hearHidden)
      syncCheckboxGroup('#productInterestedIn', productHidden)

      var hear = hearHidden.value.trim()
      var prod = productHidden.value.trim()

      if (!hear) {
        e.preventDefault()
        showError('Please select at least one option for “How did you hear about us?”.')
        if (hearBox) hearBox.scrollIntoView({ behavior: 'smooth', block: 'center' })
        return
      }
      if (!prod) {
        e.preventDefault()
        showError('Please select at least one product you are interested in.')
        if (productBox) productBox.scrollIntoView({ behavior: 'smooth', block: 'center' })
        return
      }
      clearError()
    })
  }
})
