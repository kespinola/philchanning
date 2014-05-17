/**
 * Created by ksespinola on 4/5/14.
 */

(function($) {
    $(function(){
        $('document').ready(function($){

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

        })
    })
})(jQuery);