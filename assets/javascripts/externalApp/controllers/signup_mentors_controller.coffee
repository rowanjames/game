define ['externalApp/base','angularjs', 'fbase'], (AngApp) ->

  class SignupMentorsController

    constructor: ($scope, FirebaseService) ->
      if FirebaseService.authData
        window.location = '/app'
      else
        $scope.user = {}
        $scope.alertInfo = {spinner: false, alert: false}


        $scope.createNewUser = (newUserForm) ->
          if newUserForm.$valid
            $scope.alertInfo = {spinner: true, alert: false}


            FirebaseService.rootRef.createUser {
              email: $scope.user.email
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
                usrRef.child('basic').set {userType: 'mentor',firstName: $scope.user.firstName, lastName: $scope.user.lastName, email: $scope.user.email, createdAt: moment().unix()}
                usrRef.setPriority $scope.user.email


                FirebaseService.rootRef.authWithPassword {
                  'email': $scope.user.email
                  'password': $scope.user.password
                }, (error, authData) ->
                  if error
                    console.log error
                    $scope.alertInfo = {spinner: false, alert: true, alertMsg: "Your account was created but there was a problem signing in. Please try to sign in again from the sign in page."}

                  else
                    console.log 'Authenticated successfully with payload:', authData
                    FirebaseService.authData = authData
                    window.location = '/app'




  SignupMentorsController.$inject = ["$scope", "FirebaseService"]

  AngApp.controller 'SignupMentorsController', SignupMentorsController

  SignupMentorsController