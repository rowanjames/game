
define ['angularjs', 'anganimate', 'sanitize','afire', 'ngupload', 'ext'], (angular) ->

  AngApp = angular.module("angApp", ['ngAnimate', 'ngSanitize', 'firebase', 'ngFileUpload', 'ap.canvas.ext'])

  angular.element(document).ready ->
    angular.bootstrap document, ['angApp']


  AngApp