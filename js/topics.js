/* global $ GRIDSLIDESHOW */

// defining functions which are used in topics.js
function getParameterByName (name, url) {
  if (!url) url = window.location.href
  name = name.replace(/[\[\]]/g, '\\$&')
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

// defining a capitalize() function for article's title
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

// defining a function that randomly generates a number to randomise the layout of t
function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

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
      console.log(data.articles[0]._id)
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

        currentItem = $('<div class="grid__img">')
        current_Grid.append(currentItem)

        currentItem.css('background-image', 'url(' + data.articles[i].images[0] + ')')
        currentItem.wrap('<a href="https://flight846.github.io/readr-client/articles/article.html?id=' + data.articles[i]._id + '"></a>')

        currentTitle = $('<h3 class="caption topic articleTitle" style="transform: translateY(0px); background: rgba(255,255,255,0.6); padding: 5px 20px 20px 5px">')
        current_Grid.append(currentTitle)
        currentTitle.append(data.articles[i].title.capitalize())
        currentTitle.wrap('<a href="https://flight846.github.io/readr-client/articles/article.html?id=' + data.articles[i]._id + '"></a>')
      }
      setCurrentGrid()
      GRIDSLIDESHOW()
    }
  })
}

// jQuery time!
$(function () {
  getArticlesByTopic()
})
