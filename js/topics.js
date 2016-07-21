/* global $ GRIDSLIDESHOW */

// setting commonly used variables
var currentPage
var currentColumn
var current_Grid
var currentItem
var currentTitle
var counter = 0

// reading URL params using jQuery
$.urlParam = function (name) {
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href)
  if (!results || results.length === 0) return 0
  return results[1]
}

// defining a function that randomly generates a number to randomise the layout of t
function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function setCurrentGrid () {
  $('div.grid:not(:first-child)').removeClass('grid--current')
  $('div.grid:first').addClass('grid--current')
}

// function getArticlesByTopic () {
//   $.ajax({
//     url: 'https://readr-app.herokuapp.com/topics/' + topicName,
//     success: function (data) {
//       for (var i = 0; i < data.length; i++) {
//         if (i % 5 === 0) {
//           currentPage = $('<div class="grid grid--vertical grid--current grid--style-2" data-fill="#ece6e6">')
//           $('div.grid-pages').append(currentPage)
//         }
//
//         if (counter === 0) {
//           currentColumn = $('<div class="grid__column">')
//           currentPage.append(currentColumn)
//           counter = getRandomInt(1, 2)
//         }
//         counter--
//         current_Grid = $('<div class="grid__item" data-delay="50" style="transform: translateY(0px)">')
//         currentColumn.append(current_Grid)
//
//         currentItem = $('<div class="grid__img">')
//         current_Grid.append(currentItem)
//
//         currentItem.css('background-image', 'url(' + data[i].images[0] + ')')
//         currentItem.wrap('<a href="https://flight846.github.io/readr-client/articles/article.html?id=' + data[i]._id + '"></a>')
//
//         currentTitle = $('<h3 class="caption topic articleTitle" style="transform: translateY(0px); background: rgba(255,255,255,0.6); padding: 5px 20px 20px 5px">')
//         current_Grid.append(currentTitle)
//         currentTitle.append(data[i].title.toUpperCase())
//         currentTitle.wrap('<a href="https://flight846.github.io/readr-client/articles/article.html?id=' + data[i]._id + '"></a>')
//       }
//       setCurrentGrid()
//       GRIDSLIDESHOW()
//     }
//   })
// }

// PUBLIC ROOT PAGE. GET ALL ARTICLES IN DATABASE, SORTED BY RECENCY
function getAllArticles () {
  var topicName = $.urlParam('topic')
  var serverURL = 'https://readr-app.herokuapp.com/articles'
  if (topicName) serverURL = 'https://readr-app.herokuapp.com/topics/' + topicName
  $.ajax({
    url: serverURL,
    success: function (data) {
      console.log(data.articles[0])
      var collection
      if (topicName) {
        collection = data
      } else {
        collection = data.articles
      }
      for (var i = 0; i < collection.length; i++) {
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

        currentItem.css('background-image', 'url(' + collection[i].images[0] + ')')
        currentItem.wrap('<a href="https://flight846.github.io/readr-client/articles/article.html?id=' + collection[i]._id + '"></a>')

        currentTitle = $('<h3 class="caption topic articleTitle" style="transform: translateY(0px); background: rgba(255,255,255,0.6); padding: 5px 20px 20px 5px">')
        current_Grid.append(currentTitle)
        currentTitle.append(collection[i].title.toUpperCase())
        currentTitle.wrap('<a href="https://flight846.github.io/readr-client/articles/article.html?id=' + collection[i]._id + '"></a>')
      }
      setCurrentGrid()
      GRIDSLIDESHOW()
    }
  })
}

// PRIVATE ROOT PAGE. WHEN USER IS LOGGED IN, SHOW TOP 5 TOPICS AND 5 ARTICLES PER TOPIC
// function getUsersHomePage () {
//   const usersTopics = ['architecture', 'nofx', 'gabrielle', 'isabella']
//   for (var j = 0; j < usersTopics.length; j++) {
//     $.ajax({
//       url: 'https://readr-app.herokuapp.com/topics/' + usersTopics[j],
//       success: function (data) {
//         var counter = 0
//         for (var i = 0; i < data.length; i++) {
//           if (i % 5 === 0) {
//             currentPage = $('<div class="grid grid--vertical grid--current grid--style-2" data-fill="#ece6e6">')
//             $('div.grid-pages').append(currentPage)
//           }
//
//           if (counter === 0) {
//             currentColumn = $('<div class="grid__column">')
//             currentPage.append(currentColumn)
//             counter = getRandomInt(1, 2)
//           }
//           counter--
//           current_Grid = $('<div class="grid__item" data-delay="50" style="transform: translateY(0px)">')
//           currentColumn.append(current_Grid)
//
//           currentItem = $('<div class="grid__img">')
//           current_Grid.append(currentItem)
//
//           currentItem.css('background-image', 'url(' + data[i].images[0] + ')')
//           currentItem.wrap('<a href="https://flight846.github.io/readr-client/articles/article.html?id=' + data[i]._id + '"></a>')
//
//           currentTitle = $('<h3 class="caption topic articleTitle" style="transform: translateY(0px); background: rgba(255,255,255,0.6); padding: 5px 20px 20px 5px">')
//           current_Grid.append(currentTitle)
//           currentTitle.append(data[i].title.toUpperCase())
//           currentTitle.wrap('<a href="https://flight846.github.io/readr-client/articles/article.html?id=' + data[i]._id + '"></a>')
//         }
//         setCurrentGrid()
//         GRIDSLIDESHOW()
//       }
//     })
//   }
// }

// jQuery time!
$(function () {
  // getArticlesByTopic()
  getAllArticles()
  // getUsersHomePage()
})
