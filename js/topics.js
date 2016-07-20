/* global $ GRIDSLIDESHOW */
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

$(function () {
  getArticlesByTopic()
})

function setCurrentGrid () {
  $('div.grid:not(:first-child)').removeClass('grid--current')
  $('div.grid:first').addClass('grid--current')
}

function getArticlesByTopic () {
  $.ajax({
    url: 'https://readr-app.herokuapp.com/articles/',
    success: function (data) {
      var currentPage
      var currentColumn
      var current_Grid
      var currentItem
      var currentTitle
      var counter = 0

      for (var i = 0; i < data.articles.length; i++) {
        if (i % 5 === 0) {
          currentPage = $('<div class="grid grid--vertical grid--current grid--style-2" data-fill="#ece6e6">')
          $('div.grid-pages').append(currentPage)
        }

        if (counter === 0) {
          currentColumn = $('<div class="grid__column">')
          currentPage.append(currentColumn)
          counter = getRandomInt(1, 2)
        }
        counter--
        current_Grid = $('<div class="grid__item" data-delay="50" style="transform: translateY(0px)">')
        currentColumn.append(current_Grid)

        // current_Grid.css('background-image', 'url(' + data.articles[i].images[0] + ')')

        currentItem = $('<div class="grid__img">')
        current_Grid.append(currentItem)
        //
        // currentBackground = $('<div class="grid__img">')
        // currentItem.append(currentBackground)

        currentItem.css('background-image', 'url(' + data.articles[i].images[0] + ')')

        currentTitle = $('<h3 class="caption topic articleTitle" style="transform: translateY(0px); background: rgba(255,255,255,0.6); padding: 5px 20px 20px 5px">')
        current_Grid.append(currentTitle)
        currentTitle.append(data.articles[i].title.capitalize())
      // $('h3.topic').text(data.articles[i].title)
      // .addClass('articleTitle')
      // $('.grid__article').append(data.article[i].tldr[0].summary)
      }
      setCurrentGrid()
      GRIDSLIDESHOW()
    }
  })
}
