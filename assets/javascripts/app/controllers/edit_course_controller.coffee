define ['app/base', 'marked', 'picker'], (AngApp, marked, filepicker) ->

  filepicker.setKey("AbTiwTQQyRk64Q0iOoQHrz")

  class EditCourseController

    constructor: ($scope, $window, $sce, $routeParams, $rootScope, $timeout) ->
      $scope.editCourse = {content: {}}

      $scope.bootEdit = (course, unitKey, lessonKey, projectKey, unitIndex, lessonIndex, projectIndex) ->
        $scope.editCourse.course = course
        $scope.editCourse.unitKey = unitKey
        $scope.editCourse.lessonKey = lessonKey
        $scope.editCourse.projectKey = projectKey

        $scope.editCourse.unitIndex = unitIndex
        $scope.editCourse.lessonIndex = lessonIndex
        $scope.editCourse.projectIndex = projectIndex

        $scope.editCourse.content.html = $sce.trustAsHtml($scope.editCourse.course.units?[unitKey]?.lessons?[lessonKey]?.projects?[projectKey]?.html || '', {sanitize: false})
        $scope.editCourse.content.markdown = $scope.editCourse.course.units?[unitKey]?.lessons?[lessonKey]?.projects?[projectKey]?.markdown || ''


        $timeout ->
          $scope.paneHeightNumber = $window.innerHeight - document.querySelector('nav').offsetHeight - document.querySelector('.mentor-dashboard').offsetHeight - document.querySelector('.courses-tab-option-dashboard').offsetHeight
          $scope.paneHeight = $scope.paneHeightNumber + 'px'
          $scope.paneStyle = {'max-height': $scope.paneHeight, 'min-height': $scope.paneHeight}

          $scope.editPaneHeightNumber = $scope.paneHeightNumber - document.querySelector('.edit-pane-options').offsetHeight
          $scope.editPaneHeight = $scope.editPaneHeightNumber - 5 + 'px'
          $scope.editPaneStyle = {'max-height': $scope.editPaneHeight, 'min-height': $scope.editPaneHeight}

          $scope.menuPaneHeightNumber = $scope.paneHeightNumber - document.querySelector('.menu-pane-options').offsetHeight
          $scope.menuPaneHeight = $scope.menuPaneHeightNumber + 'px'
          $scope.menuPaneStyle = {'max-height': $scope.menuPaneHeight, 'min-height': $scope.menuPaneHeight}
        , 100  

      $scope.editCourse.convertMarked = () ->
        $rootScope.rootRef.child("courses/#{$scope.editCourse.course.$id}/units/#{$scope.editCourse.unitKey}/lessons/#{$scope.editCourse.lessonKey}/projects/#{$scope.editCourse.projectKey}/markdown").set $scope.editCourse.content.markdown
        $rootScope.rootRef.child("courses/#{$scope.editCourse.course.$id}/units/#{$scope.editCourse.unitKey}/lessons/#{$scope.editCourse.lessonKey}/projects/#{$scope.editCourse.projectKey}/html").set marked($scope.editCourse.content.markdown || "", {sanitize: false})
        $scope.editCourse.content.html = $sce.trustAsHtml(marked($scope.editCourse.content.markdown || "", {sanitize: false}))


      $scope.editCourse.changeProject = (unitKey, lessonKey, projectKey, unitIndex, lessonIndex, projectIndex) ->  
        $scope.editCourse.unitKey = unitKey                    
        $scope.editCourse.lessonKey = lessonKey                    
        $scope.editCourse.projectKey = projectKey
        $scope.editCourse.unitIndex = unitIndex
        $scope.editCourse.lessonIndex = lessonIndex                    
        $scope.editCourse.projectIndex = projectIndex
        $scope.editCourse.content.html = $sce.trustAsHtml($scope.editCourse.course.units[unitKey].lessons[lessonKey].projects[projectKey].html || '', {sanitize: false})
        $scope.editCourse.content.markdown = $scope.editCourse.course.units[unitKey].lessons[lessonKey].projects[projectKey].markdown || ''


      $scope.editCourse.onChangeNames = (newVal) ->
        $scope.editCourse.course.$save()
        $rootScope.rootRef.child("courses/index/#{$scope.editCourse.course.$id}/name").set $scope.editCourse.course.name


      $scope.editCourse.addUnit = () ->
        $scope.editCourse.creatingUnit = true
        unitRef = $rootScope.rootRef.child("courses/#{$scope.editCourse.course.$id}/units").push()
        unitRef.set {name: "New Unit"}, () ->
          $scope.$apply ->
            $scope.editCourse.creatingUnit = false

      $scope.editCourse.addLesson = (unitKey) ->
        $rootScope.modalHeader = 'New Lesson'
        $rootScope.modalContent = $sce.trustAsHtml('Enter a name for your new lesson: <br><br> <input name="name" type="text" placeholder="Lesson Name" class="lesson-name form-control bor"/>')
        $rootScope.modalButtonText = 'Create'
        $rootScope.enableModal = true

        $rootScope.onModalButtonClick = (e) ->
          e.preventDefault()
          if $(".lesson-name").val().trim().length > 0
            lessRef = $rootScope.rootRef.child("courses/#{$scope.editCourse.course.$id}/units/#{unitKey}/lessons").push()
            lessRef.set {name: $(".lesson-name").val().trim()}
            $rootScope.enableModal = false


      $scope.editCourse.addProject = (unitKey, lessonKey) ->
        $rootScope.modalHeader = 'New Project'
        $rootScope.modalContent = $sce.trustAsHtml('Enter a name for your new project: <br><br> <input name="name" type="text" placeholder="Project Name" class="project-name form-control bor"/>')
        $rootScope.modalButtonText = 'Create'
        $rootScope.enableModal = true

        $rootScope.onModalButtonClick = (e) ->
          e.preventDefault()
          if $(".project-name").val().trim().length > 0
            projRef = $rootScope.rootRef.child("courses/#{$scope.editCourse.course.$id}/units/#{unitKey}/lessons/#{lessonKey}/projects").push()
            projRef.set {name: $(".project-name").val().trim(), isText: true}
            $rootScope.enableModal = false


      $scope.editCourse.deleteProject = (unitKey, lessonKey, projectKey) ->            
        $rootScope.modalHeader = 'Delete Project'
        $rootScope.modalContent = $sce.trustAsHtml('Are you sure?')
        $rootScope.modalButtonText = 'Delete'
        $rootScope.enableModal = true

        $rootScope.onModalButtonClick = (e) ->
          e.preventDefault()
          $rootScope.rootRef.child("courses/#{$scope.editCourse.course.$id}/units/#{unitKey}/lessons/#{lessonKey}/projects/#{projectKey}").set null
          $rootScope.enableModal = false


      $scope.editCourse.deleteLesson = (unitKey, lessonKey) ->            
        $rootScope.modalHeader = 'Delete Lesson'
        $rootScope.modalContent = $sce.trustAsHtml('Are you sure?')
        $rootScope.modalButtonText = 'Delete'
        $rootScope.enableModal = true

        $rootScope.onModalButtonClick = (e) ->
          e.preventDefault()
          $rootScope.rootRef.child("courses/#{$scope.editCourse.course.$id}/units/#{unitKey}/lessons/#{lessonKey}").set null
          $rootScope.enableModal = false          



      $scope.editCourse.deleteUnit = (unitKey) ->            
        $rootScope.modalHeader = 'Delete Unit'
        $rootScope.modalContent = $sce.trustAsHtml('Are you sure?')
        $rootScope.modalButtonText = 'Delete'
        $rootScope.enableModal = true

        $rootScope.onModalButtonClick = (e) ->
          e.preventDefault()
          $rootScope.rootRef.child("courses/#{$scope.editCourse.course.$id}/units/#{unitKey}").set null
          $rootScope.enableModal = false          

      

  EditCourseController.$inject = ["$scope", "$window", "$sce", "$routeParams", "$rootScope", "$timeout"]

  AngApp.controller 'EditCourseController', EditCourseController

  EditCourseController