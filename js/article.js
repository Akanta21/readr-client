console.log('article.js is loaded')
/* global $ */
$(document).ready(function () {
  var serverURL = 'https://readr-app.herokuapp.com/'
  var id = '578e047798280fed4b315234'
  $.ajax({
    type: 'GET',
    url: serverURL + 'articles/' + id,
    dataType: 'json'
  }).done(function (data) {
    console.log(data.article.title)
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
        console.log(liked)
        $.ajax({
          type: 'PATCH',
          crossDomain: true,
          url: serverURL + 'articles/' + id,
          dataType: 'json'
        }).done(function (data) {
          console.log(liked)
          data.article.liked
        })
      })
  })
})
