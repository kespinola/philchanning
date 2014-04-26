/**
 * Created by ksespinola on 4/5/14.
 */

(function($) {
    $(function(){
        $('document').ready(function($){
            var $window = $(window);

            function initialize() {
                var mapOptions = {
                    center: new google.maps.LatLng(34.417290,-119.672026),
                    zoom: 15,
                    mapTypeId:'satellite'
                };
                var map = new google.maps.Map(document.getElementById("map-canvas"),
                    mapOptions);
                    map.setTilt(45);
            }
            google.maps.event.addDomListener(window, 'load', initialize);

            $window.verticalCenterEle = function(el){
                var height = null;

                if(this.width() < 768){
                    height = 0;
                }else{
                    height = Math.abs((this.height() - $(el).height())/2) - 100;
                }

                $(el).css({
                    'top': height
                });
            };

            $window.resize(function(){
                  $window.verticalCenterEle('form')
            });


            $window.verticalCenterEle('form');

        })
    })
})(jQuery);