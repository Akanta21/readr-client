console.log('article.js is loaded')
/* global $ */
$(document).ready(function () {
  function getParameterByName (name, url) {
    if (!url) url = window.location.href
    name = name.replace(/[\[\]]/g, '\\$&')
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url)
    if (!results) return null
    if (!results[2]) return ''
    return decodeURIComponent(results[2].replace(/\+/g, ' '))
  }

  var serverURL = 'https://readr-app.herokuapp.com/'
  var id = getParameterByName('id')

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
      console.log(res)
      $('#title').empty().append(res.article.title.toUpperCase())
      $('#article-body').empty().append(res.article.html)
      $('#source').empty().append('<a href="' + res.article.url + '">SOURCE</a>')
      $('#tldr').empty().append('<li>' + res.article.tldr[0].summary + '</li>')
      $('#topics').empty()
      res.article.topics.forEach(function (topic) {
        $('#topics').append('<li>' + topic.topic + '</li>')
      })
      $('#create-article-submit').hide()
      $('#add-topics-form').show()
      res.article.topics.forEach(function (topic) {
        $('#topics-list').append('<li>' + topic.topic + '</li>')
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
          console.log(res)
          $('#topics-list').append('<li>' + data2.toUpperCase() + '</li>')
        })
      })
    }).fail(function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown)
    })
  })

    // get all topics of current article and patch to article
    // $.ajax({
    //   type: 'GET',
    //   url: serverURL + 'articles/' + id,
    //   dataType: 'json'
    // }).done(function (data) {
    //   data.article.topics.forEach(function (topic) {
    //     $('#topics').append('<li>' + topic.topic.toUpperCase() + '</li>')
    //   })
    // })
  // }
  // add event listener for adding tldr

  // add event listener for editing topics
})
