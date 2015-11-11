define(['externalApp/base', 'angularjs', 'fbase'], function(AngApp) {
  var ExternalController;
  ExternalController = (function() {
    function ExternalController($scope, FirebaseService, $window, $timeout, Upload, $sce) {
      filepicker.setKey('A1LP338CwSuaNoitK6IHVz');
      $scope.showCreatePane = true;
      $scope.showPlayPane = false;
      $scope.createPaneOne = true;
      $scope.zoomable = false;
      $scope.createFile = null;
      $scope.resetHeights = function() {
        var stepHeight;
        $scope.paneHeightNumber = $window.innerHeight - document.querySelector('.top-bar-menu').offsetHeight;
        $scope.paneHeight = $scope.paneHeightNumber + 'px';
        stepHeight = ($scope.paneHeightNumber / 2) - 40 + 'px';
        $scope.stepStyle = {
          'max-height': stepHeight,
          'min-height': stepHeight,
          overflow: 'scroll'
        };
        $scope.appStyle = {
          'max-height': $window.innerHeight + 'px',
          'min-height': $window.innerHeight + 'px',
          overflow: 'scroll'
        };
        return $scope.paneStyle = {
          'max-height': $scope.paneHeight,
          'min-height': $scope.paneHeight,
          overflow: 'scroll'
        };
      };
      console.log($scope.paneHeightNumber);
      console.log($scope.paneHeight);
      $scope.resetHeights();
      $scope.$watch('createFile', function() {
        if ($scope.createFile !== null) {
          return $scope.upload($scope.createFile);
        }
      });
      $scope.upload = function(file) {
        return Upload.upload({
          url: 'http://mosaiced.nodelabs.in/upload',
          data: {
            file: file
          }
        }).progress(function(evt) {
          var obj, progressPercentage;
          progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          obj = document.getElementById('progress-attachments');
          return obj.style.width = progressPercentage + "%";
        }).success(function(data, status, headers, config) {
          if (data.success) {
            return $timeout(function() {
              var img;
              $scope.showDropPane = false;
              $scope.showImagePreview = true;
              $scope.previewUrl = data.url;
              img = new Image();
              img.onload = function() {
                return $timeout(function() {
                  $scope.previewUrlHeight = img.height + 'px';
                  return $scope.previewUrlWidth = img.width + 'px';
                });
              };
              return img.src = $scope.previewUrl;
            });
          }
        });
      };
      $scope.removeImagePreview = function() {
        var obj;
        $scope.showDropPane = true;
        $scope.showImagePreview = null;
        $scope.previewUrl = null;
        $scope.previewUrlHeight = null;
        $scope.previewUrlWidth = null;
        obj = document.getElementById('progress-attachments');
        return obj.style.width = "0%";
      };
      $scope.togglePane = function(str) {
        if (str === 'Create') {
          $scope.showPlayPane = false;
          return $timeout(function() {
            return $scope.showCreatePane = true;
          }, 500);
        } else if (str === 'Play') {
          $scope.showCreatePane = false;
          return $timeout(function() {
            return $scope.showPlayPane = true;
          }, 500);
        }
      };
      $scope.toggleCreatePane = function(str) {
        if (str === 1) {
          $scope.createPaneOne = false;
          $timeout(function() {
            return $scope.createPaneTwo = true;
          }, 500);
          return $scope.showDropPane = true;
        } else if (str === 2) {
          if ($scope.previewUrl) {
            $scope.createPaneTwo = false;
            return $timeout(function() {
              $scope.createPaneThree = true;
              console.log($scope.previewUrl);
              console.log($scope.previewUrlHeight);
              console.log($scope.previewUrlWidth);
              return $scope.createImageStyle = {
                'background-image': "url(" + $scope.previewUrl + ")",
                'background-size': 'contain',
                'background-repeat': 'no-repeat',
                'width': '100%',
                'height': $scope.previewUrlHeight
              };
            }, 500);
          } else {
            return alert('Please choose an image first.');
          }
        } else if (str === 3) {
          $scope.createPaneThree = false;
          return $scope.createPaneTwo = true;
        }
      };
      $scope.previewCanvasClick = function(event) {
        var left, style, top, x, y;
        console.log(event);
        console.log(event.offsetX);
        console.log(event.offsetY);
        y = event.offsetY;
        x = event.offsetX;
        style = "position:absolute;top:" + y + "px;left:" + x + "px";
        console.log(style);
        $scope.dotHtml = $sce.trustAsHtml("<i class='icon-circle text-primary' style=" + style + " ng-click='yo($event)'>");
        top = y - 20 + 'px';
        left = x + 40 + 'px';
        return $scope.createQuestionBoxStyle = {
          'top': top,
          left: left
        };
      };
      $scope.yo = function(event) {
        return console.log(event);
      };
      $scope.uploadFile = function() {
        $scope.showDropPane = true;
        return filepicker.makeDropPane(document.getElementById('drop-pane'), {
          multiple: false,
          dragEnter: function() {
            var obj;
            obj = document.getElementById('drop-pane');
            return obj.style.backgroundColor = '#eee';
          },
          dragLeave: function() {
            var obj;
            obj = document.getElementById('drop-pane');
            return obj.style.backgroundColor = '#fff';
          },
          onSuccess: function(Blobs) {
            console.log(JSON.stringify(Blobs));
            console.log(Blobs);
            return $timeout(function() {
              var img;
              $scope.showDropPane = false;
              $scope.showImagePreview = true;
              $scope.previewUrl = Blobs[0].url;
              img = new Image();
              img.onload = function() {
                return $timeout(function() {
                  $scope.previewUrlHeight = img.height + 'px';
                  return $scope.previewUrlWidth = img.width + 'px';
                });
              };
              img.src = $scope.previewUrl;
              return $timeout(function() {
                return $scope.resetHeights();
              }, 1000);
            });
          },
          onStart: function(files) {
            return console.log(files);
          },
          onError: function(type, message) {
            var obj;
            alert('There was an error in uploading your file!');
            obj = document.getElementById('drop-pane-reply');
            return obj.style.backgroundColor = '#fff';
          },
          onProgress: function(percentage) {
            var obj;
            document.getElementById('drop-pane').style.backgroundColor = '#fff';
            obj = document.getElementById('progress-attachments');
            return obj.style.width = percentage + "%";
          }
        });
      };
    }

    return ExternalController;

  })();
  ExternalController.$inject = ["$scope", "FirebaseService", "$window", "$timeout", "Upload", "$sce"];
  AngApp.controller('ExternalController', ExternalController);
  return ExternalController;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL1VzZXJzL2tyaXNobmFyb2toYWxlL2NvZGUvbGV2ZWwvbGV2ZWwvcHJvamVjdHMvbW9zYWljZWQvcHVibGljL2phdmFzY3JpcHRzL2V4dGVybmFsQXBwL2NvbnRyb2xsZXJzL2V4dGVybmFsX2NvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIvVXNlcnMva3Jpc2huYXJva2hhbGUvY29kZS9sZXZlbC9sZXZlbC9wcm9qZWN0cy9tb3NhaWNlZC9hc3NldHMvamF2YXNjcmlwdHMvZXh0ZXJuYWxBcHAvY29udHJvbGxlcnMvZXh0ZXJuYWxfY29udHJvbGxlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBQSxDQUFPLENBQUUsa0JBQUYsRUFBcUIsV0FBckIsRUFBa0MsT0FBbEMsQ0FBUCxFQUFrRCxTQUFDLE1BQUQsR0FBQTtBQUVoRCxNQUFBLGtCQUFBO0FBQUEsRUFBTTtBQUVTLElBQUEsNEJBQUMsTUFBRCxFQUFTLGVBQVQsRUFBMEIsT0FBMUIsRUFBbUMsUUFBbkMsRUFBNkMsTUFBN0MsRUFBcUQsSUFBckQsR0FBQTtBQUNYLE1BQUEsVUFBVSxDQUFDLE1BQVgsQ0FBbUIsd0JBQW5CLENBQUEsQ0FBQTtBQUFBLE1BQ0EsTUFBTSxDQUFDLGNBQVAsR0FBd0IsSUFEeEIsQ0FBQTtBQUFBLE1BRUEsTUFBTSxDQUFDLFlBQVAsR0FBc0IsS0FGdEIsQ0FBQTtBQUFBLE1BR0EsTUFBTSxDQUFDLGFBQVAsR0FBdUIsSUFIdkIsQ0FBQTtBQUFBLE1BSUEsTUFBTSxDQUFDLFFBQVAsR0FBa0IsS0FKbEIsQ0FBQTtBQUFBLE1BS0EsTUFBTSxDQUFDLFVBQVAsR0FBb0IsSUFMcEIsQ0FBQTtBQUFBLE1BUUEsTUFBTSxDQUFDLFlBQVAsR0FBc0IsU0FBQSxHQUFBO0FBQ3BCLFlBQUEsVUFBQTtBQUFBLFFBQUEsTUFBTSxDQUFDLGdCQUFQLEdBQTBCLE9BQU8sQ0FBQyxXQUFSLEdBQXNCLFFBQVEsQ0FBQyxhQUFULENBQXdC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QkFBekIsQ0FETixDQUFBO21CQUVBLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBVixHQUFxQixVQUFELEdBQVksSUFIdEI7VUFBQSxDQTFDWjtTQURGLEVBRmtCO01BQUEsQ0FuSXBCLENBRFc7SUFBQSxDQUFiOzs4QkFBQTs7TUFGRixDQUFBO0FBQUEsRUE0TEEsa0JBQWtCLENBQUMsT0FBbkIsR0FBNkIsQ0FBRSxRQUFGLEVBQVksaUJBQVosRUFBK0IsU0FBL0IsRUFBMEMsVUFBMUMsRUFBc0QsUUFBdEQsRUFBZ0UsTUFBaEUsQ0E1TDdCLENBQUE7QUFBQSxFQStMQSxNQUFNLENBQUMsVUFBUCxDQUFtQixvQkFBbkIsRUFBd0Msa0JBQXhDLENBL0xBLENBQUE7U0FpTUEsbUJBbk1nRDtBQUFBLENBQWxELENBQUEsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImRlZmluZSBbJ2V4dGVybmFsQXBwL2Jhc2UnLCdhbmd1bGFyanMnLCAnZmJhc2UnXSwgKEFuZ0FwcCkgLT5cblxuICBjbGFzcyBFeHRlcm5hbENvbnRyb2xsZXJcblxuICAgIGNvbnN0cnVjdG9yOiAoJHNjb3BlLCBGaXJlYmFzZVNlcnZpY2UsICR3aW5kb3csICR0aW1lb3V0LCBVcGxvYWQsICRzY2UpIC0+XG4gICAgICBmaWxlcGlja2VyLnNldEtleSgnQTFMUDMzOEN3U3VhTm9pdEs2SUhWeicpXG4gICAgICAkc2NvcGUuc2hvd0NyZWF0ZVBhbmUgPSB0cnVlXG4gICAgICAkc2NvcGUuc2hvd1BsYXlQYW5lID0gZmFsc2VcbiAgICAgICRzY29wZS5jcmVhdGVQYW5lT25lID0gdHJ1ZVxuICAgICAgJHNjb3BlLnpvb21hYmxlID0gZmFsc2VcbiAgICAgICRzY29wZS5jcmVhdGVGaWxlID0gbnVsbFxuICAgICAgIyAkc2NvcGUuc2NhbGUgKj0gMS4yXG5cbiAgICAgICRzY29wZS5yZXNldEhlaWdodHMgPSAoKSAtPlxuICAgICAgICAkc2NvcGUucGFuZUhlaWdodE51bWJlciA9ICR3aW5kb3cuaW5uZXJIZWlnaHQgLSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9wLWJhci1tZW51Jykub2Zmc2V0SGVpZ2h0XG4gICAgICAgICRzY29wZS5wYW5lSGVpZ2h0ID0gJHNjb3BlLnBhbmVIZWlnaHROdW1iZXIgKyAncHgnXG4gICAgICAgIHN0ZXBIZWlnaHQgPSAoJHNjb3BlLnBhbmVIZWlnaHROdW1iZXIvMikgLSA0MCArICdweCdcbiAgICAgICAgJHNjb3BlLnN0ZXBTdHlsZSA9IHsnbWF4LWhlaWdodCc6IHN0ZXBIZWlnaHQsICdtaW4taGVpZ2h0Jzogc3RlcEhlaWdodCwgb3ZlcmZsb3c6ICdzY3JvbGwnfVxuICAgICAgICAkc2NvcGUuYXBwU3R5bGUgPSB7J21heC1oZWlnaHQnOiAkd2luZG93LmlubmVySGVpZ2h0KydweCcsICdtaW4taGVpZ2h0JzogJHdpbmRvdy5pbm5lckhlaWdodCsncHgnLCBvdmVyZmxvdzogJ3Njcm9sbCd9XG4gICAgICAgICRzY29wZS5wYW5lU3R5bGUgPSB7J21heC1oZWlnaHQnOiAkc2NvcGUucGFuZUhlaWdodCwgJ21pbi1oZWlnaHQnOiAkc2NvcGUucGFuZUhlaWdodCwgb3ZlcmZsb3c6ICdzY3JvbGwnfVxuXG4gICAgICBjb25zb2xlLmxvZyAkc2NvcGUucGFuZUhlaWdodE51bWJlclxuICAgICAgY29uc29sZS5sb2cgJHNjb3BlLnBhbmVIZWlnaHRcbiAgICAgICRzY29wZS5yZXNldEhlaWdodHMoKVxuXG5cbiAgICAgICRzY29wZS4kd2F0Y2ggJ2NyZWF0ZUZpbGUnLCAtPlxuICAgICAgICBpZiAkc2NvcGUuY3JlYXRlRmlsZSAhPSBudWxsXG4gICAgICAgICAgJHNjb3BlLnVwbG9hZCgkc2NvcGUuY3JlYXRlRmlsZSlcblxuICAgICAgJHNjb3BlLnVwbG9hZCA9IChmaWxlKSAtPlxuICAgICAgICBVcGxvYWQudXBsb2FkKFxuICAgICAgICAgICMgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDozMDAwL3VwbG9hZCdcbiAgICAgICAgICB1cmw6ICdodHRwOi8vbW9zYWljZWQubm9kZWxhYnMuaW4vdXBsb2FkJ1xuICAgICAgICAgIGRhdGE6XG4gICAgICAgICAgICBmaWxlOiBmaWxlKVxuICAgICAgICAucHJvZ3Jlc3MoKGV2dCkgLT5cbiAgICAgICAgICBwcm9ncmVzc1BlcmNlbnRhZ2UgPSBwYXJzZUludCgxMDAuMCAqIGV2dC5sb2FkZWQgLyBldnQudG90YWwpXG4gICAgICAgICAgb2JqID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2dyZXNzLWF0dGFjaG1lbnRzJylcbiAgICAgICAgICBvYmouc3R5bGUud2lkdGggPSBcIiN7cHJvZ3Jlc3NQZXJjZW50YWdlfSVcIlxuICAgICAgICApLnN1Y2Nlc3MgKGRhdGEsIHN0YXR1cywgaGVhZGVycywgY29uZmlnKSAtPlxuICAgICAgICAgIGlmIGRhdGEuc3VjY2Vzc1xuICAgICAgICAgICAgJHRpbWVvdXQgLT5cbiAgICAgICAgICAgICAgJHNjb3BlLnNob3dEcm9wUGFuZSA9IGZhbHNlXG4gICAgICAgICAgICAgICRzY29wZS5zaG93SW1hZ2VQcmV2aWV3ID0gdHJ1ZVxuICAgICAgICAgICAgICAkc2NvcGUucHJldmlld1VybCA9IGRhdGEudXJsXG4gICAgICAgICAgICAgIGltZyA9IG5ldyBJbWFnZSgpXG4gICAgICAgICAgICAgIGltZy5vbmxvYWQgPSAtPlxuICAgICAgICAgICAgICAgICR0aW1lb3V0IC0+XG4gICAgICAgICAgICAgICAgICAkc2NvcGUucHJldmlld1VybEhlaWdodCA9IGltZy5oZWlnaHQgKyAncHgnXG4gICAgICAgICAgICAgICAgICAkc2NvcGUucHJldmlld1VybFdpZHRoID0gaW1nLndpZHRoICsgJ3B4J1xuICAgICAgICAgICAgICBpbWcuc3JjID0gJHNjb3BlLnByZXZpZXdVcmxcblxuXG4gICAgICAkc2NvcGUucmVtb3ZlSW1hZ2VQcmV2aWV3ID0gKCkgLT5cbiAgICAgICAgJHNjb3BlLnNob3dEcm9wUGFuZSA9IHRydWUgXG4gICAgICAgICRzY29wZS5zaG93SW1hZ2VQcmV2aWV3ID0gbnVsbFxuICAgICAgICAkc2NvcGUucHJldmlld1VybCA9IG51bGxcbiAgICAgICAgJHNjb3BlLnByZXZpZXdVcmxIZWlnaHQgPSBudWxsXG4gICAgICAgICRzY29wZS5wcmV2aWV3VXJsV2lkdGggPSBudWxsXG4gICAgICAgIG9iaiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9ncmVzcy1hdHRhY2htZW50cycpXG4gICAgICAgIG9iai5zdHlsZS53aWR0aCA9IFwiMCVcIlxuXG4gICAgICAgICAgICBcblxuICAgICAgJHNjb3BlLnRvZ2dsZVBhbmUgPSAoc3RyKSAtPlxuICAgICAgXHRpZiBzdHIgPT0gJ0NyZWF0ZSdcbiAgICAgIFx0XHQkc2NvcGUuc2hvd1BsYXlQYW5lID0gZmFsc2VcbiAgICAgIFx0XHQkdGltZW91dCAtPlxuICAgICAgXHRcdFx0JHNjb3BlLnNob3dDcmVhdGVQYW5lID0gdHJ1ZVxuICAgICAgXHRcdCwgNTAwXHRcbiAgICAgIFx0ZWxzZSBpZiBzdHIgPT0gJ1BsYXknXG4gICAgICBcdFx0JHNjb3BlLnNob3dDcmVhdGVQYW5lID0gZmFsc2VcbiAgICAgIFx0XHQkdGltZW91dCAtPlxuICAgICAgXHRcdFx0JHNjb3BlLnNob3dQbGF5UGFuZSA9IHRydWVcbiAgICAgIFx0XHQsIDUwMFx0XHRcblxuICAgICAgJHNjb3BlLnRvZ2dsZUNyZWF0ZVBhbmUgPSAoc3RyKSAtPlxuICAgICAgICBpZiBzdHIgPT0gMVxuICAgICAgICAgICRzY29wZS5jcmVhdGVQYW5lT25lID0gZmFsc2VcbiAgICAgICAgICAkdGltZW91dCAtPlxuICAgICAgICAgICAgJHNjb3BlLmNyZWF0ZVBhbmVUd28gPSB0cnVlXG4gICAgICAgICAgLCA1MDAgXG4gICAgICAgICAgJHNjb3BlLnNob3dEcm9wUGFuZSA9IHRydWVcbiAgICAgICAgICAjICRzY29wZS51cGxvYWRGaWxlKClcbiAgICAgICAgZWxzZSBpZiBzdHIgPT0gMlxuICAgICAgICAgIGlmICRzY29wZS5wcmV2aWV3VXJsXG4gICAgICAgICAgICAkc2NvcGUuY3JlYXRlUGFuZVR3byA9IGZhbHNlXG5cbiAgICAgICAgICAgICR0aW1lb3V0IC0+XG4gICAgICAgICAgICAgICRzY29wZS5jcmVhdGVQYW5lVGhyZWUgPSB0cnVlXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nICRzY29wZS5wcmV2aWV3VXJsXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nICRzY29wZS5wcmV2aWV3VXJsSGVpZ2h0XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nICRzY29wZS5wcmV2aWV3VXJsV2lkdGhcbiAgICAgICAgICAgICAgJHNjb3BlLmNyZWF0ZUltYWdlU3R5bGUgPSB7J2JhY2tncm91bmQtaW1hZ2UnOiBcInVybCgjeyRzY29wZS5wcmV2aWV3VXJsfSlcIiwgJ2JhY2tncm91bmQtc2l6ZSc6ICdjb250YWluJywgJ2JhY2tncm91bmQtcmVwZWF0JzogJ25vLXJlcGVhdCcsICd3aWR0aCc6ICcxMDAlJywgJ2hlaWdodCc6ICRzY29wZS5wcmV2aWV3VXJsSGVpZ2h0fVxuICAgICAgICAgICAgLCA1MDBcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBhbGVydCAnUGxlYXNlIGNob29zZSBhbiBpbWFnZSBmaXJzdC4nICBcbiAgICAgICAgZWxzZSBpZiBzdHIgPT0gM1xuICAgICAgICAgICRzY29wZS5jcmVhdGVQYW5lVGhyZWUgPSBmYWxzZVxuICAgICAgICAgICRzY29wZS5jcmVhdGVQYW5lVHdvID0gdHJ1ZVxuXG5cbiAgICAgICRzY29wZS5wcmV2aWV3Q2FudmFzQ2xpY2sgPSAoZXZlbnQpIC0+XG4gICAgICAgIGNvbnNvbGUubG9nIGV2ZW50XG4gICAgICAgIGNvbnNvbGUubG9nIGV2ZW50Lm9mZnNldFhcbiAgICAgICAgY29uc29sZS5sb2cgZXZlbnQub2Zmc2V0WVxuICAgICAgICB5ID0gZXZlbnQub2Zmc2V0WVxuICAgICAgICB4ID0gZXZlbnQub2Zmc2V0WFxuICAgICAgICAjIGNpcmNsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpXG4gICAgICAgICMgY2lyY2xlLmNsYXNzTmFtZSA9ICdpY29uLWNpcmNsZSB0ZXh0LXByaW1hcnknXG4gICAgICAgICMgY2lyY2xlLnN0eWxlLnRvcCA9IGV2ZW50Lm9mZnNldFkgKyAncHgnICBcbiAgICAgICAgIyBjaXJjbGUuc3R5bGUucmlnaHQgPSBldmVudC5vZmZzZXRYICsgJ3B4JyAgXG4gICAgICAgICMgY2lyY2xlLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJ1xuICAgICAgICBzdHlsZSA9IFwicG9zaXRpb246YWJzb2x1dGU7dG9wOiN7eX1weDtsZWZ0OiN7eH1weFwiXG4gICAgICAgIGNvbnNvbGUubG9nIHN0eWxlXG5cbiAgICAgICAgIyBjaXJjbGUgPSBhbmd1bGFyLmVsZW1lbnQoXCI8aSBjbGFzcz0naWNvbi1jaXJjbGUgdGV4dC1wcmltYXJ5Jywgc3R5bGU9I3tzdHlsZX0+XCIpXG4gICAgICAgICMgd3JhcHBlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmV2aWV3Q2FudmFzV3JhcCcpICBcbiAgICAgICAgIyB3cmFwcGVyID0gYW5ndWxhci5lbGVtZW50KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmV2aWV3Q2FudmFzV3JhcCcpKSAgXG4gICAgICAgICMgd3JhcHBlci5hcHBlbmQoY2lyY2xlKVxuICAgICAgICAkc2NvcGUuZG90SHRtbCA9ICRzY2UudHJ1c3RBc0h0bWwoXCI8aSBjbGFzcz0naWNvbi1jaXJjbGUgdGV4dC1wcmltYXJ5JyBzdHlsZT0je3N0eWxlfSBuZy1jbGljaz0neW8oJGV2ZW50KSc+XCIpXG4gICAgICAgIHRvcCA9IHkgLSAyMCArICdweCcgIFxuICAgICAgICBsZWZ0ID0geCArIDQwICsgJ3B4J1xuICAgICAgICAkc2NvcGUuY3JlYXRlUXVlc3Rpb25Cb3hTdHlsZSA9IHsndG9wJzogdG9wLCBsZWZ0OiBsZWZ0fSAgXG5cbiAgICAgICAgIyBjdHggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJldmlld0NhbnZhcycpLmdldENvbnRleHQoXCIyZFwiKVxuICAgICAgICAjIGN0eC5hcmMoZXZlbnQub2Zmc2V0WCwgZXZlbnQub2Zmc2V0WSwgMzAsIDAsIDIqTWF0aC5QSSlcbiAgICAgICAgIyBjdHguc3Ryb2tlKClcblxuXG4gICAgICAkc2NvcGUueW8gPSAoZXZlbnQpIC0+XG4gICAgICAgIGNvbnNvbGUubG9nIGV2ZW50XG4gICAgICAgIFxuXG5cbiAgICAgICRzY29wZS51cGxvYWRGaWxlID0gKCkgLT4gICAgXG4gICAgICAgICRzY29wZS5zaG93RHJvcFBhbmUgPSB0cnVlXG4gICAgICAgIGZpbGVwaWNrZXIubWFrZURyb3BQYW5lIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkcm9wLXBhbmUnKSxcbiAgICAgICAgICBtdWx0aXBsZTogZmFsc2VcbiAgICAgICAgICBkcmFnRW50ZXI6IC0+XG4gICAgICAgICAgICBvYmogPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZHJvcC1wYW5lJylcbiAgICAgICAgICAgIG9iai5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2VlZSdcbiAgICAgICAgICBkcmFnTGVhdmU6IC0+XG4gICAgICAgICAgICBvYmogPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZHJvcC1wYW5lJylcbiAgICAgICAgICAgIG9iai5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2ZmZidcbiAgICAgICAgICBvblN1Y2Nlc3M6IChCbG9icykgLT5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nIEpTT04uc3RyaW5naWZ5KEJsb2JzKVxuXG4gICAgICAgICAgICAjIG9iaiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9ncmVzcy1hdHRhY2htZW50cycpXG4gICAgICAgICAgICAjIG9iai5zdHlsZS53aWR0aCA9IFwiMCVcIlxuICAgICAgICAgICAgIyBmaW5hbEJsb2JzID0gW11cbiAgICAgICAgICAgICMgZm9yIGJsb2IgaW4gQmxvYnNcbiAgICAgICAgICAgICAgIyBkZWxldGUgYmxvYi5rZXlcbiAgICAgICAgICAgICAgIyBmaW5hbEJsb2JzLnB1c2ggYmxvYlxuICAgICAgICAgICAgY29uc29sZS5sb2cgQmxvYnNcbiAgICAgICAgICAgICR0aW1lb3V0IC0+XG4gICAgICAgICAgICAgICRzY29wZS5zaG93RHJvcFBhbmUgPSBmYWxzZVxuICAgICAgICAgICAgICAkc2NvcGUuc2hvd0ltYWdlUHJldmlldyA9IHRydWVcbiAgICAgICAgICAgICAgJHNjb3BlLnByZXZpZXdVcmwgPSBCbG9ic1swXS51cmxcbiAgICAgICAgICAgICAgaW1nID0gbmV3IEltYWdlKClcbiAgICAgICAgICAgICAgaW1nLm9ubG9hZCA9IC0+XG4gICAgICAgICAgICAgICAgJHRpbWVvdXQgLT5cbiAgICAgICAgICAgICAgICAgICRzY29wZS5wcmV2aWV3VXJsSGVpZ2h0ID0gaW1nLmhlaWdodCArICdweCdcbiAgICAgICAgICAgICAgICAgICRzY29wZS5wcmV2aWV3VXJsV2lkdGggPSBpbWcud2lkdGggKyAncHgnXG4gICAgICAgICAgICAgIGltZy5zcmMgPSAkc2NvcGUucHJldmlld1VybFxuXG5cbiAgICAgICAgICAgICAgJHRpbWVvdXQgLT5cbiAgICAgICAgICAgICAgICAkc2NvcGUucmVzZXRIZWlnaHRzKClcbiAgICAgICAgICAgICAgLCAxMDAwICBcblxuXG4gICAgICAgICAgb25TdGFydDogKGZpbGVzKSAtPlxuICAgICAgICAgICAgY29uc29sZS5sb2cgZmlsZXNcblxuICAgICAgICAgIG9uRXJyb3I6ICh0eXBlLCBtZXNzYWdlKSAtPlxuICAgICAgICAgICAgYWxlcnQgJ1RoZXJlIHdhcyBhbiBlcnJvciBpbiB1cGxvYWRpbmcgeW91ciBmaWxlISdcbiAgICAgICAgICAgIG9iaiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkcm9wLXBhbmUtcmVwbHknKVxuICAgICAgICAgICAgb2JqLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjZmZmJ1xuXG4gICAgICAgICAgb25Qcm9ncmVzczogKHBlcmNlbnRhZ2UpIC0+XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZHJvcC1wYW5lJykuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNmZmYnXG4gICAgICAgICAgICBvYmogPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZ3Jlc3MtYXR0YWNobWVudHMnKVxuICAgICAgICAgICAgb2JqLnN0eWxlLndpZHRoID0gXCIje3BlcmNlbnRhZ2V9JVwiXG5cblxuXG5cblxuICBFeHRlcm5hbENvbnRyb2xsZXIuJGluamVjdCA9IFtcIiRzY29wZVwiLCBcIkZpcmViYXNlU2VydmljZVwiLCBcIiR3aW5kb3dcIiwgXCIkdGltZW91dFwiLCBcIlVwbG9hZFwiLCBcIiRzY2VcIl1cblxuXG4gIEFuZ0FwcC5jb250cm9sbGVyICdFeHRlcm5hbENvbnRyb2xsZXInLCBFeHRlcm5hbENvbnRyb2xsZXJcblxuICBFeHRlcm5hbENvbnRyb2xsZXIiXX0=
