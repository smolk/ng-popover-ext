/**
 * Created with Lightsaber and Force.
 * User: yaroslav
 * Date: 9/16/15
 * Time: 2:30 PM
 * with Love for Angular & Angular UI
 *
 *
 *
 */


(function(angular){
    'use strict';

    var module = angular.module('uiPopoverExt', ['ui.bootstrap']);

    module
        .config(function($tooltipProvider) {
            $tooltipProvider.setTriggers({'open': 'close'});
        })

        .directive('popoverToggle', function($timeout) {
            return {
                scope: true,
                link: function(scope, element, attrs) {
                    var bUnique = angular.isDefined(attrs['popoverUnique']);

                    function _removePopovers(){
                        var popovers = document.querySelectorAll('.popover');
                        angular.forEach(popovers, function(p){
                            var _p = angular.element(p);
                            _p.scope().$parent.isOpen = false;
                            _p.scope().$parent.$parent.openned = false;
                            _p.remove();
                        });
                    }

                    scope.dismiss = function() {
                        if (!scope.openned && bUnique) {
                            _removePopovers();
                        }
                        $timeout(function() {
                            element.triggerHandler(scope.openned ? 'close' : 'open');
                            scope.openned = !scope.openned;
                        });
                    };
                    return element.on('click', scope.toggle);
                }
            };
        });

})(angular);
