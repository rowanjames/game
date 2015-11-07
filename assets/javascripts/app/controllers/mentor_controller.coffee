define ['app/base','angularjs', 'fbase'], (AngApp) ->

  class MentorController

    constructor: ($scope, FirebaseService, $window, $timeout, $firebaseObject, $firebaseArray, $rootScope, $sce, $location) ->

      $scope.coursesTab = {}
      $scope.batchesTab = {}
      $scope.layoutTab = {}
      $scope.appointmentsTab = {}
      $scope.paymentsTab = {}
      $scope.guildsTab = {}


      $scope.coursesTab.boot = () ->
        $scope.selectedTab = 'COURSES'
        $scope.coursesTab.activePane = 'Overview'
        $scope.tpl= "javascripts/app/templates/mentor/courses.html"
        # $scope.coursesTab.coursesIndex = $firebaseArray($rootScope.rootRef.child("courses/index"))
        $scope.coursesTab.coursesIndex.$destroy() if $scope.coursesTab.coursesIndex
        $scope.coursesTab.coursesIndex = $firebaseArray($rootScope.currentUserRef.child("courses/index"))
        $scope.coursesTab.coursesIndex.$loaded (x) ->
          if x.length > 0
            $scope.coursesTab.changeCourse($scope.coursesTab.coursesIndex[0])
          $scope.paneHeightNumber = $window.innerHeight - document.querySelector('nav').offsetHeight - document.querySelector('.mentor-dashboard').offsetHeight - document.querySelector('.courses-tab-option-dashboard').offsetHeight
          $scope.paneHeight = $scope.paneHeightNumber + 'px'
          $scope.paneStyle = {'max-height': $scope.paneHeight, 'min-height': $scope.paneHeight}

      $scope.coursesTab.boot()      

      $scope.getFirstKey = (obj) ->
        if obj
          Object.keys(obj)[0]                 

      $scope.coursesTab.changeCourse = (course) ->    
        if course
          $scope.coursesTab.currentCourse.$destroy() if $scope.coursesTab.currentCourse
          $scope.coursesTab.currentCourse = $firebaseObject($rootScope.rootRef.child("courses/#{course.$id}"))
          $scope.coursesTab.currentCourse.$loaded (x) ->
            if x
              firstUnitKey = $scope.getFirstKey(course.units)
              if firstUnitKey
                firstLessonKey = $scope.getFirstKey(course.units[firstUnitKey].lessons)
                if firstLessonKey
                  $scope.coursesTab.lessonKey = firstLessonKey  
                  firstProjectKey = $scope.getFirstKey(course.units[firstUnitKey].lessons[firstLessonKey].projects)
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
        $scope.coursesTab.unitKey = null
        $scope.coursesTab.lessonKey = null
        $scope.coursesTab.projectKey = null
        $scope.coursesTab.unitIndex = null
        $scope.coursesTab.lessonIndex = null
        $scope.coursesTab.projectIndex = null                    



      $scope.coursesTab.addNewCourse = ->
        $rootScope.modalHeader = 'New Course'
        $rootScope.modalContent = $sce.trustAsHtml('Enter a name for your new course: <br><br> <input name="name" type="text" placeholder="Course Name" class="course-name form-control bor"/>')
        $rootScope.modalButtonText = 'Create'
        $rootScope.enableModal = true

        $rootScope.onModalButtonClick = (e) ->
          e.preventDefault()
          $rootScope.enableModal = false
          courseName = document.querySelector('.course-name').value.trim()
          if courseName.length > 0
            ref = $rootScope.rootRef.child('courses').push()
            courseCode = Math.random().toString(36).substring(10).toUpperCase()
            ref.setWithPriority {courseCode: courseCode, name: courseName}, courseName
            ref.child("members/#{$rootScope.currentUid}").set {memberId: $rootScope.currentUid}
            unitRef = ref.child('units').push()
            unitRef.set {name: 'A Unit'}

            lessonRef = unitRef.child('lessons').push()
            lessonRef.set {name: 'A Lesson'}
            projectRef = lessonRef.child("projects").push()
            projectRef.set {name: 'A Project'}

            $rootScope.currentUserRef.child("courses/index/#{ref.key()}").set {courseId: ref.key(), courseName: courseName}
            $rootScope.rootRef.child("courses/index/#{ref.key()}").setWithPriority {courseCode: courseCode, name: courseName}, courseName
            course = {}
            course['$id'] = ref.key()
            $scope.coursesTab.changeCourse(course)


      $scope.coursesTab.deleteCourse = () ->            
        $rootScope.modalHeader = 'Delete Course'
        $rootScope.modalContent = $sce.trustAsHtml('Are you sure?')
        $rootScope.modalButtonText = 'Delete'
        $rootScope.enableModal = true

        $rootScope.onModalButtonClick = (e) ->
          e.preventDefault()
          $scope.coursesTab.currentCourse.$destroy() if $scope.coursesTab.currentCourse           
          $timeout ->          
            $rootScope.rootRef.child("courses/#{$scope.coursesTab.currentCourse.$id}").set null
            $rootScope.rootRef.child("users/#{$rootScope.currentUid}/courses/index/#{$scope.coursesTab.currentCourse.$id}").set null
            $rootScope.rootRef.child("courses/index/#{$scope.coursesTab.currentCourse.$id}").set null
          , 100            
          $rootScope.enableModal = false 
          $scope.coursesTab.boot()



      $scope.batchesTab.boot = () ->
        $scope.coursesTab.coursesIndex = $firebaseArray($rootScope.rootRef.child("courses/index"))
        $scope.batchesTab.coursesIndex.$loaded (x) ->
          if x
            $scope.batchesTab.changeCourse($scope.batchesTab.coursesIndex[0])
            $scope.batchesTab.paneHeightNumber = $window.innerHeight - document.querySelector('nav').offsetHeight - document.querySelector('.mentor-dashboard').offsetHeight - document.querySelector('.batches-tab-option-dashboard').offsetHeight
            $scope.batchesTab.paneHeight = $scope.batchesTab.paneHeightNumber + 'px'
            $scope.batchesTab.paneStyle = {'max-height': $scope.batchesTab.paneHeight, 'min-height': $scope.batchesTab.paneHeight}
            $scope.batchesTab.selectedTab = 'CURRENT BATCHES'
            # $scope.batchesTab.selectedTab = 'NEW BATCH'
            timeNow = moment()
            timeLater = moment().add(3, 'months')
            $scope.batchesTab.newBatchModel = {startDate: timeNow.toDate(), endDate: timeLater.toDate(), studentLimit: 1}
            


      $scope.batchesTab.changeCourse = (course) ->
        console.log course
        $scope.batchesTab.currentBatches.$destroy() if $scope.batchesTab.currentBatches
        $scope.batchesTab.currentCourse.$destroy() if $scope.batchesTab.currentCourse
        $scope.batchesTab.finishedBatches.$destroy() if $scope.batchesTab.finishedBatches

        $scope.batchesTab.currentBatches = $firebaseArray($rootScope.rootRef.child("batches/#{course.$id}/#{$rootScope.currentUid}").startAt('CURRENT').endAt('CURRENT'))
        $scope.batchesTab.finishedBatches = $firebaseArray($rootScope.rootRef.child("batches/#{course.$id}/#{$rootScope.currentUid}").startAt('FINISHED').endAt('FINISHED'))
        $scope.batchesTab.currentCourse = $firebaseObject($rootScope.rootRef.child("courses/#{course.$id}"))
        # $scope.batchesTab.currentBatches.$loaded (x) ->
          # if x
            # console.log $scope.batchesTab.currentBatches


      $scope.batchesTab.createBatch = (startDate, endDate, newBatchForm) ->
        if newBatchForm.$valid
          $scope.showNewBatchFormSpinner = true
          batchRef = $rootScope.rootRef.child("batches/#{$scope.batchesTab.currentCourse.$id}/#{$rootScope.currentUid}").push()
          batchCode = Math.random().toString(36).substring(10).toUpperCase()
          $rootScope.currentUserRef.child("batches/index").push().set {batchCode: batchCode, courseId: $scope.batchesTab.currentCourse.$id, mentorId: $rootScope.currentUid, batchId: batchRef.key()}
          batchRef.setWithPriority {batchCode: batchCode, status: 'NEW', mentorId: $rootScope.currentUid , mentorName: "#{$rootScope.userBasic.firstName} #{$rootScope.userBasic.lastName}", courseId: $scope.batchesTab.currentCourse.$id, courseName: $scope.batchesTab.currentCourse.name, startDate: new moment($scope.batchesTab.newBatchModel.startDate).format('MMMM Do YYYY'), endDate: new moment($scope.batchesTab.newBatchModel.endDate).format('MMMM Do YYYY'), studentLimit: $scope.batchesTab.newBatchModel.studentLimit}, 'CURRENT', ->
            $timeout ->
              $scope.showNewBatchFormSpinner = false
              $scope.batchesTab.selectedTab = 'CURRENT BATCHES'

      $scope.batchesTab.changeStatus = (batch, status) ->
        console.log batch               
        console.log status
        if status == batch.status
          $rootScope.rootRef.child("batches/#{batch.courseId}/#{batch.mentorId}/#{batch.$id}/status").set 'NEW'
        else
          $rootScope.rootRef.child("batches/#{batch.courseId}/#{batch.mentorId}/#{batch.$id}/status").set status

        if status == 'COMPLETED'
          $rootScope.rootRef.child("batches/#{batch.courseId}/#{batch.mentorId}/#{batch.$id}").setPriority status

        if status == 'OPEN'
          batchObj = JSON.parse(angular.toJson(batch))
          delete batchObj.$id
          delete batchObj.$priority
          $rootScope.rootRef.child("batches/index/#{batch.$id}").set batchObj
        else
          $rootScope.rootRef.child("batches/index/#{batch.$id}").set null          


      $scope.layoutTab.boot = () ->
        $scope.layoutTab.batchesIndex = $firebaseArray($rootScope.rootRef.child("batches/index"))
        $scope.layoutTab.batchesIndex.$loaded (x) ->
          $scope.layoutTab.currentBatch = $scope.layoutTab.batchesIndex[0]


      $scope.guildsTab.boot = () ->
        $scope.guildsTab.guildsIndex = $firebaseArray($rootScope.rootRef.child("guilds/index"))
        $scope.guildsTab.activePane = 'Overview'
        $scope.guildsTab.guildsIndex.$loaded (x) ->
          console.log x
          $scope.guildsTab.currentGuild = $scope.guildsTab.guildsIndex[0]          
          console.log $scope.guildsTab.currentGuild


      $scope.guildsTab.createGuild = () ->
        $rootScope.modalHeader = 'New Guild'
        $rootScope.modalContent = $sce.trustAsHtml('Enter a name for your new guild: <br><br> <input name="name" type="text" placeholder="The Ruby Ninjas" class="guild-name form-control bor"/>')
        $rootScope.modalButtonText = 'Create'
        $rootScope.enableModal = true

        $rootScope.onModalButtonClick = (e) ->
          e.preventDefault()
          $rootScope.enableModal = false
          guildName = document.querySelector('.guild-name').value.trim()
          if guildName.length > 0
            ref = $rootScope.rootRef.child('guilds').push()
            guildCode = Math.random().toString(36).substring(10).toUpperCase()
            ref.setWithPriority {guildCode: guildCode, name: guildName}, guildName
            ref.child("members/#{$rootScope.currentUid}").set {memberId: $rootScope.currentUid, role: 'OWNER'}
            

            $rootScope.currentUserRef.child("guilds/index/#{ref.key()}").set {guildId: ref.key(), guildName: guildName}
            $rootScope.rootRef.child("guilds/index/#{ref.key()}").setWithPriority {guildCode: guildCode, guildName: guildName}, guildName
            guild = {}
            guild['$id'] = ref.key()
            $scope.guildsTab.changeGuild(guild)          

      $scope.guildsTab.changeGuild = (guild) ->
        $scope.guildsTab.currentGuild.$destroy() if $scope.guildsTab.currentGuild
        $scope.guildsTab.currentGuild = $firebaseObject($rootScope.rootRef.child("guilds/#{guild.$id}"))



            

      $timeout ->
        $scope.tpl = 'javascripts/app/templates/mentor/guilds.html'
        $scope.guildsTab.boot()
        $scope.selectedTab = 'GUILDS'
      , 100






  MentorController.$inject = ["$scope", "FirebaseService", "$window", "$timeout", "$firebaseObject", "$firebaseArray", "$rootScope", "$sce", "$location"]

  AngApp.controller 'MentorController', MentorController

  MentorController