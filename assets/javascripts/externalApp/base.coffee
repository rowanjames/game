
define ['angularjs', 'anganimate', 'sanitize','afire'], (angular) ->

  AngApp = angular.module("angApp", ['ngAnimate', 'ngSanitize', 'firebase'])

  angular.element(document).ready ->
    angular.bootstrap document, ['angApp']


  AngApp