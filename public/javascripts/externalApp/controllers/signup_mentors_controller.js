define(['externalApp/base', 'angularjs', 'fbase'], function(AngApp) {
  var SignupMentorsController;
  SignupMentorsController = (function() {
    function SignupMentorsController($scope, FirebaseService) {
      if (FirebaseService.authData) {
        window.location = '/app';
      } else {
        $scope.user = {};
        $scope.alertInfo = {
          spinner: false,
          alert: false
        };
        $scope.createNewUser = function(newUserForm) {
          if (newUserForm.$valid) {
            $scope.alertInfo = {
              spinner: true,
              alert: false
            };
            return FirebaseService.rootRef.createUser({
              email: $scope.user.email,
              password: $scope.user.password
            }, function(error, userData) {
              var usrRef;
              if (error) {
                console.log(error);
                switch (error.code) {
                  case 'EMAIL_TAKEN':
                    return $scope.$apply(function() {
                      return $scope.alertInfo = {
                        spinner: false,
                        alert: true,
                        alertMsg: "The email is already in use."
                      };
                    });
                  case 'INVALID_EMAIL':
                    return $scope.$apply(function() {
                      return $scope.alertInfo = {
                        spinner: false,
                        alert: true,
                        alertMsg: "The specified email is not a valid email."
                      };
                    });
                  default:
                    return $scope.$apply(function() {
                      return $scope.alertInfo = {
                        spinner: false,
                        alert: true,
                        alertMsg: "Error: " + error
                      };
                    });
                }
              } else {
                usrRef = FirebaseService.rootRef.child("users/" + userData.uid);
                usrRef.child('basic').set({
                  userType: 'mentor',
                  firstName: $scope.user.firstName,
                  lastName: $scope.user.lastName,
                  email: $scope.user.email,
                  createdAt: moment().unix()
                });
                usrRef.setPriority($scope.user.email);
                return FirebaseService.rootRef.authWithPassword({
                  'email': $scope.user.email,
                  'password': $scope.user.password
                }, function(error, authData) {
                  if (error) {
                    console.log(error);
                    return $scope.alertInfo = {
                      spinner: false,
                      alert: true,
                      alertMsg: "Your account was created but there was a problem signing in. Please try to sign in again from the sign in page."
                    };
                  } else {
                    console.log('Authenticated successfully with payload:', authData);
                    FirebaseService.authData = authData;
                    return window.location = '/app';
                  }
                });
              }
            });
          }
        };
      }
    }

    return SignupMentorsController;

  })();
  SignupMentorsController.$inject = ["$scope", "FirebaseService"];
  AngApp.controller('SignupMentorsController', SignupMentorsController);
  return SignupMentorsController;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL1VzZXJzL2tyaXNobmFyb2toYWxlL2NvZGUvbGV2ZWwvbGV2ZWwvcHJvamVjdHMvbW9zYWljZWQvcHVibGljL2phdmFzY3JpcHRzL2V4dGVybmFsQXBwL2NvbnRyb2xsZXJzL3NpZ251cF9tZW50b3JzX2NvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIvVXNlcnMva3Jpc2huYXJva2hhbGUvY29kZS9sZXZlbC9sZXZlbC9wcm9qZWN0cy9tb3NhaWNlZC9hc3NldHMvamF2YXNjcmlwdHMvZXh0ZXJuYWxBcHAvY29udHJvbGxlcnMvc2lnbnVwX21lbnRvcnNfY29udHJvbGxlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBQSxDQUFPLENBQUUsa0JBQUYsRUFBcUIsV0FBckIsRUFBa0MsT0FBbEMsQ0FBUCxFQUFrRCxTQUFDLE1BQUQsR0FBQTtBQUVoRCxNQUFBLHVCQUFBO0FBQUEsRUFBTTtBQUVTLElBQUEsaUNBQUMsTUFBRCxFQUFTLGVBQVQsR0FBQTtBQUNYLE1BQUEsSUFBRyxlQUFlLENBQUMsUUFBbkI7QUFDRSxRQUFBLE1BQU0sQ0FBQyxRQUFQLEdBQW1CLE1BQW5CLENBREY7T0FBQSxNQUFBO0FBR0UsUUFBQSxNQUFNLENBQUMsSUFBUCxHQUFjLEVBQWQsQ0FBQTtBQUFBLFFBQ0EsTUFBTSxDQUFDLFNBQVAsR0FBbUI7QUFBQSxVQUFDLE9BQUEsRUFBUyxLQUFWO0FBQUEsVUFBaUIsS0FBQSxFQUFPLEtBQXhCO1NBRG5CLENBQUE7QUFBQSxRQUlBLE1BQU0sQ0FBQyxhQUFQLEdBQXVCLFNBQUMsV0FBRCxHQUFBO0FBQ3JCLFVBQUEsSUFBRyxXQUFXLENBQUMsTUFBZjtBQUNFLFlBQUEsTUFBTSxDQUFDLFNBQVAsR0FBbUI7QUFBQSxjQUFDLE9BQUEsRUFBUyxJQUFWO0FBQUEsY0FBZ0IsS0FBQSxFQUFPLEtBQXZCO2FBQW5CLENBQUE7bUJBR0EsZUFBZSxDQUFDLE9BQU8sQ0FBQyxVQUF4QixDQUFt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O1lBQUEsQ0FISCxFQUpGO1dBRHFCO1FBQUEsQ0FKdkIsQ0FIRjtPQURXO0lBQUEsQ0FBYjs7bUNBQUE7O01BRkYsQ0FBQTtBQUFBLEVBNERBLHVCQUF1QixDQUFDLE9BQXhCLEdBQWtDLENBQUUsUUFBRixFQUFZLGlCQUFaLENBNURsQyxDQUFBO0FBQUEsRUE4REEsTUFBTSxDQUFDLFVBQVAsQ0FBbUIseUJBQW5CLEVBQTZDLHVCQUE3QyxDQTlEQSxDQUFBO1NBZ0VBLHdCQWxFZ0Q7QUFBQSxDQUFsRCxDQUFBLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJkZWZpbmUgWydleHRlcm5hbEFwcC9iYXNlJywnYW5ndWxhcmpzJywgJ2ZiYXNlJ10sIChBbmdBcHApIC0+XG5cbiAgY2xhc3MgU2lnbnVwTWVudG9yc0NvbnRyb2xsZXJcblxuICAgIGNvbnN0cnVjdG9yOiAoJHNjb3BlLCBGaXJlYmFzZVNlcnZpY2UpIC0+XG4gICAgICBpZiBGaXJlYmFzZVNlcnZpY2UuYXV0aERhdGFcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9hcHAnXG4gICAgICBlbHNlXG4gICAgICAgICRzY29wZS51c2VyID0ge31cbiAgICAgICAgJHNjb3BlLmFsZXJ0SW5mbyA9IHtzcGlubmVyOiBmYWxzZSwgYWxlcnQ6IGZhbHNlfVxuXG5cbiAgICAgICAgJHNjb3BlLmNyZWF0ZU5ld1VzZXIgPSAobmV3VXNlckZvcm0pIC0+XG4gICAgICAgICAgaWYgbmV3VXNlckZvcm0uJHZhbGlkXG4gICAgICAgICAgICAkc2NvcGUuYWxlcnRJbmZvID0ge3NwaW5uZXI6IHRydWUsIGFsZXJ0OiBmYWxzZX1cblxuXG4gICAgICAgICAgICBGaXJlYmFzZVNlcnZpY2Uucm9vdFJlZi5jcmVhdGVVc2VyIHtcbiAgICAgICAgICAgICAgZW1haWw6ICRzY29wZS51c2VyLmVtYWlsXG4gICAgICAgICAgICAgIHBhc3N3b3JkOiAkc2NvcGUudXNlci5wYXNzd29yZFxuICAgICAgICAgICAgfSwgKGVycm9yLCB1c2VyRGF0YSkgLT5cbiAgICAgICAgICAgICAgaWYgZXJyb3JcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyBlcnJvclxuICAgICAgICAgICAgICAgIHN3aXRjaCBlcnJvci5jb2RlXG4gICAgICAgICAgICAgICAgICB3aGVuICdFTUFJTF9UQUtFTidcblxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5IC0+XG4gICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmFsZXJ0SW5mbyA9IHtzcGlubmVyOiBmYWxzZSwgYWxlcnQ6IHRydWUsIGFsZXJ0TXNnOiBcIlRoZSBlbWFpbCBpcyBhbHJlYWR5IGluIHVzZS5cIn1cblxuICAgICAgICAgICAgICAgICAgd2hlbiAnSU5WQUxJRF9FTUFJTCdcblxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5IC0+XG4gICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmFsZXJ0SW5mbyA9IHtzcGlubmVyOiBmYWxzZSwgYWxlcnQ6IHRydWUsIGFsZXJ0TXNnOiBcIlRoZSBzcGVjaWZpZWQgZW1haWwgaXMgbm90IGEgdmFsaWQgZW1haWwuXCJ9XG5cbiAgICAgICAgICAgICAgICAgIGVsc2VcblxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5IC0+XG4gICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmFsZXJ0SW5mbyA9IHtzcGlubmVyOiBmYWxzZSwgYWxlcnQ6IHRydWUsIGFsZXJ0TXNnOiBcIkVycm9yOiAje2Vycm9yfVwifVxuXG4gICAgICAgICAgICAgIGVsc2VcblxuICAgICAgICAgICAgICAgIHVzclJlZiA9IEZpcmViYXNlU2VydmljZS5yb290UmVmLmNoaWxkKFwidXNlcnMvI3t1c2VyRGF0YS51aWR9XCIpXG4gICAgICAgICAgICAgICAgdXNyUmVmLmNoaWxkKCdiYXNpYycpLnNldCB7dXNlclR5cGU6ICdtZW50b3InLGZpcnN0TmFtZTogJHNjb3BlLnVzZXIuZmlyc3ROYW1lLCBsYXN0TmFtZTogJHNjb3BlLnVzZXIubGFzdE5hbWUsIGVtYWlsOiAkc2NvcGUudXNlci5lbWFpbCwgY3JlYXRlZEF0OiBtb21lbnQoKS51bml4KCl9XG4gICAgICAgICAgICAgICAgdXNyUmVmLnNldFByaW9yaXR5ICRzY29wZS51c2VyLmVtYWlsXG5cblxuICAgICAgICAgICAgICAgIEZpcmViYXNlU2VydmljZS5yb290UmVmLmF1dGhXaXRoUGFzc3dvcmQge1xuICAgICAgICAgICAgICAgICAgJ2VtYWlsJzogJHNjb3BlLnVzZXIuZW1haWxcbiAgICAgICAgICAgICAgICAgICdwYXNzd29yZCc6ICRzY29wZS51c2VyLnBhc3N3b3JkXG4gICAgICAgICAgICAgICAgfSwgKGVycm9yLCBhdXRoRGF0YSkgLT5cbiAgICAgICAgICAgICAgICAgIGlmIGVycm9yXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nIGVycm9yXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5hbGVydEluZm8gPSB7c3Bpbm5lcjogZmFsc2UsIGFsZXJ0OiB0cnVlLCBhbGVydE1zZzogXCJZb3VyIGFjY291bnQgd2FzIGNyZWF0ZWQgYnV0IHRoZXJlIHdhcyBhIHByb2JsZW0gc2lnbmluZyBpbi4gUGxlYXNlIHRyeSB0byBzaWduIGluIGFnYWluIGZyb20gdGhlIHNpZ24gaW4gcGFnZS5cIn1cblxuICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyAnQXV0aGVudGljYXRlZCBzdWNjZXNzZnVsbHkgd2l0aCBwYXlsb2FkOicsIGF1dGhEYXRhXG4gICAgICAgICAgICAgICAgICAgIEZpcmViYXNlU2VydmljZS5hdXRoRGF0YSA9IGF1dGhEYXRhXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvYXBwJ1xuXG5cblxuXG4gIFNpZ251cE1lbnRvcnNDb250cm9sbGVyLiRpbmplY3QgPSBbXCIkc2NvcGVcIiwgXCJGaXJlYmFzZVNlcnZpY2VcIl1cblxuICBBbmdBcHAuY29udHJvbGxlciAnU2lnbnVwTWVudG9yc0NvbnRyb2xsZXInLCBTaWdudXBNZW50b3JzQ29udHJvbGxlclxuXG4gIFNpZ251cE1lbnRvcnNDb250cm9sbGVyIl19
