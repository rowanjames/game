define(['app/base', 'angularjs', 'fbase'], function(AngApp) {
  var NavBarController;
  NavBarController = (function() {
    function NavBarController($scope, FirebaseService) {
      $scope.loggedIn = FirebaseService.authData ? true : false;
      $scope.signOut = function($event) {
        $event.preventDefault();
        FirebaseService.rootRef.unauth();
        return window.location = '/';
      };
    }

    return NavBarController;

  })();
  NavBarController.$inject = ["$scope", "FirebaseService"];
  AngApp.controller('NavBarController', NavBarController);
  return NavBarController;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL1VzZXJzL2tyaXNobmFyb2toYWxlL2NvZGUvbGV2ZWwvbGV2ZWwvcHJvamVjdHMvbW9zYWljZWQvcHVibGljL2phdmFzY3JpcHRzL2FwcC9jb250cm9sbGVycy9uYXZfY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi9Vc2Vycy9rcmlzaG5hcm9raGFsZS9jb2RlL2xldmVsL2xldmVsL3Byb2plY3RzL21vc2FpY2VkL2Fzc2V0cy9qYXZhc2NyaXB0cy9hcHAvY29udHJvbGxlcnMvbmF2X2NvbnRyb2xsZXIuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQUEsQ0FBTyxDQUFFLFVBQUYsRUFBYSxXQUFiLEVBQTBCLE9BQTFCLENBQVAsRUFBMEMsU0FBQyxNQUFELEdBQUE7QUFFeEMsTUFBQSxnQkFBQTtBQUFBLEVBQU07QUFFUyxJQUFBLDBCQUFDLE1BQUQsRUFBUyxlQUFULEdBQUE7QUFDWCxNQUFBLE1BQU0sQ0FBQyxRQUFQLEdBQXFCLGVBQWUsQ0FBQyxRQUFuQixHQUFpQyxJQUFqQyxHQUEyQyxLQUE3RCxDQUFBO0FBQUEsTUFFQSxNQUFNLENBQUMsT0FBUCxHQUFpQixTQUFDLE1BQUQsR0FBQTtBQUNmLFFBQUEsTUFBTSxDQUFDLGNBQVAsQ0FBQSxDQUFBLENBQUE7QUFBQSxRQUNBLGVBQWUsQ0FBQyxPQUFPLENBQUMsTUFBeEIsQ0FBQSxDQURBLENBQUE7ZUFFQSxNQUFNLENBQUMsUUFBUCxHQUFtQixJQUhKO01BQUEsQ0FGakIsQ0FEVztJQUFBLENBQWI7OzRCQUFBOztNQUZGLENBQUE7QUFBQSxFQWNBLGdCQUFnQixDQUFDLE9BQWpCLEdBQTJCLENBQUUsUUFBRixFQUFZLGlCQUFaLENBZDNCLENBQUE7QUFBQSxFQWdCQSxNQUFNLENBQUMsVUFBUCxDQUFtQixrQkFBbkIsRUFBc0MsZ0JBQXRDLENBaEJBLENBQUE7U0FrQkEsaUJBcEJ3QztBQUFBLENBQTFDLENBQUEsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImRlZmluZSBbJ2FwcC9iYXNlJywnYW5ndWxhcmpzJywgJ2ZiYXNlJ10sIChBbmdBcHApIC0+XG5cbiAgY2xhc3MgTmF2QmFyQ29udHJvbGxlclxuXG4gICAgY29uc3RydWN0b3I6ICgkc2NvcGUsIEZpcmViYXNlU2VydmljZSkgLT5cbiAgICAgICRzY29wZS5sb2dnZWRJbiA9IGlmIEZpcmViYXNlU2VydmljZS5hdXRoRGF0YSB0aGVuIHRydWUgZWxzZSBmYWxzZVxuXG4gICAgICAkc2NvcGUuc2lnbk91dCA9ICgkZXZlbnQpIC0+XG4gICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIEZpcmViYXNlU2VydmljZS5yb290UmVmLnVuYXV0aCgpXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvJ1xuXG5cblxuXG5cbiAgTmF2QmFyQ29udHJvbGxlci4kaW5qZWN0ID0gW1wiJHNjb3BlXCIsIFwiRmlyZWJhc2VTZXJ2aWNlXCJdXG5cbiAgQW5nQXBwLmNvbnRyb2xsZXIgJ05hdkJhckNvbnRyb2xsZXInLCBOYXZCYXJDb250cm9sbGVyXG5cbiAgTmF2QmFyQ29udHJvbGxlciJdfQ==
