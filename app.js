angular.module('app', [])
  .controller('ArticleController', ['$http', '$scope', function($http, $scope){
    $scope.article = {};

    $scope.getArticle = function() {
      $scope.article.sections = [];
      console.log('url', $scope.article.url);
      $http({
        method: 'GET',
        url: $scope.article.url
      })
      .then(function successCallback(response) {
          $scope.article.sections = $scope.parseArticle(response.data);
        }, function errorCallback(response) {
          alert("sorry we couldn't get this article, try another url");
        });
    };

    $scope.saveArticle = function() {
      console.log('savearticle called');
      var text = "";
      for (var i = 0; i < $scope.article.sections.length; i++) {
        text += $scope.article.sections[i];
      }
      var filename = "article";
      var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
      saveAs(blob, filename + ".txt");
    };

    $scope.parseArticle = function(html) {
      var $output = $(html).find('p');
      var parag = [];
      for (var i = 0; i < $output.length; i++) {
        if ($output[i].className === '') {
          parag.push($output[i].outerText);
        }
      }
      return parag;
    };

  }]);