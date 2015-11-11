define ['externalApp/base','angularjs', 'fbase'], (AngApp) ->

  class ExternalController

    constructor: ($scope, FirebaseService, $window, $timeout, Upload, $sce) ->
      filepicker.setKey('A1LP338CwSuaNoitK6IHVz')
      $scope.showCreatePane = true
      $scope.showPlayPane = false
      $scope.createPaneOne = true
      $scope.zoomable = false
      $scope.createFile = null
      # $scope.scale *= 1.2

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


      $scope.$watch 'createFile', ->
        if $scope.createFile != null
          $scope.upload($scope.createFile)

      $scope.upload = (file) ->
        Upload.upload(
          # url: 'http://localhost:3000/upload'
          url: 'http://mosaiced.nodelabs.in/upload'
          data:
            file: file)
        .progress((evt) ->
          progressPercentage = parseInt(100.0 * evt.loaded / evt.total)
          obj = document.getElementById('progress-attachments')
          obj.style.width = "#{progressPercentage}%"
        ).success (data, status, headers, config) ->
          if data.success
            $timeout ->
              $scope.showDropPane = false
              $scope.showImagePreview = true
              $scope.previewUrl = data.url
              img = new Image()
              img.onload = ->
                $timeout ->
                  $scope.previewUrlHeight = img.height + 'px'
                  $scope.previewUrlWidth = img.width + 'px'
              img.src = $scope.previewUrl


      $scope.removeImagePreview = () ->
        $scope.showDropPane = true 
        $scope.showImagePreview = null
        $scope.previewUrl = null
        $scope.previewUrlHeight = null
        $scope.previewUrlWidth = null
        obj = document.getElementById('progress-attachments')
        obj.style.width = "0%"

            

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
          $scope.showDropPane = true
          # $scope.uploadFile()
        else if str == 2
          if $scope.previewUrl
            $scope.createPaneTwo = false

            $timeout ->
              $scope.createPaneThree = true
              console.log $scope.previewUrl
              console.log $scope.previewUrlHeight
              console.log $scope.previewUrlWidth
              $scope.createImageStyle = {'background-image': "url(#{$scope.previewUrl})", 'background-size': 'contain', 'background-repeat': 'no-repeat', 'width': '100%', 'height': $scope.previewUrlHeight}
            , 500
          else
            alert 'Please choose an image first.'  
        else if str == 3
          $scope.createPaneThree = false
          $scope.createPaneTwo = true


      $scope.previewCanvasClick = (event) ->
        console.log event
        console.log event.offsetX
        console.log event.offsetY
        y = event.offsetY
        x = event.offsetX
        # circle = document.createElement("i")
        # circle.className = 'icon-circle text-primary'
        # circle.style.top = event.offsetY + 'px'  
        # circle.style.right = event.offsetX + 'px'  
        # circle.style.position = 'absolute'
        style = "position:absolute;top:#{y}px;left:#{x}px"
        console.log style

        # circle = angular.element("<i class='icon-circle text-primary', style=#{style}>")
        # wrapper = document.getElementById('previewCanvasWrap')  
        # wrapper = angular.element(document.getElementById('previewCanvasWrap'))  
        # wrapper.append(circle)
        $scope.dotHtml = $sce.trustAsHtml("<i class='icon-circle text-primary' style=#{style} ng-click='yo($event)'>")
        top = y - 20 + 'px'  
        left = x + 40 + 'px'
        $scope.createQuestionBoxStyle = {'top': top, left: left}  

        # ctx = document.getElementById('previewCanvas').getContext("2d")
        # ctx.arc(event.offsetX, event.offsetY, 30, 0, 2*Math.PI)
        # ctx.stroke()


      $scope.yo = (event) ->
        console.log event
        


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
              img = new Image()
              img.onload = ->
                $timeout ->
                  $scope.previewUrlHeight = img.height + 'px'
                  $scope.previewUrlWidth = img.width + 'px'
              img.src = $scope.previewUrl


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





  ExternalController.$inject = ["$scope", "FirebaseService", "$window", "$timeout", "Upload", "$sce"]


  AngApp.controller 'ExternalController', ExternalController

  ExternalController