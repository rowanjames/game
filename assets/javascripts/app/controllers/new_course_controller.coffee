define ['app/base', 'marked', 'picker'], (GildersApp, marked, filepicker) ->

  filepicker.setKey("AbTiwTQQyRk64Q0iOoQHrz")

  class NewCourseController

    constructor: ($scope, FirebaseService, $window, $sce, $routeParams, $rootScope, $timeout) ->


      $scope.courseKey = $routeParams.courseId
      runOnce = null
      $scope.writingDisabled = true


      $scope.actives  = {}

      FirebaseService.rootRef.child("courses/#{$routeParams.courseId}").on "value", (snap) ->
        setTimeout ->
          $scope.$apply ->
            $scope.course = snap.val()
            $scope.courseName = snap.val().name unless runOnce
            $scope.layout = true unless runOnce
            runOnce = true
          $('.contains-tooltip').tooltip()
        , 1000



      $scope.resetContents = ->
        $scope.content.markdown = ''
        $scope.content.html = ''
        $scope.content.html = ''
        $scope.chapterName = {}
        $scope.actives = {}


      $scope.checkIfEnabled = ->
        unless $scope.actives.project
          $rootScope.modalHeader = 'No Project Selected'
          $rootScope.modalContent = $sce.trustAsHtml('You need to select a project to start writing.')
          $rootScope.modalButtonText = 'Close'
          $rootScope.enableModal = true

          $rootScope.onModalButtonClick = (e) ->
            e.preventDefault()
            $rootScope.enableModal = false






      $scope.addLesson = (unitKey) ->

        $rootScope.modalHeader = 'New Lesson'
        $rootScope.modalContent = $sce.trustAsHtml('Enter a name for your new lesson: <br><br> <input name="name" type="text" placeholder="Lesson Name" class="lesson-name form-control bor"/>')
        $rootScope.modalButtonText = 'Create'
        $rootScope.enableModal = true

        $rootScope.onModalButtonClick = (e) ->
          e.preventDefault()
          if $(".lesson-name").val().trim().length > 0
            lessRef = FirebaseService.rootRef.child("courses/#{$scope.courseKey}/units/#{unitKey}/lessons").push()
            lessRef.set {name: $(".lesson-name").val().trim()}
            $rootScope.enableModal = false

            $scope.actives = {unit: unitKey, lesson: lessRef.key()}
            $scope.lessonName = $(".lesson-name").val().trim()



      $scope.addUnit = () ->
        $scope.creatingUnit = true
#        if $scope.course.units
#          totalUnits = Object.keys($scope.course.units).length
#        else
#          totalUnits = 0

#        nextUnitNum = totalUnits + 1

        unitRef = FirebaseService.rootRef.child("courses/#{$scope.courseKey}/units").push()
#        unitRef.set {name: "Unit #{nextUnitNum}"}, () ->
        unitRef.set {name: "New Unit"}, () ->
          $scope.creatingUnit = false



      $scope.addProject = (unitKey, lessonKey) ->
        $rootScope.modalHeader = 'New Section'
        $rootScope.modalContent = $sce.trustAsHtml('Enter a name for your new section: <br><br> <input name="name" type="text" placeholder="Section Name" class="project-name form-control bor"/>')
        $rootScope.modalButtonText = 'Create'
        $rootScope.enableModal = true

        $rootScope.onModalButtonClick = (e) ->
          e.preventDefault()
          if $(".project-name").val().trim().length > 0
            projRef = FirebaseService.rootRef.child("courses/#{$scope.courseKey}/units/#{unitKey}/lessons/#{lessonKey}/projects").push()
            projRef.set {name: $(".project-name").val().trim(), isText: true}
            $rootScope.enableModal = false

            $scope.actives = {unit: unitKey, lesson: lessonKey, project: projRef.key()}
            $scope.projectName = $(".project-name").val().trim()



      $scope.delUnit = (unitKey) ->
        $rootScope.modalHeader = 'Delete Unit'
        $rootScope.modalContent = "Are you sure?"
        $rootScope.modalButtonText = 'Delete'
        $rootScope.enableModal = true

        $rootScope.onModalButtonClick = (e) ->
          e.preventDefault()
          FirebaseService.rootRef.child("courses/#{$scope.courseKey}/units/#{unitKey}").set null
          $rootScope.enableModal = false
          $scope.resetContents()


      $scope.delLesson = (unitKey, lessonKey) ->
        $rootScope.modalHeader = 'Delete Lesson'
        $rootScope.modalContent = "Are you sure?"
        $rootScope.modalButtonText = 'Delete'
        $rootScope.enableModal = true

        $rootScope.onModalButtonClick = (e) ->
          e.preventDefault()
          FirebaseService.rootRef.child("courses/#{$scope.courseKey}/units/#{unitKey}/lessons/#{lessonKey}").set null
          $rootScope.enableModal = false
          $scope.resetContents()


      $scope.delProject = (unitKey, lessonKey, projectKey) ->
        $rootScope.modalHeader = 'Delete Project'
        $rootScope.modalContent = "Are you sure?"
        $rootScope.modalButtonText = 'Delete'
        $rootScope.enableModal = true

        $rootScope.onModalButtonClick = (e) ->
          e.preventDefault()
          FirebaseService.rootRef.child("courses/#{$scope.courseKey}/units/#{unitKey}/lessons/#{lessonKey}/projects/#{projectKey}").set null
          $rootScope.enableModal = false
          $scope.resetContents()


      $scope.saveUnitName = (unitName, unitKey) ->
        FirebaseService.rootRef.child("courses/#{$scope.courseKey}/units/#{unitKey}/name").set unitName

      $scope.saveLessonName = (unitKey, lessonKey, lessonName) ->
        FirebaseService.rootRef.child("courses/#{$scope.courseKey}/units/#{unitKey}/lessons/#{lessonKey}/name").set lessonName

      $scope.saveProjectName = (unitKey, lessonKey, projectKey, name) ->
        FirebaseService.rootRef.child("courses/#{$scope.courseKey}/units/#{unitKey}/lessons/#{lessonKey}/projects/#{projectKey}/name").set name


      $scope.openProject = (unitKey, lessonKey, projectKey, projectName) ->
        $scope.makeLiActive = projectKey

        $scope.actives = {unit: unitKey, lesson: lessonKey, project: projectKey}
        $scope.content.markdown = $scope.course.units[unitKey].lessons[lessonKey].projects[projectKey].markdown || ""
        $scope.content.html = $sce.trustAsHtml(marked($scope.course.units[unitKey].lessons[lessonKey].projects[projectKey].html || "", {sanitize: false}))


        $scope.projectName = projectName unless projectName.trim().length == 0

        $scope.writingDisabled = false



      $scope.toggleSubmissions = (unitKey, lessonKey, projectKey, submissions) ->
        console.log unitKey,lessonKey, projectKey, submissions

        FirebaseService.rootRef.child("courses/#{$scope.courseKey}/units/#{unitKey}/lessons/#{lessonKey}/projects/#{projectKey}/enableSubmissions").set !submissions


      $scope.$watch 'content.markdown', (newVal, oldVal) ->
        if newVal
          if $scope.actives.unit && $scope.actives.lesson && $scope.actives.project
            FirebaseService.rootRef.child("courses/#{$scope.courseKey}/units/#{$scope.actives.unit}/lessons/#{$scope.actives.lesson}/projects/#{$scope.actives.project}/markdown").set newVal.toString()
#          else if $scope.actives.tagLine
#            FirebaseService.rootRef.child("courses/#{$scope.courseKey}/tagLine/markdown").set newVal.toString()
#          else if $scope.actives.primaryDes
#            FirebaseService.rootRef.child("courses/#{$scope.courseKey}/primaryDescription/markdown").set newVal.toString()
#          else if $scope.actives.secondaryDes
#            FirebaseService.rootRef.child("courses/#{$scope.courseKey}/secondaryDescription/markdown").set newVal.toString()

      $scope.$watch 'content.html', (newVal, oldVal) ->
        if newVal
          if $scope.actives.unit && $scope.actives.lesson && $scope.actives.project
            FirebaseService.rootRef.child("courses/#{$scope.courseKey}/units/#{$scope.actives.unit}/lessons/#{$scope.actives.lesson}/projects/#{$scope.actives.project}/html").set newVal.toString()
#          else if $scope.actives.tagLine
#            FirebaseService.rootRef.child("courses/#{$scope.courseKey}/tagLine/html").set newVal.toString()
#          else if $scope.actives.primaryDes
#            FirebaseService.rootRef.child("courses/#{$scope.courseKey}/primaryDescription/html").set newVal.toString()
#          else if $scope.actives.secondaryDes
#            FirebaseService.rootRef.child("courses/#{$scope.courseKey}/secondaryDescription/html").set newVal.toString()

      $scope.$watch 'courseName', (newVal, oldVal) ->
        if newVal
          unless newVal == oldVal
            FirebaseService.rootRef.child("courses/#{$scope.courseKey}/name").set newVal




      $scope.windowHeight = 0
      $scope.windowHeight = $window.outerHeight + 'px'

      $scope.minHeight = 0

      height1 = angular.element(document.getElementById('write-column'))[0].offsetHeight
      height2 = angular.element(document.getElementById('preview-column'))[0].offsetHeight
      $scope.minHeight = if height1 > height2 then height1 + 'px' else height2 + 'px'

      $scope.content = {}



      $scope.getMarked = ($event) ->
        if $scope.content.markdown
          $scope.content.html = $sce.trustAsHtml(marked($scope.content.markdown, {sanitize: false}))
        else
          $scope.content.html = marked('')


      $scope.setInstallment = (installmentNo, unitKey, currentNum) ->
        if currentNum == installmentNo
          FirebaseService.rootRef.child("courses/#{$scope.courseKey}/units/#{unitKey}/installmentNo").set null
        else
          FirebaseService.rootRef.child("courses/#{$scope.courseKey}/units/#{unitKey}/installmentNo").set installmentNo


      $scope.markWalkThrough = (unitKey, lessonKey, projectKey) ->
        FirebaseService.rootRef.child("courses/#{$scope.courseKey}/units/#{unitKey}/lessons/#{lessonKey}/projects/#{projectKey}/isWalkThrough").set true
        FirebaseService.rootRef.child("courses/#{$scope.courseKey}/units/#{unitKey}/lessons/#{lessonKey}/projects/#{projectKey}/isProject").set null
        FirebaseService.rootRef.child("courses/#{$scope.courseKey}/units/#{unitKey}/lessons/#{lessonKey}/projects/#{projectKey}/isText").set null

      $scope.markProject = (unitKey, lessonKey, projectKey) ->
        FirebaseService.rootRef.child("courses/#{$scope.courseKey}/units/#{unitKey}/lessons/#{lessonKey}/projects/#{projectKey}/isWalkThrough").set null
        FirebaseService.rootRef.child("courses/#{$scope.courseKey}/units/#{unitKey}/lessons/#{lessonKey}/projects/#{projectKey}/isProject").set true
        FirebaseService.rootRef.child("courses/#{$scope.courseKey}/units/#{unitKey}/lessons/#{lessonKey}/projects/#{projectKey}/isText").set null

      $scope.markText = (unitKey, lessonKey, projectKey) ->
        FirebaseService.rootRef.child("courses/#{$scope.courseKey}/units/#{unitKey}/lessons/#{lessonKey}/projects/#{projectKey}/isWalkThrough").set null
        FirebaseService.rootRef.child("courses/#{$scope.courseKey}/units/#{unitKey}/lessons/#{lessonKey}/projects/#{projectKey}/isProject").set null
        FirebaseService.rootRef.child("courses/#{$scope.courseKey}/units/#{unitKey}/lessons/#{lessonKey}/projects/#{projectKey}/isText").set true



#      $scope.editTagLine = () ->
#        $scope.content.markdown = $scope.course?.tagLine?.markdown
#        $scope.content.html = $scope.course?.tagLine?.html
#        $scope.chapterName = {}
#        $scope.actives = {}
#        $scope.actives.tagLine = true
#
#      $scope.editPrimaryDes = () ->
#        $scope.content.markdown = $scope.course?.primaryDescription?.markdown
#        $scope.content.html = $scope.course?.primaryDescription?.html
#        $scope.chapterName = {}
#        $scope.actives = {}
#        $scope.actives.primaryDes = true
#
#      $scope.editSecondaryDes = () ->
#        $scope.content.markdown = $scope.course?.secondaryDescription?.markdown
#        $scope.content.html = $scope.course?.secondaryDescription?.html
#        $scope.chapterName = {}
#        $scope.actives = {}
#        $scope.actives.secondaryDes = true
#
#      $scope.updateDifficulty = (level) ->
#        FirebaseService.rootRef.child("courses/#{$scope.courseKey}/difficultyLevel").set level


  NewCourseController.$inject = ["$scope", "FirebaseService", "$window", "$sce", "$routeParams", "$rootScope", "$timeout"]

  GildersApp.controller 'NewCourseController', NewCourseController

  NewCourseController