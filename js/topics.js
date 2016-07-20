/* global $*/
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

$(function () {
  getArticlesByTopic()
})

// for topics-white-theme.html
function getArticlesByTopic () {
  $.ajax({
    url: 'https://readr-app.herokuapp.com/articles/',
    success: function (data) {
      console.log(data.article[0])
      for (var i = 0; i < 13; i++) {
        $('div.grid__item__' + i).css('background-image', 'url(' + data.article[i].images[0] + ')')
        $('h3.topic__' + i).append(data.article[i].title.capitalize()).addClass('articleTitle')
      // $('.grid__article').append(data.article[i].tldr[0].summary)
      }
    }
  })
}

// for topics-all.html
function addArticlesGrid () {
  $.ajax({
    url: 'https://readr-app.herokuapp.com/articles/',
    success: function (data) {
      console.log(data.article[0])
      for (var i = 0; i < 13; i++) {
        $('div.grid__item__' + i).css('background-image', 'url(' + data.article[i].images[0] + ')')
        $('h3.topic__' + i).append(data.article[i].title.capitalize()).addClass('articleTitle')
      // $('.grid__article').append(data.article[i].tldr[0].summary)
      }
    }
  })
}
