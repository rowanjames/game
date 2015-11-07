
define ['app/base', 'fbase'], (AngApp, Firebase) ->


  class FirebaseService

    constructor:() ->
      @rootRef = new Firebase(document.querySelector('.custom-container').getAttribute('data-root-url'))
      @authData = @rootRef.getAuth()


  FirebaseService.$inject = []
  AngApp.service "FirebaseService", FirebaseService