console.log('article.js is loaded')
/* global $ */

$(document).ready(
  function () {
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
    var currentUser = null || window.localStorage.id
    var id = getParameterByName('id')
    var liked = $('#liked-count').html(liked)

    $('#scroll').scrollIndicator({

      // Support for IE8 and IE9 browsers.
      ieSupport: true,
      // Re-calculate values on window.resize event.
      bindResize: true,
      // React to changes in DOM model.
      bindDOMSubtreeModified: false,
      // Enable smooth animation
      animated: true,
      // Use of progress element. Disable for CSS3 animation.
      html5: false
    })

    // if (id) then run this
    if (id) {
      $.ajax({
        type: 'GET',
        url: serverURL + 'articles/' + id,
        dataType: 'json'
      }).done(function (data) {
        console.log(data)
        $('#title').append(data.article.title.toUpperCase())
        $('#article-body').append(data.article.html)
        $('#source').append('<a href="' + data.article.url + '">SOURCE</a>')
        data.article.tldr.forEach(function (tldr) {
          $('#tldr').append('<li>' + tldr.summary + '</li>')
        })
        data.article.topics.forEach(function (topic) {
          $('#topics').append('<li>' + topic.topic.toUpperCase() + '</li>')
        })
      })
    // Add likes functionality
      if (currentUser != null) {
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
              $('#liked-count').html(liked)
            })
            if (currentUser !== null) {
              $.ajax({
                type: 'PATCH',
                url: serverURL + 'users/' + currentUser,
                data: {articlesLiked: id}
              })
              .done(function (data) {
                console.log(data)
              })
            }
          })
        })
      }

      // Add share count functionality
      if (currentUser != null) {
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
                data: {
                  shared: share
                }
              })
              .done(function (data) {
                $('#shared-count').html(share)
                console.log(share)
              })
              if (currentUser !== null) {
                $.ajax({
                  type: 'PATCH',
                  url: serverURL + 'users/' + currentUser,
                  data: {articlesShared: id}
                })
                .done(function (data) {
                  console.log(data)
                })
              }
            })
        })
      }

      // get form data and post to articles api
      $('#create-article-form').on('submit', function (e) {
        e.preventDefault()
        var data = $(this).serialize()
        console.log(data)

        $.ajax({
          type: 'POST',
          url: 'https://readr-app.herokuapp.com/articles',
          dataType: 'json',
          data: data
        }).done(function (res) {
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
              dataType: 'json',
              data: data2
            }).done(function (res) {
            // console.log(res)
              var newId = res.article._id
              window.location.replace('https://flight846.github.io/readr-client/articles/article.html?id=' + newId)
            // $('#topics-list').append('<li>' + data2.toUpperCase() + '</li>')
            })
          })
        }).fail(function (jqXHR, textStatus, errorThrown) {
          console.log(errorThrown)
        })
      })

      // add event listener for adding tldr
      $('#add-tldr-form').on('submit', function (e) {
        e.preventDefault()
        var data = $(this).serialize()

        $.ajax({
          type: 'PATCH',
          url: serverURL + 'articles/' + id,
          dataType: 'json',
          data: data
        }).done(function (res) {
          var newId = res.article._id
          window.location.replace('https://flight846.github.io/readr-client/articles/article.html?id=' + newId)
        })
      })
      // add event listener for editing topics
      $('#edit-topics-form').on('submit', function (e) {
        e.preventDefault()
        var data = $(this).serialize()
        console.log(data)

        $.ajax({
          type: 'PATCH',
          url: serverURL + 'articles/' + id,
          dataType: 'json',
          data: data
        }).done(function (res) {
          var newId = res.article._id
          window.location.replace('https://flight846.github.io/readr-client/articles/article.html?id=' + newId)
        })
      })
    }
    // else redirect back to home page
  })
