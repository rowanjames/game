
define ['angularjs', 'anganimate', 'sanitize','afire', 'ngupload'], (angular) ->

  AngApp = angular.module("angApp", ['ngAnimate', 'ngSanitize', 'firebase', 'ngFileUpload'])

  angular.element(document).ready ->
    angular.bootstrap document, ['angApp']


  AngApp