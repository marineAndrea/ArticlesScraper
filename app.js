angular.module('app', [])
  .controller('ArticleController', ['$http', '$scope', function($http, $scope){
    $scope.article = {};

    $scope.getArticle = function() {
      console.log('url', $scope.article.url);
      $http({
        method: 'GET',
        url: 'http://www.thedailybeast.com/articles/2014/08/21/swat-lobby-takes-a-shot-at-congress.html'
      })
      .then(function (resp) {
        $scope.article.sections = $scope.parseArticle(resp.data);
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