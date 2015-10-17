angular.module('app', [])
  .controller('ArticleController', ['$http', '$scope', function($http, $scope){
    $scope.article = {};

    $scope.getArticle = function() {
      console.log('url', $scope.article.url);
      $http({
        method: 'GET',
        url: $scope.article.url
      })
      .then(function (resp) {
        $scope.article.text = resp.data;
      });
    };

    $scope.saveArticle = function() {
      console.log('savearticle called');
      var text = $scope.article.text;
      var filename = "article";
      var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
      saveAs(blob, filename + ".txt");
    };
  }]);