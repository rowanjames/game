define ['externalApp/base','angularjs', 'fbase'], (AngApp) ->

  class ExternalController

    constructor: ($scope, FirebaseService, $window, $timeout) ->
      filepicker.setKey('A1LP338CwSuaNoitK6IHVz')
      $scope.showCreatePane = true
      $scope.showPlayPane = false
      $scope.createPaneOne = true

      $scope.resetHeights = () ->
        $scope.paneHeightNumber = $window.innerHeight - document.querySelector('.top-bar-menu').offsetHeight
        $scope.paneHeight = $scope.paneHeightNumber + 'px'
        stepHeight = ($scope.paneHeightNumber/2) - 40 + 'px'
        $scope.stepStyle = {'max-height': stepHeight, 'min-height': stepHeight, overflow: 'scroll'}
        $scope.appStyle = {'max-height': $window.innerHeight+'px', 'min-height': $window.innerHeight+'px', overflow: 'scroll'}
        $scope.paneStyle = {'max-height': $scope.paneHeight, 'min-height': $scope.paneHeight, overflow: 'scroll'}

      console.log $scope.paneHeightNumber
      console.log $scope.paneHeight
      $scope.resetHeights()

      $scope.togglePane = (str) ->
      	if str == 'Create'
      		$scope.showPlayPane = false
      		$timeout ->
      			$scope.showCreatePane = true
      		, 500	
      	else if str == 'Play'
      		$scope.showCreatePane = false
      		$timeout ->
      			$scope.showPlayPane = true
      		, 500		

      $scope.toggleCreatePane = (str) ->
        if str == 1
          $scope.createPaneOne = false
          $timeout ->
            $scope.createPaneTwo = true
          , 500 
          $scope.uploadFile()
        else if str == 2
          $scope.createPaneTwo = false
          $timeout ->
            $scope.createPaneOne = true
          , 500


      $scope.uploadFile = () ->    
        $scope.showDropPane = true
        filepicker.makeDropPane document.getElementById('drop-pane'),
          multiple: false
          dragEnter: ->
            obj = document.getElementById('drop-pane')
            obj.style.backgroundColor = '#eee'
          dragLeave: ->
            obj = document.getElementById('drop-pane')
            obj.style.backgroundColor = '#fff'
          onSuccess: (Blobs) ->
            console.log JSON.stringify(Blobs)

            # obj = document.getElementById('progress-attachments')
            # obj.style.width = "0%"
            # finalBlobs = []
            # for blob in Blobs
              # delete blob.key
              # finalBlobs.push blob
            console.log Blobs
            $timeout ->
              $scope.showDropPane = false
              $scope.showImagePreview = true
              $scope.previewUrl = Blobs[0].url
              $timeout ->
                $scope.resetHeights()
              , 1000  


          onStart: (files) ->
            console.log files

          onError: (type, message) ->
            alert 'There was an error in uploading your file!'
            obj = document.getElementById('drop-pane-reply')
            obj.style.backgroundColor = '#fff'

          onProgress: (percentage) ->
            document.getElementById('drop-pane').style.backgroundColor = '#fff'
            obj = document.getElementById('progress-attachments')
            obj.style.width = "#{percentage}%"





  ExternalController.$inject = ["$scope", "FirebaseService", "$window", "$timeout"]


  AngApp.controller 'ExternalController', ExternalController

  ExternalController