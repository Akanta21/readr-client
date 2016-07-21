/* global $*/
function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function createHomeGrid () {

  $.ajax({
    url: 'https://readr-app.herokuapp.com/articles',
    success: function (data) {
      console.log(data.articles)
      for (var i = 0; i < data.articles.length/3; i = i + 3) {
        var box = $("<main class='container'> <box class='flex-" + getRandomInt(1,3) + "' id='box" + [i] + "'> </box> <box class='flex-" + getRandomInt(1,3) + "' id='box" + [i + 1] + "'> </box> <box class='flex-" + getRandomInt(1,3) + "' id='box" + [i + 2] + "'> </box> </main>")

        var container = $('div#homegrid')
        container.append(box)
      }
    }
  })
}

function getAllArticleTitles () {
  $.ajax({
    url: 'https://readr-app.herokuapp.com/articles',
    success: function (data) {
      for (var i = 0; i < data.articles.length; i++) {
          var currentBox = $('box#box' + i)
          currentBox.append(data.articles[i].title)
      }
    }
  })
}

$(function () {
  createHomeGrid()
  getAllArticleTitles()
})
