// console.clear()
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
      window.alert(response)
      console.log(response.user._id)
      console.log(response.user.auth_token)
      // success save the repsonse
      window.localStorage.id = response.user._id
      window.localStorage.email = $('#inputEmail2').val()
      window.localStorage.auth_token = response.user.auth_token
      // then redirect
      window.location.href = './'
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
      console.log(response.user._id)
      console.log(response.user.auth_token)
      // success save the repsonse
      window.localStorage.id = response.user._id
      window.localStorage.email = $('#inputEmail2').val()
      window.localStorage.auth_token = response.user.auth_token
      // then redirect
      window.location.href = './'
    },
    error: function (xhr, ajaxOptions, thrownError) {
      // else output error
      console.log(xhr.status)
      console.log(thrownError)
      window.alert('Login Failed')
    }
  })
}
console.log('hi')
// check for user auth
$(function () {
  // if (!window.localStorage['email'] || !window.localStorage['auth_token']) loadUser()
  // globals $ currentUser //
  console.log('Hello ' + currentUser)

  // logout users
  $('#logout').click(function (event) {
    event.preventDefault()

    // window.locationStorage.removeItem('id')
    window.localStorage.removeItem('email')
    window.localStorage.removeItem('auth_token')
    window.location.href = '../'
  })

  // listen for the form login
  $('#signup-form').on('submit', function (event) {
    event.preventDefault()
    var formData = $(this).serialize()
    console.log(formData)
    signup(formData)
    $('#sign-in, #sign-up').hide()
  })

  // Signing in users
  // listen for the form login
  $('#signin-form').on('submit', function (event) {
    event.preventDefault()
    var formData = $(this).serialize()
    signin(formData)
    $('#sign-in, #sign-up').hide()
  })

  if (currentUser === null) $('#sign-in, #sign-up, #add-article').hide()
  $('#hello-user a').html('Hello, ' + currentUser)
  $('#user-name').html('Welcome ' + window.localStorage.email)
  $('#user-stats').html('Your auth_token: ' + window.localStorage.auth_token)
})
