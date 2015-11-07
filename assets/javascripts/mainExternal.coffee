require ['angularjs', 'fbase', 'externalApp/base',
         'externalApp/controllers/signup_controller',
         'externalApp/controllers/signup_mentors_controller',
         'externalApp/controllers/signin_controller',
         'externalApp/controllers/nav_controller',
         'externalApp/controllers/external_controller',
         'externalApp/services/firebase_service', 'jquery', 'picker'
         'flatUi', 'vendor/underscore', 'moment'], (angular, Firebase, GildersApp ,
                                          SignupController, SignupMentorsController,SigninController, NavBarController,ExternalController,
                                           FirebaseService,
                                          $, picker, flatui, _, moment) ->



