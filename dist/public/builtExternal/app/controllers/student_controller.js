define(['app/base', 'angularjs', 'fbase'], function(AngApp) {
  var StudentController;
  StudentController = (function() {
    function StudentController($scope, FirebaseService, $window, $timeout, $firebaseObject, $firebaseArray, $rootScope, $sce, $location) {
      $scope.coursesTab = $scope.batchesTab = $scope.questionHoursTab = $scope.appointmentsTab = $scope.paymentsTab = $scope.faqTab = {};
      $scope.coursesTab.boot = function() {
        $scope.selectedTab = 'COURSES';
        $scope.tpl = "javascripts/app/templates/student/courses.html";
        return $rootScope.userBatchesIndex.$loaded(function(x) {
          if (x) {
            $scope.coursesTab.changeCourse(x[0]);
            $scope.paneHeightNumber = $window.innerHeight - document.querySelector('nav').offsetHeight - document.querySelector('.student-dashboard').offsetHeight - document.querySelector('.courses-tab-option-dashboard').offsetHeight;
            $scope.paneHeight = $scope.paneHeightNumber + 'px';
            return $scope.paneStyle = {
              'max-height': $scope.paneHeight,
              'min-height': $scope.paneHeight
            };
          }
        });
      };
      $scope.coursesTab.boot();
      $scope.coursesTab.changeCourse = function(batch) {
        console.log(batch);
        if ($scope.coursesTab.currentCourse) {
          $scope.coursesTab.currentCourse.$destroy();
        }
        $scope.coursesTab.currentCourse = $firebaseObject($rootScope.rootRef.child("courses/" + batch.courseId));
        return $scope.coursesTab.currentCourse.$loaded(function(x) {
          var firstLessonKey, firstProjectKey, firstUnitKey;
          if (x) {
            firstUnitKey = $scope.getFirstKey(x.units);
            if (firstUnitKey) {
              firstLessonKey = $scope.getFirstKey(x.units[firstUnitKey].lessons);
              if (firstLessonKey) {
                $scope.coursesTab.lessonKey = firstLessonKey;
                firstProjectKey = $scope.getFirstKey(x.units[firstUnitKey].lessons[firstLessonKey].projects);
                if (firstProjectKey) {
                  $scope.coursesTab.projectKey = firstProjectKey;
                  return $scope.coursesTab.changeProject(firstUnitKey, firstLessonKey, firstProjectKey, 1, 1, 1);
                } else {
                  $scope.coursesTab.projectHtml = '';
                  return $scope.coursesTab.resetKeys();
                }
              } else {
                $scope.coursesTab.projectHtml = '';
                return $scope.coursesTab.resetKeys();
              }
            } else {
              $scope.coursesTab.projectHtml = '';
              return $scope.coursesTab.resetKeys();
            }
          }
        });
      };
      $scope.coursesTab.changeProject = function(unitKey, lessonKey, projectKey, unitIndex, lessonIndex, projectIndex) {
        $scope.coursesTab.unitKey = unitKey;
        $scope.coursesTab.lessonKey = lessonKey;
        $scope.coursesTab.projectKey = projectKey;
        $scope.coursesTab.unitIndex = unitIndex;
        $scope.coursesTab.lessonIndex = lessonIndex;
        $scope.coursesTab.projectIndex = projectIndex;
        return $scope.coursesTab.projectHtml = $sce.trustAsHtml($scope.coursesTab.currentCourse.units[$scope.coursesTab.unitKey].lessons[$scope.coursesTab.lessonKey].projects[$scope.coursesTab.projectKey].html);
      };
      $scope.coursesTab.resetKeys = function() {
        return $scope.coursesTab.unitKey = $scope.coursesTab.lessonKey = $scope.coursesTab.projectKey = $scope.coursesTab.unitIndex = $scope.coursesTab.lessonIndex = $scope.coursesTab.projectIndex = null;
      };
      $scope.getFirstKey = function(obj) {
        if (obj) {
          return Object.keys(obj)[0];
        }
      };
    }

    return StudentController;

  })();
  StudentController.$inject = ["$scope", "FirebaseService", "$window", "$timeout", "$firebaseObject", "$firebaseArray", "$rootScope", "$sce", "$location"];
  AngApp.controller('StudentController', StudentController);
  return StudentController;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL1VzZXJzL2tyaXNobmFyb2toYWxlL2NvZGUvbGV2ZWwvbGV2ZWwvcHJvamVjdHMvbW9zYWljZWQvcHVibGljL2phdmFzY3JpcHRzL2FwcC9jb250cm9sbGVycy9zdHVkZW50X2NvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIvVXNlcnMva3Jpc2huYXJva2hhbGUvY29kZS9sZXZlbC9sZXZlbC9wcm9qZWN0cy9tb3NhaWNlZC9hc3NldHMvamF2YXNjcmlwdHMvYXBwL2NvbnRyb2xsZXJzL3N0dWRlbnRfY29udHJvbGxlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBQSxDQUFPLENBQUUsVUFBRixFQUFhLFdBQWIsRUFBMEIsT0FBMUIsQ0FBUCxFQUEwQyxTQUFDLE1BQUQsR0FBQTtBQUV4QyxNQUFBLGlCQUFBO0FBQUEsRUFBTTtBQUVTLElBQUEsMkJBQUMsTUFBRCxFQUFTLGVBQVQsRUFBMEIsT0FBMUIsRUFBbUMsUUFBbkMsRUFBNkMsZUFBN0MsRUFBOEQsY0FBOUQsRUFBOEUsVUFBOUUsRUFBMEYsSUFBMUYsRUFBZ0csU0FBaEcsR0FBQTtBQUVYLE1BQUEsTUFBTSxDQUFDLFVBQVAsR0FBb0IsTUFBTSxDQUFDLFVBQVAsR0FBb0IsTUFBTSxDQUFDLGdCQUFQLEdBQTBCLE1BQU0sQ0FBQyxlQUFQLEdBQXlCLE1BQU0sQ0FBQyxXQUFQLEdBQXFCLE1BQU0sQ0FBQyxNQUFQLEdBQWdCLEVBQWhJLENBQUE7QUFBQSxNQUdBLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBbEIsR0FBeUIsU0FBQSxHQUFBO0FBQ3ZCLFFBQUEsTUFBTSxDQUFDLFdBQVAsR0FBc0IsU0FBdEIsQ0FBQTtBQUFBLFFBQ0EsTUFBTSxDQUFDLEdBQVAsR0FBYSxnREFEYixDQUFBO2VBRUEsVUFBVSxDQUFDLGdCQUFnQixDQUFDLE9BQTVCLENBQW9DLFNBQUMsQ0FBRCxHQUFBO0FBQ2xDLFVBQUEsSUFBRyxDQUFIO0FBQ0UsWUFBQSxNQUFN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bEIsR0FBOEIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxVQUFsQixHQUErQixNQUFNLENBQUMsVUFBVSxDQUFDLFNBQWxCLEdBQThCLE1BQU0sQ0FBQyxVQUFVLENBQUMsV0FBbEIsR0FBZ0MsTUFBTSxDQUFDLFVBQVUsQ0FBQyxZQUFsQixHQUFpQyxLQUQ1SjtNQUFBLENBbkQ5QixDQUFBO0FBQUEsTUF1REEsTUFBTSxDQUFDLFdBQVAsR0FBcUIsU0FBQyxHQUFELEdBQUE7QUFDbkIsUUFBQSxJQUFHLEdBQUg7aUJBQ0UsTUFBTSxDQUFDLElBQVAsQ0FBWSxHQUFaLENBQWlCLENBQUEsQ0FBQSxFQURuQjtTQURtQjtNQUFBLENBdkRyQixDQUZXO0lBQUEsQ0FBYjs7NkJBQUE7O01BRkYsQ0FBQTtBQUFBLEVBMkVBLGlCQUFpQixDQUFDLE9BQWxCLEdBQTRCLENBQUUsUUFBRixFQUFZLGlCQUFaLEVBQStCLFNBQS9CLEVBQTBDLFVBQTFDLEVBQXNELGlCQUF0RCxFQUF5RSxnQkFBekUsRUFBMkYsWUFBM0YsRUFBeUcsTUFBekcsRUFBaUgsV0FBakgsQ0EzRTVCLENBQUE7QUFBQSxFQTZFQSxNQUFNLENBQUMsVUFBUCxDQUFtQixtQkFBbkIsRUFBdUMsaUJBQXZDLENBN0VBLENBQUE7U0ErRUEsa0JBakZ3QztBQUFBLENBQTFDLENBQUEsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImRlZmluZSBbJ2FwcC9iYXNlJywnYW5ndWxhcmpzJywgJ2ZiYXNlJ10sIChBbmdBcHApIC0+XG5cbiAgY2xhc3MgU3R1ZGVudENvbnRyb2xsZXJcblxuICAgIGNvbnN0cnVjdG9yOiAoJHNjb3BlLCBGaXJlYmFzZVNlcnZpY2UsICR3aW5kb3csICR0aW1lb3V0LCAkZmlyZWJhc2VPYmplY3QsICRmaXJlYmFzZUFycmF5LCAkcm9vdFNjb3BlLCAkc2NlLCAkbG9jYXRpb24pIC0+XG5cbiAgICAgICRzY29wZS5jb3Vyc2VzVGFiID0gJHNjb3BlLmJhdGNoZXNUYWIgPSAkc2NvcGUucXVlc3Rpb25Ib3Vyc1RhYiA9ICRzY29wZS5hcHBvaW50bWVudHNUYWIgPSAkc2NvcGUucGF5bWVudHNUYWIgPSAkc2NvcGUuZmFxVGFiID0ge31cbiAgICAgIFxuXG4gICAgICAkc2NvcGUuY291cnNlc1RhYi5ib290ID0gKCkgLT5cbiAgICAgICAgJHNjb3BlLnNlbGVjdGVkVGFiID0gJ0NPVVJTRVMnXG4gICAgICAgICRzY29wZS50cGw9IFwiamF2YXNjcmlwdHMvYXBwL3RlbXBsYXRlcy9zdHVkZW50L2NvdXJzZXMuaHRtbFwiXG4gICAgICAgICRyb290U2NvcGUudXNlckJhdGNoZXNJbmRleC4kbG9hZGVkICh4KSAtPlxuICAgICAgICAgIGlmIHhcbiAgICAgICAgICAgICRzY29wZS5jb3Vyc2VzVGFiLmNoYW5nZUNvdXJzZSh4WzBdKVxuICAgICAgICAgICAgJHNjb3BlLnBhbmVIZWlnaHROdW1iZXIgPSAkd2luZG93LmlubmVySGVpZ2h0IC0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbmF2Jykub2Zmc2V0SGVpZ2h0IC0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0dWRlbnQtZGFzaGJvYXJkJykub2Zmc2V0SGVpZ2h0IC0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvdXJzZXMtdGFiLW9wdGlvbi1kYXNoYm9hcmQnKS5vZmZzZXRIZWlnaHRcbiAgICAgICAgICAgICRzY29wZS5wYW5lSGVpZ2h0ID0gJHNjb3BlLnBhbmVIZWlnaHROdW1iZXIgKyAncHgnXG4gICAgICAgICAgICAkc2NvcGUucGFuZVN0eWxlID0geydtYXgtaGVpZ2h0JzogJHNjb3BlLnBhbmVIZWlnaHQsICdtaW4taGVpZ2h0JzogJHNjb3BlLnBhbmVIZWlnaHR9XG5cbiAgICAgICRzY29wZS5jb3Vyc2VzVGFiLmJvb3QoKSAgICAgIFxuXG4gICAgICAkc2NvcGUuY291cnNlc1RhYi5jaGFuZ2VDb3Vyc2UgPSAoYmF0Y2gpIC0+XG4gICAgICAgIGNvbnNvbGUubG9nIGJhdGNoXG4gICAgICAgICRzY29wZS5jb3Vyc2VzVGFiLmN1cnJlbnRDb3Vyc2UuJGRlc3Ryb3koKSBpZiAkc2NvcGUuY291cnNlc1RhYi5jdXJyZW50Q291cnNlXG4gICAgICAgICRzY29wZS5jb3Vyc2VzVGFiLmN1cnJlbnRDb3Vyc2UgPSAkZmlyZWJhc2VPYmplY3QoJHJvb3RTY29wZS5yb290UmVmLmNoaWxkKFwiY291cnNlcy8je2JhdGNoLmNvdXJzZUlkfVwiKSlcbiAgICAgICAgJHNjb3BlLmNvdXJzZXNUYWIuY3VycmVudENvdXJzZS4kbG9hZGVkICh4KSAtPlxuICAgICAgICAgIGlmIHhcbiAgICAgICAgICAgIGZpcnN0VW5pdEtleSA9ICRzY29wZS5nZXRGaXJzdEtleSh4LnVuaXRzKVxuICAgICAgICAgICAgaWYgZmlyc3RVbml0S2V5XG4gICAgICAgICAgICAgIGZpcnN0TGVzc29uS2V5ID0gJHNjb3BlLmdldEZpcnN0S2V5KHgudW5pdHNbZmlyc3RVbml0S2V5XS5sZXNzb25zKVxuICAgICAgICAgICAgICBpZiBmaXJzdExlc3NvbktleVxuICAgICAgICAgICAgICAgICRzY29wZS5jb3Vyc2VzVGFiLmxlc3NvbktleSA9IGZpcnN0TGVzc29uS2V5ICBcbiAgICAgICAgICAgICAgICBmaXJzdFByb2plY3RLZXkgPSAkc2NvcGUuZ2V0Rmlyc3RLZXkoeC51bml0c1tmaXJzdFVuaXRLZXldLmxlc3NvbnNbZmlyc3RMZXNzb25LZXldLnByb2plY3RzKVxuICAgICAgICAgICAgICAgIGlmIGZpcnN0UHJvamVjdEtleVxuICAgICAgICAgICAgICAgICAgJHNjb3BlLmNvdXJzZXNUYWIucHJvamVjdEtleSA9IGZpcnN0UHJvamVjdEtleVxuICAgICAgICAgICAgICAgICAgJHNjb3BlLmNvdXJzZXNUYWIuY2hhbmdlUHJvamVjdChmaXJzdFVuaXRLZXksIGZpcnN0TGVzc29uS2V5LCBmaXJzdFByb2plY3RLZXksIDEsIDEsIDEpXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgJHNjb3BlLmNvdXJzZXNUYWIucHJvamVjdEh0bWwgPSAnJ1xuICAgICAgICAgICAgICAgICAgJHNjb3BlLmNvdXJzZXNUYWIucmVzZXRLZXlzKClcbiAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICRzY29wZS5jb3Vyc2VzVGFiLnByb2plY3RIdG1sID0gJydcbiAgICAgICAgICAgICAgICAkc2NvcGUuY291cnNlc1RhYi5yZXNldEtleXMoKVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAkc2NvcGUuY291cnNlc1RhYi5wcm9qZWN0SHRtbCA9ICcnXG4gICAgICAgICAgICAgICRzY29wZS5jb3Vyc2VzVGFiLnJlc2V0S2V5cygpXG5cblxuICAgICAgJHNjb3BlLmNvdXJzZXNUYWIuY2hhbmdlUHJvamVjdCA9ICh1bml0S2V5LCBsZXNzb25LZXksIHByb2plY3RLZXksIHVuaXRJbmRleCwgbGVzc29uSW5kZXgsIHByb2plY3RJbmRleCkgLT4gIFxuICAgICAgICAkc2NvcGUuY291cnNlc1RhYi51bml0S2V5ID0gdW5pdEtleSAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICRzY29wZS5jb3Vyc2VzVGFiLmxlc3NvbktleSA9IGxlc3NvbktleSAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICRzY29wZS5jb3Vyc2VzVGFiLnByb2plY3RLZXkgPSBwcm9qZWN0S2V5XG4gICAgICAgICRzY29wZS5jb3Vyc2VzVGFiLnVuaXRJbmRleCA9IHVuaXRJbmRleFxuICAgICAgICAkc2NvcGUuY291cnNlc1RhYi5sZXNzb25JbmRleCA9IGxlc3NvbkluZGV4ICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgJHNjb3BlLmNvdXJzZXNUYWIucHJvamVjdEluZGV4ID0gcHJvamVjdEluZGV4XG5cbiAgICAgICAgJHNjb3BlLmNvdXJzZXNUYWIucHJvamVjdEh0bWwgPSAkc2NlLnRydXN0QXNIdG1sKCgkc2NvcGUuY291cnNlc1RhYi5jdXJyZW50Q291cnNlLnVuaXRzWyRzY29wZS5jb3Vyc2VzVGFiLnVuaXRLZXldLmxlc3NvbnNbJHNjb3BlLmNvdXJzZXNUYWIubGVzc29uS2V5XS5wcm9qZWN0c1skc2NvcGUuY291cnNlc1RhYi5wcm9qZWN0S2V5XSkuaHRtbCkgICAgICAgICAgICAgIFxuXG4gICAgICAkc2NvcGUuY291cnNlc1RhYi5yZXNldEtleXMgPSAoKSAtPlxuICAgICAgICAkc2NvcGUuY291cnNlc1RhYi51bml0S2V5ID0gJHNjb3BlLmNvdXJzZXNUYWIubGVzc29uS2V5ID0gJHNjb3BlLmNvdXJzZXNUYWIucHJvamVjdEtleSA9ICRzY29wZS5jb3Vyc2VzVGFiLnVuaXRJbmRleCA9ICRzY29wZS5jb3Vyc2VzVGFiLmxlc3NvbkluZGV4ID0gJHNjb3BlLmNvdXJzZXNUYWIucHJvamVjdEluZGV4ID0gbnVsbCAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblxuXG4gICAgICAkc2NvcGUuZ2V0Rmlyc3RLZXkgPSAob2JqKSAtPlxuICAgICAgICBpZiBvYmpcbiAgICAgICAgICBPYmplY3Qua2V5cyhvYmopWzBdICAgICAgICAgICAgICAgICBcblxuICAgICAgXG4gICAgICAjICR0aW1lb3V0IC0+XG4gICAgICAjICAgJHNjb3BlLnRwbCA9ICdqYXZhc2NyaXB0cy9hcHAvdGVtcGxhdGVzL21lbnRvci9iYXRjaGVzLmh0bWwnXG4gICAgICAjICAgJHNjb3BlLnNlbGVjdGVkVGFiID0gJ0JBVENIRVMnXG4gICAgICAjICAgJHNjb3BlLmJhdGNoZXNUYWIuYm9vdCgpXG4gICAgICAjICwgMTAwICAgICAgIFxuXG5cblxuXG5cblxuICBTdHVkZW50Q29udHJvbGxlci4kaW5qZWN0ID0gW1wiJHNjb3BlXCIsIFwiRmlyZWJhc2VTZXJ2aWNlXCIsIFwiJHdpbmRvd1wiLCBcIiR0aW1lb3V0XCIsIFwiJGZpcmViYXNlT2JqZWN0XCIsIFwiJGZpcmViYXNlQXJyYXlcIiwgXCIkcm9vdFNjb3BlXCIsIFwiJHNjZVwiLCBcIiRsb2NhdGlvblwiXVxuXG4gIEFuZ0FwcC5jb250cm9sbGVyICdTdHVkZW50Q29udHJvbGxlcicsIFN0dWRlbnRDb250cm9sbGVyXG5cbiAgU3R1ZGVudENvbnRyb2xsZXJcbiJdfQ==
