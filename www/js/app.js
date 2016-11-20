// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic','angularMoment'])

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.cordova && window.cordova.inAppBrowser) {
      window.open = window.cordova.inAppBrowser.open;
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.controller("feed_reader",["$scope","$http",function($scope,$http){
  $scope.stories = [];
  $scope.loadMore = function(){
    var params = {};
    if($scope.stories.length > 0){
        params["after"] = $scope.stories[$scope.stories.length -1].name;
    }
    $http.get("https://www.reddit.com/r/Cricket/new/.json",{params:params})
      .success(function(response){
        angular.forEach(response.data.children,function(feed){
          $scope.stories.push(feed.data);
        });
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
      };
      
    $scope.doRefresh = function(){
        var params = {};
        params["before"] = $scope.stories[0].name;
        $http.get("https://www.reddit.com/r/Cricket/new/.json",{params:params})
          .success(function(response){
            var newstory = [];
            angular.forEach(response.data.children,function(feed){
              newstory.push(feed.data);
            });
            $scope.stories = newstory.concat($scope.stories);
            $scope.$broadcast('scroll.refreshComplete');
          });
    };
    
    $scope.openLink = function(url){
        window.open(url,'_blank');
    };
}]);
