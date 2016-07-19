console.clear()
console.log('App.js is loaded')
/* global $ */
var serverURL = 'http://readr-app.herokuapp.com/'

// sigining up users
$(function () {
  // listen for the form login
  $('#signup-form').on('submit', function (event) {
    event.preventDefault()
    var formData = $(this).serialize()
    signup(formData)
  })
})

function signup (formData) {
  $.ajax({
    type: 'POST',
    url: serverURL + 'signup',
    data: formData,
    success: function (response) {
      // then redirect
      window.location.href = '/users/index.html'
    },
    error: function (xhr, ajaxOptions, thrownError) {
      // else output error
      console.log(xhr.status)
      console.log(thrownError)
      window.alert('Singup Failed')
    }
  })
}

// Signing in users
$(function () {
  // listen for the form login
  $('#signin-form').on('submit', function (event) {
    event.preventDefault()
    var formData = $(this).serialize()
    signin(formData)
  })
})

function signin (formData) {
  $.ajax({
    type: 'POST',
    url: serverURL + 'signin',
    data: formData,
    success: function (response) {
      // success save the repsonse
      window.localStorage.email = $('inputEmail2').val()
      window.localStorage.auth_token = response.auth_token
      // then redirect
      window.location.href = '/users/index.html'
    },
    error: function (xhr, ajaxOptions, thrownError) {
      // else output error
      console.log(xhr.status)
      console.log(thrownError)
      window.alert('Login Failed')
    }
  })
}

// user auth
var currentUser = null

// We are assuming Local Storage is supported
$(function () {
  // if (!window.localStorage['email'] || !window.localStorage['auth_token']) window.location.href = 'index.html'
  // else loadUser()
})

// globals $ currentUser //
function pageReady () {
  console.log('Hello ' + currentUser.name)

  // to logout we just clear the localstorage and redirect
  $('#logout').click(function (event) {
    event.preventDefault()

    window.localStorage.removeItem('email')
    window.localStorage.removeItem('auth_token')
    window.location.href = 'index.html'
  })
}

// load the user from the server. This ensures we have a logged in user
function loadUser () {
  $.ajax({
    type: 'GET',
    url: serverURL + 'user',
    beforeSend: function (xhr) {
      xhr.setRequestHeader('User-Email', window.localStorage['email'])
      xhr.setRequestHeader('Auth-Token', window.localStorage['auth_token'])
    },
    success: function (response) {
      console.log(response)
      // asign the current user
      currentUser = response
      // tell the current page we are ready
      if (pageReady) pageReady()
    },
    error: function (xhr, ajaxOptions, thrownError) {
      // else error, redirect to login
      window.location.href = 'index.html'
    }
  })
}
