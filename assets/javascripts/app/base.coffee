define ['angularjs', 'angularroute', 'basefileupload', 'sanitize', 'anganimate', 'tagsip', 'elasticjs','fbase', 'afire', 'fbutils'], (angular, route, basefileupload, sanitize, anganimate,tagsip, elastic, Firebase, afire, fbutils) ->


  AngApp = angular.module('angApp', ['ngRoute', 'naif.base64', 'ngSanitize', 'ngAnimate', 'ngTagsInput', 'monospaced.elastic', 'firebase']).config ([
                '$routeProvider',
                ($routeProvider) ->

                  $routeProvider.when '/',
                    template: '<div class="row text-center ng-cloak"><div class="col-md-12"></div><i class="icon-spin5 animate-spin text-dark-gray"></i> <span class="text-dark-gray">Loading...</span></div>'
                    controller: (["$location", "$rootScope", ($location, $rootScope) ->
                      $location.path($rootScope.rootPath)
                    ])

#                  $routeProvider.when '/dashboard',
#                    templateUrl: "/javascripts/app/templates/dashboard.html"
#                    controller: 'DashboardController'

                  $routeProvider.when '/student',
                    templateUrl: "/javascripts/app/templates/student/dashboard.html"
                    controller: 'StudentController'

                  $routeProvider.when '/mentor',
                    templateUrl: "/javascripts/app/templates/mentor/dashboard.html"
                    controller: 'MentorController'

                  $routeProvider.when '/mentor/courses/:courseId/edit',
                    templateUrl: "/javascripts/app/templates/edit-course.html"
                    controller: 'NewCourseController'  

#                  $routeProvider.when '/admin',
#                    templateUrl: "/javascripts/app/templates/admin/dashboard.html"
#                    controller: 'AdminController'

               ])

  AngApp.run ([
    "$rootScope", "$location", "FirebaseService", "$route", "$timeout", "$firebaseArray", "$firebaseObject",
    ($rootScope, $location, FirebaseService, $route, $timeout, $firebaseArray, $firebaseObject) ->
      $rootScope.location = $location
      $rootScope.authLoaded = false
      auth = FirebaseService.rootRef.getAuth()
      $rootScope.rootRef = FirebaseService.rootRef

      $rootScope.$on '$locationChangeSuccess', ->
        $rootScope.location = window.location.pathname
        $rootScope.locationHash = window.location.hash

      $rootScope.disableModal = () ->
        $rootScope.enableModal = false



      if auth
        $rootScope.currentUid = auth.uid
        $rootScope.rootRef.child("users/#{auth.uid}/basic").once "value", (snap) ->


          $rootScope.$apply ->
            $rootScope.userBasic = snap.val()
            $rootScope.userBatchesIndex = $firebaseArray($rootScope.rootRef.child("users/#{auth.uid}/batches/index"))
            $rootScope.userBasicName = snap.val().firstName + ' ' + snap.val().lastName
            $rootScope.currentUserRef = $rootScope.rootRef.child("users/#{auth.uid}")
            $rootScope.authLoaded = true


            $rootScope.dashHref = "#/#{$rootScope.userBasic.userType}"
            $rootScope.rootHref = "#/#{$rootScope.userBasic.userType}"
            $location.path("/#{$rootScope.userBasic.userType}")


      else
        window.location = '/sign-in'
  ])



  angular.element(document).ready ->
    angular.bootstrap document, ['angApp'], {strictDi:true}


  AngApp