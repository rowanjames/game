
unless document.location.hash == ""
  document.location.href = document.location.href.replace(document.location.hash , "" )

require ['angularjs', 'fbase', 'app/base', 'picker'
         'app/controllers/nav_controller',
         'app/controllers/dashboard_controller',
         'app/controllers/student_controller',
         'app/controllers/mentor_controller',
         'app/controllers/new_course_controller',
         'app/controllers/edit_course_controller',
         'app/controllers/settings_controller',
         'app/services/firebase_service', 'jquery', 'moment', 'flatUi', 
         'vendor/underscore'], (angular ,Firebase, AngApp , filepicker,
                                NavBarController, DashboardController, StudentController, MentorController, 
                                NewCourseController, EditCourseController, SettingsController
                                , FirebaseService ,$, moment, flatUi , _) ->

