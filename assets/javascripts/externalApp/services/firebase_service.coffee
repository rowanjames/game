
define ['externalApp/base'], (AngApp) ->

  class FirebaseService

    constructor:() ->
      @rootRef = new Firebase(document.querySelector('.custom-container').getAttribute('data-root-url'))
      @authData = @rootRef.getAuth()


  AngApp.service "FirebaseService", [FirebaseService]