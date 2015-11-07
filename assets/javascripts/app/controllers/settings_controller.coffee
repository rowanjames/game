define ['app/base','angularjs', 'fbase'], (MailerApp) ->

  class SettingsController

    constructor: ($scope, FirebaseService, $rootScope) ->
      $scope.minHeight = 0

      height1 = angular.element(document.getElementById('options-panel'))[0].offsetHeight
      height2 = angular.element(document.getElementById('details-panel'))[0].offsetHeight
      $scope.minHeight = if height1 > height2 then height1 + 'px' else height2 + 'px'

      $scope.activeTabs = {profile: true, settings: false, headerTxt: "Profile"}


      $rootScope.$watch 'userBasic', (newVal, oldVal) ->
        if $rootScope.userBasic
          $scope.user = {firstName: $rootScope.userBasic.firstName, lastName: $rootScope.userBasic.lastName, profile: $rootScope.userBasic.profile}



      $scope.profileBox = ($event) ->
        $event.preventDefault()
        $scope.activeTabs = {profile: true, settings: false, headerTxt: "Profile"}


      $scope.settingsBox = ($event) ->
        $event.preventDefault()
        $scope.activeTabs = {profile: false, settings: true, headerTxt: "Account Settings"}


      $scope.updateProfile = (theForm) ->
        if theForm.$valid
          $scope.savingProfile = true
          $rootScope.currentUserRef.child('basic/firstName').set $scope.user.firstName
          $rootScope.currentUserRef.child('basic/lastName').set $scope.user.lastName, () ->
            $scope.$apply ->
              $scope.savingProfile = false
          ($rootScope.currentUserRef.child('basic/profile').set $scope.user.profile) if $scope.user.profile



      $scope.alertInfo = {}

      $scope.getObjLength = (obj) ->
        if obj
          Object.keys(obj).length
        else
          0

      $scope.updatePassword = (pwdForm) ->
        if pwdForm.$valid
          $scope.alertInfo = {spinner: true, alert: false, alertMsg: ''}

          $rootScope.rootRef.changePassword {
            email: $rootScope.userBasic.email
            oldPassword: $scope.user.oldPassword
            newPassword: $scope.user.newPassword
          }, (error) ->
            if error
              switch error.code
                when 'INVALID_PASSWORD'
                  $scope.$apply ->
                    $scope.alertInfo = {spinner: false, alert: true, alertMsg: 'The specified password is incorrect.'}
                when 'INVALID_USER'
                  $scope.$apply ->
                    $scope.alertInfo = {spinner: false, alert: true, alertMsg: 'The specified user account does not exist.'}
                else
                  $scope.$apply ->
                    $scope.alertInfo = {spinner: false, alert: true, alertMsg: "Error changing password: #{error}"}
            else
              $scope.$apply ->
                $scope.alertInfo = {spinner: false, alert: true, alertMsg: 'User password changed successfully!'}
            return


      $scope.delAcc = (delAccForm) ->
        if delAccForm.$valid
          $scope.alertDel = {spinner: true, alert: false, alertMsg: ''}

          console.log $rootScope.userBasic.email
          console.log $scope.user.currentPwd

          $scope.delAccMsg = true
          $scope.delAlert = false
          $scope.delMsg = null

          $rootScope.rootRef.removeUser {
            email: $rootScope.userBasic.email
            password: $scope.user.currentPwd
          }, (error) ->
            console.log error
            if error
                $scope.$apply ->
                  $scope.delAlert = true
                  $scope.delMsg = error.code
                  $scope.delAccMsg = false
            else
              $scope.$apply ->
                $scope.delAccMsg = false
                $scope.delAlert = false
                $scope.delMsg = null
              $rootScope.currentUserRef.set null
              $rootScope.child("secondaryIndexes/users/#{$rootScope.currentUserRef.key()}").set null
              window.location.reload()






  SettingsController.$inject = ["$scope", "FirebaseService", "$rootScope"]

  MailerApp.controller 'SettingsController', SettingsController

  SettingsController