console.log('article.js is loaded')
/* global $ */
$(document).ready(function () {
  var serverURL = 'https://readr-app.herokuapp.com/'

  var id = '578f1782ce0949100005aa7d'

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
      $('#title').empty().append(res.article.title.toUpperCase())
      $('#article-body').empty().append(res.article.html)
      $('#source').empty().append('<a href="' + res.article.url + '">SOURCE</a>')
      $('#tldr').empty().append('<li>' + res.article.tldr[0].summary + '</li>')
      res.article.topics.forEach(function (topic) {
        $('#topics').empty().append('<li>' + topic.topic.toUpperCase() + '</li>')
      })
      $('#add-topics-form').show()
      res.article.topics.forEach(function (topic) {
        $('#topics-list').empty().append('<li>' + topic.topic.toUpperCase() + '</li>')
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
