
define ['externalApp/base','angularjs', 'fbase'], (AngApp) ->

  class SignupController

    constructor: ($scope, FirebaseService, $timeout, $firebaseArray) ->
      if FirebaseService.authData
        window.location = '/app'
      else

        $scope.user = {}
        $scope.alertInfo = {spinner: false, alert: false}
        $scope.batchesIndex = $firebaseArray(FirebaseService.rootRef.child("batches/index"))
        $scope.notifyEmail = null
        $scope.validBatches = []

        $scope.getLength = (obj) ->
          if obj
            Object.keys(obj).length
          else
            0  

        $scope.batchesIndex.$loaded (x) ->
          if x
            $timeout ->
              $scope.batchesIndexLoaded = true
              angular.forEach $scope.batchesIndex, (v,k) ->
                if $scope.getLength(v.students) < v.studentLimit
                  $scope.validBatches.push $scope.batchesIndex[k]
              $scope.selectedBatch = $scope.validBatches[0]

        $scope.changeBatch = (batch) ->
          $scope.selectedBatch = batch


        $scope.getNotified = (notifyEmail) ->
          if notifyEmail
            FirebaseService.rootRef.child("notifyEmails").push().set {email: notifyEmail}
            $scope.alertInfo = {showNotifyThanks: true}
            $scope.notifyEmail = null



        $scope.createNewUser = (newUserForm) ->
          if newUserForm.$valid
            $scope.alertInfo = {spinner: true, alert: false}
            theEmail = $scope.user.email

            FirebaseService.rootRef.createUser {
              email: theEmail
              password: $scope.user.password
            }, (error, userData) ->
              if error
                console.log error
                switch error.code
                  when 'EMAIL_TAKEN'

                    $scope.$apply ->
                      $scope.alertInfo = {spinner: false, alert: true, alertMsg: "The email is already in use."}

                  when 'INVALID_EMAIL'

                    $scope.$apply ->
                      $scope.alertInfo = {spinner: false, alert: true, alertMsg: "The specified email is not a valid email."}

                  else

                    $scope.$apply ->
                      $scope.alertInfo = {spinner: false, alert: true, alertMsg: "Error: #{error}"}

              else
                usrRef = FirebaseService.rootRef.child("users/#{userData.uid}")
                usrRef.child('basic').set {userType: 'student',authData: userData, firstName: $scope.user.firstName, lastName: $scope.user.lastName, email: theEmail, createdAt: moment().unix()}
                usrRef.child("batches/index").push().set {courseId: $scope.selectedBatch.courseId, mentorId: $scope.selectedBatch.mentorId, batchId: $scope.selectedBatch.$id}
                FirebaseService.rootRef.child("batches/#{$scope.selectedBatch.courseId}/#{$scope.selectedBatch.mentorId}/#{$scope.selectedBatch.$id}/students/#{usrRef.key()}").set {firstName: $scope.user.firstName, lastName: $scope.user.lastName, studentId: usrRef.key()}                
                FirebaseService.rootRef.child("batches/index/#{$scope.selectedBatch.$id}/students/#{usrRef.key()}").set {firstName: $scope.user.firstName, lastName: $scope.user.lastName, studentId: usrRef.key()}                

                usrRef.setPriority theEmail


                FirebaseService.rootRef.authWithPassword {
                  'email': theEmail
                  'password': $scope.user.password
                }, (error, authData) ->
                  if error
                    console.log error
                    $scope.alertInfo = {spinner: false, alert: true, alertMsg: "Your account was created but there was a problem signing in. Please try to sign in again from the sign in page."}

                  else
                    console.log 'Authenticated successfully with payload:', authData
                    FirebaseService.authData = authData
                    window.location = '/app'


  SignupController.$inject = ["$scope", "FirebaseService", "$timeout", "$firebaseArray"]

  AngApp.controller 'SignupController', SignupController

  SignupController