define ['app/base','angularjs', 'fbase'], (AngApp) ->

  class NavBarController

    constructor: ($scope, FirebaseService) ->
      $scope.loggedIn = if FirebaseService.authData then true else false

      $scope.signOut = ($event) ->
        $event.preventDefault()
        FirebaseService.rootRef.unauth()
        window.location = '/'





  NavBarController.$inject = ["$scope", "FirebaseService"]

  AngApp.controller 'NavBarController', NavBarController

  NavBarController