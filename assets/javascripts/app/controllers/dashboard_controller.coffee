define ['app/base'], (AngApp) ->

  class DashboardController

    constructor: ($scope, FirebaseService, $rootScope, $routeParams, $window, $sce, $location, $templateCache, $timeout) ->
      $scope.tpl = "javascripts/app/templates/#{$rootScope.userBasic.userType}/dashboard.html"




  DashboardController.$inject = ["$scope", "FirebaseService", "$rootScope", "$routeParams", "$window", "$sce", "$location", "$templateCache", "$timeout"]

  AngApp.controller 'DashboardController', DashboardController

  DashboardController