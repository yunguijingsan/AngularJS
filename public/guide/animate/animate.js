/**
 * Created by lcf on 2015/1/26.
 */
var myModule = angular.module('myApp',[]);
myModule.animation('.repeated-item', function() {
    return {
        enter : function(element, done) {
            element.css('opacity',0);
            jQuery(element).animate({
                opacity: 1
            }, done);

            // optional onDone or onCancel callback
            // function to handle any post-animation
            // cleanup operations
            return function(isCancelled) {
                if(isCancelled) {
                    jQuery(element).stop();
                }
            }
        },
        leave : function(element, done) {
            element.css('opacity', 1);
            jQuery(element).animate({
                opacity: 0
            }, done);

            // optional onDone or onCancel callback
            // function to handle any post-animation
            // cleanup operations
            return function(isCancelled) {
                if(isCancelled) {
                    jQuery(element).stop();
                }
            }
        },
        move : function(element, done) {
            element.css('opacity', 0);
            jQuery(element).animate({
                opacity: 1
            }, done);

            // optional onDone or onCancel callback
            // function to handle any post-animation
            // cleanup operations
            return function(isCancelled) {
                if(isCancelled) {
                    jQuery(element).stop();
                }
            }
        },

        // you can also capture these animation events
        addClass : function(element, className, done) {},
        removeClass : function(element, className, done) {}
    }
});
