define ['externalApp/base','angularjs', 'fbase'], (AngApp) ->

  AngApp.directive 'compile', [
    '$compile'
    ($compile) ->
      (scope, element, attrs) ->
        scope.$watch ((scope) ->
          # watch the 'compile' expression for changes
          scope.$eval attrs.compile
        ), (value) ->
          # when the 'compile' expression changes
          # assign it into the current DOM
          element.html value
          # compile the new DOM and link it to the current
          # scope.
          # NOTE: we only compile .childNodes so that
          # we don't get into infinite loop compiling ourselves
          $compile(element.contents()) scope
          return
        return
  ]

  class ExternalController

    constructor: ($scope, FirebaseService, $window, $timeout, Upload, $sce, $compile, $firebaseArray, $firebaseObject, $interval) ->
      filepicker.setKey('A1LP338CwSuaNoitK6IHVz')
      $scope.zoomable = false
      $scope.createFile = null
      $scope.dotHtml = ''
      $scope.gamesIndex = $firebaseArray(FirebaseService.rootRef.child('indexes/categories'))
      $scope.createGameRef = FirebaseService.rootRef.child('games').push()
      $scope.stepStates = {stepOne: true, stepTwo: false, stepThree: false}
      $scope._ = _

      # ref1 = FirebaseService.rootRef.child("indexes/categories").push()
      # ref2 = FirebaseService.rootRef.child("indexes/categories").push()
      # ref1.set {name: 'Category 1'}
      # ref2.set {name: 'Category 2'}
      # FirebaseService.rootRef.child("categories/#{ref1.key()}").set {name: 'Category 1'}
      # FirebaseService.rootRef.child("categories/#{ref2.key()}").set {name: 'Category 2'}



      $scope.resetHeights = () ->
        $scope.paneHeightNumber = $window.innerHeight - document.querySelector('.top-bar-menu').offsetHeight
        $scope.paneHeight = $scope.paneHeightNumber + 'px'
        stepHeight = ($scope.paneHeightNumber/2) - 40 + 'px'
        $scope.stepStyle = {'max-height': stepHeight, 'min-height': stepHeight, overflow: 'scroll'}
        $scope.appStyle = {'max-height': $window.innerHeight+'px', 'min-height': $window.innerHeight+'px', overflow: 'scroll'}
        $scope.paneStyle = {'max-height': $scope.paneHeight, 'min-height': $scope.paneHeight, overflow: 'scroll'}

      $scope.resetHeights()


      $scope.$watch 'createFile', ->
        if $scope.createFile != null
          $scope.upload($scope.createFile)

      $scope.upload = (file) ->
        Upload.upload(
          # url: 'http://localhost:3000/upload'
          # url: 'http://mosaiced.nodelabs.in/upload'
          url: 'http://128.199.235.191/upload'
          # url: 'http://271f9c29.ngrok.io/upload'
          data:
            file: file)
        .progress((evt) ->
          progressPercentage = parseInt(100.0 * evt.loaded / evt.total)
          $scope.progressStyle = {'width': "#{progressPercentage}%"}
        ).success (data, status, headers, config) ->
          if data.success
            $timeout ->
              $scope.createGameRef.child('image').set data.url
              $scope.previewUrl = data.url

      
      $scope.removeImagePreview = () ->
        $scope.previewUrl = null
        
        $scope.progressStyle = {'width': '0%'}
        $scope.createGameRef.child('image').set null
        return true

      $scope.togglePane = (pane) ->
        if pane == 'Create'
          $scope.showPlayPane = false
          $scope.showCreatePane = true

          $scope.activeCreatePane = 'start'
        else if pane == 'Play'
          $scope.showPlayPane = true
          $scope.showCreatePane = false

          $scope.playGameOptions = true
          $scope.playGameScreen = false
          
      $scope.togglePane('Play')    

      $scope.nextCreatePane = (pane) ->
        if pane == 'start'
          if $scope.createGameName and $scope.activeCreateCategory
            FirebaseService.rootRef.child("indexes/categories/#{$scope.activeCreateCategory.$id}/games/#{$scope.createGameRef.key()}").set {name: $scope.createGameName, live: false}

            $scope.stepStates.stepTwo = true
            $scope.activeCreatePane = 'upload'
            $scope.createGameDots = $firebaseArray($scope.createGameRef.child('dots'))
            $scope.createGameSync = $firebaseObject($scope.createGameRef)
        else if pane == 'upload'
          if $scope.previewUrl
            $scope.activeCreatePane = 'mark'
            # $scope.createImageStyle = {'background-image': "url(#{$scope.previewUrl})", 'background-size': 'contain', 'background-repeat': 'no-repeat', 'width': '100%', 'height': $scope.previewUrlHeight}
          else
            alert 'Please choose an image first.'  
        else if pane == 'mark'
          if $scope.createGameDots.length > 0
            $scope.stepStates.stepThree = true
            $scope.activeCreatePane = 'settings'
          else
            alert 'Please add atleast 1 question.'  
              
        

      $scope.prevCreatePane = (pane) ->   
        if pane == 'upload'
          $scope.stepStates = {stepOne: true, stepTwo: false, stepThree: false}
          $scope.activeCreatePane = 'start'
        else if pane == 'mark'
          $scope.activeCreatePane = 'upload'
        else if pane == 'settings'
          $scope.stepStates = {stepOne: true, stepTwo: true, stepThree: false}
          $scope.activeCreatePane = 'mark'       

            


      $scope.previewCanvasClick = (event) ->
        
        y = event.offsetY
        x = event.offsetX
        $scope.createGameQuestion = null
        
        
        top = y - 20 + 'px'  
        left = x + 40 + 'px'
        $scope.createQuestionBoxStyle = {'top': top, left: left}  
        
        ref = $scope.createGameRef.child('dots').push()
        ref.set {x: x, y: y}
        $scope.createGameActiveDotId = ref.key()


      $scope.changeDot = (dot) ->
        $scope.createGameQuestion = null
        $scope.createGameActiveDotId = dot.$id
        $scope.createGameQuestion = dot.question
        y = dot.y
        x = dot.x
        top = y - 20 + 'px'  
        left = x + 40 + 'px'
        $scope.createQuestionBoxStyle = {'top': top, left: left}  

      $scope.addQuestion = ()  ->
        $scope.createGameRef.child("dots/#{$scope.createGameActiveDotId}/question").set $scope.createGameQuestion
        $scope.createQuestionBoxStyle = null


      $scope.removeQuestion = () ->
        $scope.createGameRef.child("dots/#{$scope.createGameActiveDotId}").set null 
        $scope.createGameQuestion = null
        $scope.createQuestionBoxStyle = null


      $scope.setCreateOptions = (option,val, text)  ->
        $scope.createGameRef.child("settings/#{option}").set {val: val, text: text}

      $scope.finishCreate = () ->
        if $scope.createGameSync.settings
          if $scope.createGameSync.settings.chances
            if $scope.createGameSync.settings.timer
              FirebaseService.rootRef.child("indexes/categories/#{$scope.activeCreateCategory.$id}/games/#{$scope.createGameRef.key()}/live").set true
              $scope.togglePane('Play')
              $scope.activeCreatePane = 'start'
              $scope.createGameName = null
              $scope.activeCreateCategory = null
              $scope.createGameRef = FirebaseService.rootRef.child('games').push()
              $scope.createQuestionBoxStyle = null
            else
              alert 'Please complete the settings'    
          else
            alert 'Please complete the settings'      
        else
          alert 'Please complete the settings'  


      $scope.changeCreateCategory = (category) ->
        $scope.activeCreateCategory = category

      $scope.changePlayCategory = (category) ->
        $scope.activePlayCategory = category

      $scope.changePlayGame = (game, gameId) ->
        $scope.activePlayGame = game
        $scope.activePlayGameId = gameId

      $scope.triggerGameScreen = () ->
        if $scope.activePlayCategory and $scope.activePlayGame
          $scope.playGameOptions = false
          $scope.playGameScreen = true
          $scope.playGameRef = FirebaseService.rootRef.child("games/#{$scope.activePlayGameId}")
          $scope.playGameSync = $firebaseObject($scope.playGameRef)

          # $scope.scoresRef = FirebaseService.rootRef.child("scores/#{$scope.activePlayGameId}").push()
          $scope.miliCounter = 0
          $scope.secCounter = 0
          $scope.minCounter = 0

          $scope.playGameSync.$loaded (x) ->
            if x
              $timeout ->
                questions = []
                $scope.guessesLeft = Object.keys($scope.playGameSync.dots).length
                angular.forEach $scope.playGameSync.dots, (val,key) ->
                  questions.push {key: key, val: val}

                $scope.questionsArray = questions
                $scope.questionsArrayLength = questions.length
                $scope.answersArray = []
                $scope.correctScore = 0
                $scope.wrongScore = 0
                $scope.answerPercent = 0



      $scope.triggerGameOptions = () ->
        $scope.playGameOptions = true
        $scope.playGameScreen = false
        $scope.playGameRef = null
        $scope.playGameSync.$destroy() if $scope.playGameSync


      $scope.bootGame = () ->
        $scope.gameOn = true
        
        

        $scope.miliPromise = $interval ->
          if $scope.miliCounter == 9
            $scope.miliCounter = 0
          else  
            $scope.miliCounter = $scope.miliCounter + 1    
        , 100  
        $scope.secPromise = $interval ->
          if $scope.secCounter == 59
            $scope.secCounter = 0
          else  
            $scope.secCounter = $scope.secCounter + 1

          $scope.evalTimerSettings()  
        , 1000
        $scope.minPromise = $interval ->
          $scope.minCounter = $scope.minCounter + 1
        , 60000   

      $scope.disableModal = () ->
        $scope.enableModal = false
          

      $scope.evalTimerSettings = () ->
        theVal = parseInt($scope.playGameSync.settings.timer.val)/1000
        currentSeconds = $scope.minCounter*60 + $scope.secCounter
        if theVal == currentSeconds
          $interval.cancel($scope.miliPromise)
          $interval.cancel($scope.secPromise)
          $interval.cancel($scope.minPromise)
          $scope.uniqueCode = Math.random().toString(36).slice(2).toUpperCase()
          $scope.enableModal = true



      $scope.evalDot = (dot, dotId) ->
        unless _.contains($scope.answersArray, dotId)
          if dotId == $scope.questionsArray[0].key
            $scope.correctScore = $scope.correctScore + 1
            $scope.guessesLeft = $scope.guessesLeft - 1
            $scope.questionsArray.splice(0, 1)
            $scope.answersArray.push dotId
          else
            $scope.wrongScore = $scope.wrongScore + 1
          $scope.answerPercent = (($scope.correctScore/($scope.correctScore+$scope.wrongScore))*100).toFixed(2)

          if $scope.questionsArray.length == 0
            $interval.cancel($scope.miliPromise)
            $interval.cancel($scope.secPromise)
            $interval.cancel($scope.minPromise)
            $scope.uniqueCode = Math.random().toString(36).slice(2).toUpperCase()
            $scope.enableModal = true

        $scope.evalChanceSettings()
            

      $scope.evalChanceSettings = () ->
        if $scope.playGameSync.settings.chances.val == 'asMany'
          if $scope.questionsArrayLength == $scope.correctScore + $scope.wrongScore
            $interval.cancel($scope.miliPromise)
            $interval.cancel($scope.secPromise)
            $interval.cancel($scope.minPromise)
            $scope.uniqueCode = Math.random().toString(36).slice(2).toUpperCase()
            $scope.enableModal = true
              
        else if $scope.playGameSync.settings.chances.val == 'firstWrong'
          if $scope.wrongScore == 1
            $interval.cancel($scope.miliPromise)
            $interval.cancel($scope.secPromise)
            $interval.cancel($scope.minPromise)
            $scope.uniqueCode = Math.random().toString(36).slice(2).toUpperCase()
            $scope.enableModal = true
        else if $scope.playGameSync.settings.chances.val == 'secondWrong'    
          if $scope.wrongScore == 2
            $interval.cancel($scope.miliPromise)
            $interval.cancel($scope.secPromise)
            $interval.cancel($scope.minPromise)
            $scope.uniqueCode = Math.random().toString(36).slice(2).toUpperCase()
            $scope.enableModal = true
        else if $scope.playGameSync.settings.chances.val == 'thirdWrong'    
          if $scope.wrongScore == 3
            $interval.cancel($scope.miliPromise)
            $interval.cancel($scope.secPromise)
            $interval.cancel($scope.minPromise)
            $scope.uniqueCode = Math.random().toString(36).slice(2).toUpperCase()
            $scope.enableModal = true  

              






      $scope.submitScore = (scoreFirstName, scoreLastName) ->
        if scoreFirstName and scoreLastName
          # totalTime = $scope.miliCounter*100 + $scope.secCounter*1000 + $scope.minCounter*60*1000
          totalTime = Math.floor(Math.random() * 600) + 1  
          FirebaseService.rootRef.child("scores/#{$scope.activePlayGameId}").push().set {uniqueCode: $scope.uniqueCode, totalTime: totalTime, firstName: scoreFirstName, lastName: scoreLastName, correct: $scope.correctScore, wrong: $scope.correctScore, answerPercent: $scope.answerPercent}
          if $scope.wrongScore == 0
            FirebaseService.rootRef.child("topScores/#{$scope.activePlayGameId}").push().set {uniqueCode: $scope.uniqueCode, totalTime: totalTime, firstName: scoreFirstName, lastName: scoreLastName, correct: $scope.correctScore, wrong: $scope.correctScore, answerPercent: $scope.answerPercent}

          $scope.showScores = true 
          $scope.currentHighScores = $firebaseArray(FirebaseService.rootRef.child("topScores/#{$scope.activePlayGameId}").orderByChild('totalTime').limitToFirst(10)) 



      $scope.playAgain = () ->
        $scope.gameOn = false
        $scope.enableModal = false
        $scope.triggerGameScreen()



      $scope.gameMenu = () ->
        $scope.gameOn = false
        $scope.enableModal = false
        $scope.triggerGameOptions()



          
          
         
          
        
          
        


      # $scope.uploadFile = () ->    
      #   $scope.showDropPane = true
      #   filepicker.makeDropPane document.getElementById('drop-pane'),
      #     multiple: false
      #     dragEnter: ->
      #       obj = document.getElementById('drop-pane')
      #       obj.style.backgroundColor = '#eee'
      #     dragLeave: ->
      #       obj = document.getElementById('drop-pane')
      #       obj.style.backgroundColor = '#fff'
      #     onSuccess: (Blobs) ->
      #       console.log JSON.stringify(Blobs)

      #       # obj = document.getElementById('progress-attachments')
      #       # obj.style.width = "0%"
      #       # finalBlobs = []
      #       # for blob in Blobs
      #         # delete blob.key
      #         # finalBlobs.push blob
      #       console.log Blobs
      #       $timeout ->
      #         $scope.showDropPane = false
      #         $scope.showImagePreview = true
      #         $scope.previewUrl = Blobs[0].url
      #         img = new Image()
      #         img.onload = ->
      #           $timeout ->
      #             $scope.previewUrlHeight = img.height + 'px'
      #             $scope.previewUrlWidth = img.width + 'px'
      #         img.src = $scope.previewUrl


      #         $timeout ->
      #           $scope.resetHeights()
      #         , 1000  


      #     onStart: (files) ->
      #       console.log files

      #     onError: (type, message) ->
      #       alert 'There was an error in uploading your file!'
      #       obj = document.getElementById('drop-pane-reply')
      #       obj.style.backgroundColor = '#fff'

      #     onProgress: (percentage) ->
      #       document.getElementById('drop-pane').style.backgroundColor = '#fff'
      #       obj = document.getElementById('progress-attachments')
      #       obj.style.width = "#{percentage}%"





  ExternalController.$inject = ["$scope", "FirebaseService", "$window", "$timeout", "Upload", "$sce", "$compile", "$firebaseArray", "$firebaseObject", "$interval"]


  AngApp.controller 'ExternalController', ExternalController

  ExternalController