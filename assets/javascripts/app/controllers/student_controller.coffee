define ['app/base','angularjs', 'fbase'], (AngApp) ->

  class StudentController

    constructor: ($scope, FirebaseService, $window, $timeout, $firebaseObject, $firebaseArray, $rootScope, $sce, $location) ->

      $scope.coursesTab = $scope.batchesTab = $scope.questionHoursTab = $scope.appointmentsTab = $scope.paymentsTab = $scope.faqTab = {}
      

      $scope.coursesTab.boot = () ->
        $scope.selectedTab = 'COURSES'
        $scope.tpl= "javascripts/app/templates/student/courses.html"
        $rootScope.userBatchesIndex.$loaded (x) ->
          if x
            $scope.coursesTab.changeCourse(x[0])
            $scope.paneHeightNumber = $window.innerHeight - document.querySelector('nav').offsetHeight - document.querySelector('.student-dashboard').offsetHeight - document.querySelector('.courses-tab-option-dashboard').offsetHeight
            $scope.paneHeight = $scope.paneHeightNumber + 'px'
            $scope.paneStyle = {'max-height': $scope.paneHeight, 'min-height': $scope.paneHeight}

      $scope.coursesTab.boot()      

      $scope.coursesTab.changeCourse = (batch) ->
        console.log batch
        $scope.coursesTab.currentCourse.$destroy() if $scope.coursesTab.currentCourse
        $scope.coursesTab.currentCourse = $firebaseObject($rootScope.rootRef.child("courses/#{batch.courseId}"))
        $scope.coursesTab.currentCourse.$loaded (x) ->
          if x
            firstUnitKey = $scope.getFirstKey(x.units)
            if firstUnitKey
              firstLessonKey = $scope.getFirstKey(x.units[firstUnitKey].lessons)
              if firstLessonKey
                $scope.coursesTab.lessonKey = firstLessonKey  
                firstProjectKey = $scope.getFirstKey(x.units[firstUnitKey].lessons[firstLessonKey].projects)
                if firstProjectKey
                  $scope.coursesTab.projectKey = firstProjectKey
                  $scope.coursesTab.changeProject(firstUnitKey, firstLessonKey, firstProjectKey, 1, 1, 1)
                else
                  $scope.coursesTab.projectHtml = ''
                  $scope.coursesTab.resetKeys()
              else
                $scope.coursesTab.projectHtml = ''
                $scope.coursesTab.resetKeys()
            else
              $scope.coursesTab.projectHtml = ''
              $scope.coursesTab.resetKeys()


      $scope.coursesTab.changeProject = (unitKey, lessonKey, projectKey, unitIndex, lessonIndex, projectIndex) ->  
        $scope.coursesTab.unitKey = unitKey                    
        $scope.coursesTab.lessonKey = lessonKey                    
        $scope.coursesTab.projectKey = projectKey
        $scope.coursesTab.unitIndex = unitIndex
        $scope.coursesTab.lessonIndex = lessonIndex                    
        $scope.coursesTab.projectIndex = projectIndex

        $scope.coursesTab.projectHtml = $sce.trustAsHtml(($scope.coursesTab.currentCourse.units[$scope.coursesTab.unitKey].lessons[$scope.coursesTab.lessonKey].projects[$scope.coursesTab.projectKey]).html)              

      $scope.coursesTab.resetKeys = () ->
        $scope.coursesTab.unitKey = $scope.coursesTab.lessonKey = $scope.coursesTab.projectKey = $scope.coursesTab.unitIndex = $scope.coursesTab.lessonIndex = $scope.coursesTab.projectIndex = null                            


      $scope.getFirstKey = (obj) ->
        if obj
          Object.keys(obj)[0]                 

      
      # $timeout ->
      #   $scope.tpl = 'javascripts/app/templates/mentor/batches.html'
      #   $scope.selectedTab = 'BATCHES'
      #   $scope.batchesTab.boot()
      # , 100       






  StudentController.$inject = ["$scope", "FirebaseService", "$window", "$timeout", "$firebaseObject", "$firebaseArray", "$rootScope", "$sce", "$location"]

  AngApp.controller 'StudentController', StudentController

  StudentController
