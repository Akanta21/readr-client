console.log('article.js is loaded')
/* global $ */
$(document).ready(function () {
  function getParameterByName (name, url) {
    if (!url) url = window.location.href
    name = name.replace(/[\[\]]/g, '\\$&')
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
    var results = regex.exec(url)
    if (!results) return null
    if (!results[2]) return ''
    return decodeURIComponent(results[2].replace(/\+/g, ' '))
  }

  var serverURL = 'https://readr-app.herokuapp.com/'
<<<<<<< HEAD

  var id = '578e07585d16d1384ce6c2d1'
=======
  var id = getParameterByName('id')
>>>>>>> create-article

  $.ajax({
    type: 'GET',
    url: serverURL + 'articles/' + id,
    dataType: 'json'
  }).done(function (data) {
    $('#title').append(data.article.title.toUpperCase())
    $('#article-body').append(data.article.html)
    $('#source').append('<a href="' + data.article.url + '">SOURCE</a>')
    $('#tldr').append('<li>' + data.article.tldr[0].summary + '</li>')
    data.article.topics.forEach(function (topic) {
      $('#topics').append('<li>' + topic.topic.toUpperCase() + '</li>')
    })
  })

  // Add likes functionality
  $('#btn-likes').click(function () {
    $.get(serverURL + 'articles/' + id)
      .done(function (data) {
        var liked = data.article.liked
        liked++
        // console.log(liked)
        $.ajax({
          type: 'PATCH',
          crossDomain: true,
          url: serverURL + 'articles/' + id,
          dataType: 'json',
          data: {liked: liked}
        })
        .done(function (data) {
          console.log(liked)
          // data.article.liked
        })
      })
  })

  // Add share count functionality
  $('#btn-share').click(function () {
    $.get(serverURL + 'articles/' + id)
      .done(function (data) {
        var share = data.article.shared
        share++
        // console.log(liked)
        $.ajax({
          type: 'PATCH',
          crossDomain: true,
          url: serverURL + 'articles/' + id,
          dataType: 'json',
          data: {shared: share}
        })
        .done(function (data) {
          console.log(share)
          // data.article.liked
        })
      })
  })

  // get form data and post to articles api
  $('#create-article-form').on('submit', function (e) {
    e.preventDefault()
    var data = $(this).serialize()
    console.log(data)

    $.ajax({
      type: 'POST',
      url: 'https://readr-app.herokuapp.com/articles',
      data: data
    }).done(function (res) {
      // $('#title').empty().append(res.article.title.toUpperCase())
      // $('#article-body').empty().append(res.article.html)
      // $('#source').empty().append('<a href="' + res.article.url + '">SOURCE</a>')
      // $('#tldr').empty().append('<li>' + res.article.tldr[0].summary + '</li>')
      // $('#topics').empty()
      // res.article.topics.forEach(function (topic) {
      //   $('#topics').append('<li>' + topic.topic + '</li>')
      // })
      $('#create-article-submit').hide()
      $('#add-topics-form').show()
      res.article.topics.forEach(function (topic) {
        $('#topics-list').append('<li>' + topic.topic.toUpperCase() + '</li>')
      })
      $('#add-topics-form').on('submit', function (e) {
        e.preventDefault()
        var data2 = $(this).serialize()
        console.log(data2)

        $.ajax({
          type: 'PATCH',
          url: 'https://readr-app.herokuapp.com/articles/' + res.article._id,
          data: data2
        }).done(function (res) {
          // console.log(res)
          var newId = res.article._id
          window.location.replace('file:///Users/isabellaong/General%20Assembly/Projects/readr-client/articles/article.html?id=' + newId)
          // $('#topics-list').append('<li>' + data2.toUpperCase() + '</li>')
        })
      })
    }).fail(function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown)
    })
  })

  // add event listener for adding tldr

  // add event listener for editing topics
})
