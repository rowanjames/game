define(['jquery', 'templates'], function($, templates) {
  var ExampleView;
  ExampleView = (function() {
    function ExampleView() {}

    ExampleView.prototype.render = function(element) {
      $(element).append(templates.example({
        name: 'Jade',
        css: 'stylus'
      }));
      return $(element).append(templates['another-example']({
        name: 'Jade'
      }));
    };

    return ExampleView;

  })();
  return ExampleView;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL1VzZXJzL2tyaXNobmFyb2toYWxlL2NvZGUvbGV2ZWwvbGV2ZWwvcHJvamVjdHMvbW9zYWljZWQvcHVibGljL2phdmFzY3JpcHRzL2FwcC9leGFtcGxlLXZpZXcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIvVXNlcnMva3Jpc2huYXJva2hhbGUvY29kZS9sZXZlbC9sZXZlbC9wcm9qZWN0cy9tb3NhaWNlZC9hc3NldHMvamF2YXNjcmlwdHMvYXBwL2V4YW1wbGUtdmlldy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBQSxDQUFPLENBQUUsUUFBRixFQUFZLFdBQVosQ0FBUCxFQUFnQyxTQUFDLENBQUQsRUFBSSxTQUFKLEdBQUE7QUFFOUIsTUFBQSxXQUFBO0FBQUEsRUFBTTs2QkFFSjs7QUFBQSwwQkFBQSxNQUFBLEdBQVEsU0FBQyxPQUFELEdBQUE7QUFDTixNQUFBLENBQUEsQ0FBRSxPQUFGLENBQVUsQ0FBQyxNQUFYLENBQWtCLFNBQVMsQ0FBQyxPQUFWLENBQWtCO0FBQUEsUUFBQyxJQUFBLEVBQU0sTUFBUDtBQUFBLFFBQWMsR0FBQSxFQUFLLFFBQW5CO09BQWxCLENBQWxCLENBQUEsQ0FBQTthQUNBLENBQUEsQ0FBRSxPQUFGLENBQVUsQ0FBQyxNQUFYLENBQWtCLFNBQVcsQ0FBQSxpQkFBQSxDQUFYLENBQTZCO0FBQUEsUUFBQyxJQUFBLEVBQU0sTUFBUDtPQUE3QixDQUFsQixFQUZNO0lBQUEsQ0FBUixDQUFBOzt1QkFBQTs7TUFGRixDQUFBO1NBTUEsWUFSOEI7QUFBQSxDQUFoQyxDQUFBLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJkZWZpbmUgWydqcXVlcnknLCAndGVtcGxhdGVzJ10sICgkLCB0ZW1wbGF0ZXMpIC0+XG5cbiAgY2xhc3MgRXhhbXBsZVZpZXdcblxuICAgIHJlbmRlcjogKGVsZW1lbnQpIC0+XG4gICAgICAkKGVsZW1lbnQpLmFwcGVuZCB0ZW1wbGF0ZXMuZXhhbXBsZSh7bmFtZTonSmFkZScsIGNzczonc3R5bHVzJ30pXG4gICAgICAkKGVsZW1lbnQpLmFwcGVuZCB0ZW1wbGF0ZXNbJ2Fub3RoZXItZXhhbXBsZSddKHtuYW1lOidKYWRlJ30pXG5cbiAgRXhhbXBsZVZpZXciXX0=