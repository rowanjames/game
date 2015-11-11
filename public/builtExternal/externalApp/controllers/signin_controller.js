define(['externalApp/base', 'angularjs', 'fbase'], function(AngApp) {
  var SigninController;
  SigninController = (function() {
    function SigninController($scope, FirebaseService) {
      if (FirebaseService.authData) {
        window.location = '/app';
      } else {
        $scope.user = {};
        $scope.alertInfo = {
          spinner: false,
          alert: false
        };
        $scope.logInUser = function(userForm) {
          if (userForm.$valid) {
            $scope.alertInfo = {
              spinner: true,
              alert: false
            };
            return FirebaseService.rootRef.authWithPassword({
              'email': $scope.user.email,
              'password': $scope.user.password
            }, function(error, authData) {
              if (error) {
                console.log(error);
                switch (error.code) {
                  case 'INVALID_USER':
                    return $scope.$apply(function() {
                      return $scope.alertInfo = {
                        spinner: false,
                        alert: true,
                        alertMsg: "The user does not exist."
                      };
                    });
                  case 'INVALID_PASSWORD':
                    return $scope.$apply(function() {
                      return $scope.alertInfo = {
                        spinner: false,
                        alert: true,
                        alertMsg: "The password is incorrect."
                      };
                    });
                }
              } else {
                console.log('Authenticated successfully with payload:', authData);
                FirebaseService.authData = authData;
                return window.location = '/app';
              }
            });
          }
        };
        $scope.forgotPassword = function($event) {
          $event.preventDefault();
          return $scope.showForgotPassword = !$scope.showForgotPassword;
        };
        $scope.sendResetEmail = function(forgotPasswordForm) {
          if (forgotPasswordForm.$valid) {
            $scope.alertInfo = {
              spinner: true,
              alert: false
            };
            console.log($scope.forgotEmail);
            return FirebaseService.rootRef.resetPassword({
              email: $scope.forgotEmail
            }, function(error) {
              if (error) {
                switch (error.code) {
                  case 'INVALID_USER':
                    $scope.$apply(function() {
                      return $scope.alertInfo = {
                        spinner: false,
                        alert: true,
                        alertMsg: "The user does not exist."
                      };
                    });
                    break;
                  default:
                    $scope.$apply(function() {
                      return $scope.alertInfo = {
                        spinner: false,
                        alert: true,
                        alertMsg: "Error resetting password"
                      };
                    });
                }
              } else {
                $scope.$apply(function() {
                  return $scope.alertInfo = {
                    spinner: false,
                    alert: true,
                    alertMsg: 'Reset email sent successfully!'
                  };
                });
              }
            });
          }
        };
      }
    }

    return SigninController;

  })();
  SigninController.$inject = ["$scope", "FirebaseService"];
  AngApp.controller('SigninController', SigninController);
  return SigninController;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL1VzZXJzL2tyaXNobmFyb2toYWxlL2NvZGUvbGV2ZWwvbGV2ZWwvcHJvamVjdHMvbW9zYWljZWQvcHVibGljL2phdmFzY3JpcHRzL2V4dGVybmFsQXBwL2NvbnRyb2xsZXJzL3NpZ25pbl9jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL1VzZXJzL2tyaXNobmFyb2toYWxlL2NvZGUvbGV2ZWwvbGV2ZWwvcHJvamVjdHMvbW9zYWljZWQvYXNzZXRzL2phdmFzY3JpcHRzL2V4dGVybmFsQXBwL2NvbnRyb2xsZXJzL3NpZ25pbl9jb250cm9sbGVyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxNQUFBLENBQU8sQ0FBRSxrQkFBRixFQUFxQixXQUFyQixFQUFrQyxPQUFsQyxDQUFQLEVBQWtELFNBQUMsTUFBRCxHQUFBO0FBRWhELE1BQUEsZ0JBQUE7QUFBQSxFQUFNO0FBRVMsSUFBQSwwQkFBQyxNQUFELEVBQVMsZUFBVCxHQUFBO0FBRVgsTUFBQSxJQUFHLGVBQWUsQ0FBQyxRQUFuQjtBQUNFLFFBQUEsTUFBTSxDQUFDLFFBQVAsR0FBbUIsTUFBbkIsQ0FERjtPQUFBLE1BQUE7QUFHRSxRQUFBLE1BQU0sQ0FBQyxJQUFQLEdBQWMsRUFBZCxDQUFBO0FBQUEsUUFDQSxNQUFNLENBQUMsU0FBUCxHQUFtQjtBQUFBLFVBQUMsT0FBQSxFQUFTLEtBQVY7QUFBQSxVQUFpQixLQUFBLEVBQU8sS0FBeEI7U0FEbkIsQ0FBQTtBQUFBLFFBR0EsTUFBTSxDQUFDLFNBQVAsR0FBbUIsU0FBQyxRQUFELEdBQUE7QUFDakIsVUFBQSxJQUFHLFFBQVEsQ0FBQyxNQUFaO0FBQ0UsWUFBQSxNQUFNLENBQUMsU0FBUCxHQUFtQjtBQUFBLGNBQUMsT0FBQSxFQUFTLElBQVY7QUFBQSxjQUFnQixLQUFBLEVBQU8sS0FBdkI7YUFBbkIsQ0FBQTttQkFDQSxlQUFlLENBQUMsT0FBTyxDQUFDLGdCQUF4QixDQUF5QztBQUFBLGNBQ3RDLE9B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UyxLQUFWO0FBQUEsb0JBQWlCLEtBQUEsRUFBTyxJQUF4QjtBQUFBLG9CQUE4QixRQUFBLEVBQVcsZ0NBQXpDO29CQURQO2dCQUFBLENBQWQsQ0FBQSxDQVRGO2VBRGlFO1lBQUEsQ0FBbkUsRUFKRjtXQURzQjtRQUFBLENBakN4QixDQUhGO09BRlc7SUFBQSxDQUFiOzs0QkFBQTs7TUFGRixDQUFBO0FBQUEsRUE4REEsZ0JBQWdCLENBQUMsT0FBakIsR0FBMkIsQ0FBRSxRQUFGLEVBQVksaUJBQVosQ0E5RDNCLENBQUE7QUFBQSxFQWdFQSxNQUFNLENBQUMsVUFBUCxDQUFtQixrQkFBbkIsRUFBc0MsZ0JBQXRDLENBaEVBLENBQUE7U0FrRUEsaUJBcEVnRDtBQUFBLENBQWxELENBQUEsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIlxuZGVmaW5lIFsnZXh0ZXJuYWxBcHAvYmFzZScsJ2FuZ3VsYXJqcycsICdmYmFzZSddLCAoQW5nQXBwKSAtPlxuXG4gIGNsYXNzIFNpZ25pbkNvbnRyb2xsZXJcblxuICAgIGNvbnN0cnVjdG9yOiAoJHNjb3BlLCBGaXJlYmFzZVNlcnZpY2UpIC0+XG4jICAgICAgRmlyZWJhc2VTZXJ2aWNlLnJvb3RSZWYudW5hdXRoKClcbiAgICAgIGlmIEZpcmViYXNlU2VydmljZS5hdXRoRGF0YVxuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL2FwcCdcbiAgICAgIGVsc2VcbiAgICAgICAgJHNjb3BlLnVzZXIgPSB7fVxuICAgICAgICAkc2NvcGUuYWxlcnRJbmZvID0ge3NwaW5uZXI6IGZhbHNlLCBhbGVydDogZmFsc2V9XG5cbiAgICAgICAgJHNjb3BlLmxvZ0luVXNlciA9ICh1c2VyRm9ybSkgLT5cbiAgICAgICAgICBpZiB1c2VyRm9ybS4kdmFsaWRcbiAgICAgICAgICAgICRzY29wZS5hbGVydEluZm8gPSB7c3Bpbm5lcjogdHJ1ZSwgYWxlcnQ6IGZhbHNlfVxuICAgICAgICAgICAgRmlyZWJhc2VTZXJ2aWNlLnJvb3RSZWYuYXV0aFdpdGhQYXNzd29yZCB7XG4gICAgICAgICAgICAgICdlbWFpbCc6ICRzY29wZS51c2VyLmVtYWlsXG4gICAgICAgICAgICAgICdwYXNzd29yZCc6ICRzY29wZS51c2VyLnBhc3N3b3JkXG4gICAgICAgICAgICB9LCAoZXJyb3IsIGF1dGhEYXRhKSAtPlxuICAgICAgICAgICAgICBpZiBlcnJvclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nIGVycm9yXG4gICAgICAgICAgICAgICAgc3dpdGNoIGVycm9yLmNvZGVcblxuICAgICAgICAgICAgICAgICAgd2hlbiAnSU5WQUxJRF9VU0VSJ1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5IC0+XG4gICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmFsZXJ0SW5mbyA9IHtzcGlubmVyOiBmYWxzZSwgYWxlcnQ6IHRydWUsIGFsZXJ0TXNnOiBcIlRoZSB1c2VyIGRvZXMgbm90IGV4aXN0LlwifVxuXG5cbiAgICAgICAgICAgICAgICAgIHdoZW4gJ0lOVkFMSURfUEFTU1dPUkQnXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkgLT5cbiAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuYWxlcnRJbmZvID0ge3NwaW5uZXI6IGZhbHNlLCBhbGVydDogdHJ1ZSwgYWxlcnRNc2c6IFwiVGhlIHBhc3N3b3JkIGlzIGluY29ycmVjdC5cIn1cblxuICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cgJ0F1dGhlbnRpY2F0ZWQgc3VjY2Vzc2Z1bGx5IHdpdGggcGF5bG9hZDonLCBhdXRoRGF0YVxuICAgICAgICAgICAgICAgIEZpcmViYXNlU2VydmljZS5hdXRoRGF0YSA9IGF1dGhEYXRhXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9hcHAnXG5cblxuICAgICAgICAkc2NvcGUuZm9yZ290UGFzc3dvcmQgPSAoJGV2ZW50KSAtPlxuICAgICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgJHNjb3BlLnNob3dGb3Jnb3RQYXNzd29yZCA9ICEkc2NvcGUuc2hvd0ZvcmdvdFBhc3N3b3JkXG5cbiAgICAgICAgJHNjb3BlLnNlbmRSZXNldEVtYWlsID0gKGZvcmdvdFBhc3N3b3JkRm9ybSkgLT5cbiAgICAgICAgICBpZiBmb3Jnb3RQYXNzd29yZEZvcm0uJHZhbGlkXG4gICAgICAgICAgICAkc2NvcGUuYWxlcnRJbmZvID0ge3NwaW5uZXI6IHRydWUsIGFsZXJ0OiBmYWxzZX1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nICRzY29wZS5mb3Jnb3RFbWFpbFxuXG4gICAgICAgICAgICBGaXJlYmFzZVNlcnZpY2Uucm9vdFJlZi5yZXNldFBhc3N3b3JkIHtlbWFpbDogJHNjb3BlLmZvcmdvdEVtYWlsfSwgKGVycm9yKSAtPlxuICAgICAgICAgICAgICBpZiBlcnJvclxuICAgICAgICAgICAgICAgIHN3aXRjaCBlcnJvci5jb2RlXG4gICAgICAgICAgICAgICAgICB3aGVuICdJTlZBTElEX1VTRVInXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkgLT5cbiAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuYWxlcnRJbmZvID0ge3NwaW5uZXI6IGZhbHNlLCBhbGVydDogdHJ1ZSwgYWxlcnRNc2c6IFwiVGhlIHVzZXIgZG9lcyBub3QgZXhpc3QuXCJ9XG4gICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkgLT5cbiAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuYWxlcnRJbmZvID0ge3NwaW5uZXI6IGZhbHNlLCBhbGVydDogdHJ1ZSwgYWxlcnRNc2c6IFwiRXJyb3IgcmVzZXR0aW5nIHBhc3N3b3JkXCJ9XG4gICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5IC0+XG4gICAgICAgICAgICAgICAgICAkc2NvcGUuYWxlcnRJbmZvID0ge3NwaW5uZXI6IGZhbHNlLCBhbGVydDogdHJ1ZSwgYWxlcnRNc2c6ICdSZXNldCBlbWFpbCBzZW50IHN1Y2Nlc3NmdWxseSEnfVxuICAgICAgICAgICAgICByZXR1cm5cblxuXG5cblxuICBTaWduaW5Db250cm9sbGVyLiRpbmplY3QgPSBbXCIkc2NvcGVcIiwgXCJGaXJlYmFzZVNlcnZpY2VcIl1cblxuICBBbmdBcHAuY29udHJvbGxlciAnU2lnbmluQ29udHJvbGxlcicsIFNpZ25pbkNvbnRyb2xsZXJcblxuICBTaWduaW5Db250cm9sbGVyIl19
