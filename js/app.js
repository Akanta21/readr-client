console.clear()
console.log('App.js is loaded')
/* global $ */
var serverURL = 'https://readr-app.herokuapp.com/'
var currentUser = null || window.localStorage.email

function signup (formData) {
  console.log(formData)
  $.ajax({
    type: 'POST',
    url: serverURL + 'signup',
    data: formData,
    success: function (response) {
      // then redirect
      window.location.href = './users/index.html'
    },
    error: function (xhr, ajaxOptions, thrownError) {
      // else output error
      console.log(xhr.status)
      console.log(thrownError)
      window.alert('Signup Failed')
    }
  })
}

function signin (formData) {
  $.ajax({
    type: 'POST',
    url: serverURL + 'signin',
    data: formData,
    success: function (response) {
      window.alert(response)
      // success save the repsonse
      window.localStorage.email = $('#inputEmail2').val()
      window.localStorage.auth_token = response.auth_token
      // then redirect
      window.location.href = './users/index.html'
    },
    error: function (xhr, ajaxOptions, thrownError) {
      // else output error
      console.log(xhr.status)
      console.log(thrownError)
      window.alert('Login Failed')
    }
  })
}
// check for user auth
$(function () {
  // if (!window.localStorage['email'] || !window.localStorage['auth_token']) loadUser()
  // globals $ currentUser //
  console.log('Hello ' + currentUser)

  // logout users
  $('#logout').click(function (event) {
    event.preventDefault()

    window.localStorage.removeItem('email')
    window.localStorage.removeItem('auth_token')
    window.location.href = '../index.html'
  })

  // listen for the form login
  $('#signup-form').on('submit', function (event) {
    event.preventDefault()
    var formData = $(this).serialize()
    console.log(formData)
    signup(formData)
  })

  // Signing in users
  // listen for the form login
  $('#signin-form').on('submit', function (event) {
    event.preventDefault()
    var formData = $(this).serialize()
    signin(formData)
  })

  $('#hello-user a').html('Hello, ' + currentUser)
})
