var GoogleMapsRender = function(args) {
    this.routes = {};
    this.requestedFromGoogle = false;
    this.options = {
        mapSaturation:'-100',
        mapHue:'#000000',
        jsonbaseRequest:'/csstemplates/template/default/dynamic/google/',
        markerImage:'/images/needle.png',
        markerWidth:'17',
        tripColor:'rgba(255,0,0,0.5)',
        markerHeight:'38',
        markerOrientationLeft:'4',
        zoom:12,
        markerOrientationBottom:'35',
        mapCenter : new google.maps.LatLng(42.16953, -75.129335)
    }
    for(val in args) {
        if(args.hasOwnProperty(val)) {
            this.options[val] = args[val];
        }
    }
    this.options = args;
}
GoogleMapsRender.prototype = {
    init : function(container) {
        this.map = new google.maps.Map(container, {
            center: this.options.mapCenter,
            mapTypeControlOptions: {
                mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
            },
            zoom: this.options.zoom
        });
        var styles = [
            {
                stylers: [
                    { hue: this.options.mapHue },
                    { saturation: this.options.mapSaturation }
                ]
            },{
                featureType: "road",
                elementType: "geometry",
                stylers: [
                    { lightness: 100 },
                    { visibility: "simplified" }
                ]
            },{
                featureType: "administrative.country",
                elementType: "labels",
                stylers: [
                    { visibility: "off" }
                ]
            },{
                featureType: "administrative.province",
                elementType: "labels",
                stylers: [
                    { visibility: "off" }
                ]
            }
        ];
        var styledMap = new google.maps.StyledMapType(styles,
            {name: "Route"});
        this.map.mapTypes.set('map_style', styledMap);
        this.map.setMapTypeId('map_style');

        this.directionsService = new google.maps.DirectionsService;
        this.directionsDisplay = new google.maps.DirectionsRenderer({
            suppressMarkers: true,
            polylineOptions: {
                strokeColor: this.options.tripColor
            }
        });
        this.directionsDisplay.setMap(this.map);
    },
    refreshRoute: function(routename,data) {
        var that = this;
        var routeloader = $('.routeloader');
        $button = $('<a href="javascript:;" class="btn btn-success" style="float:left;margin:4px;"><span class="icon-pencil-square-o"></span> Draw ' + routename + '</a>');
        $button.on('click', function () {
            that.drawRoute(routename);
        });
        $button = null;
        that.loadRouteFromArray(routename,data);

        that.drawRoute(routename);

    },
    loadRoute: function(routename,callback) {
        var that = this;
        $.getJSON(this.options.jsonbaseRequest+this.options.jsonbaseName+'-'+routename+'-route.json',function(xdata){
            try {
                that.routes[routename].renderData = xdata;
            }
            catch(e) {
                console.log(e.stack);
            }
            callback( that.routes[routename].renderData);
        });
    },
    clearAllMarkers : function()  {
        for(var routename in this.routes) {
            if(this.routes.hasOwnProperty(routename) && typeof routename == 'string') {
                if (this.routes[routename] && typeof this.routes[routename].markers !== 'undefined') {
                    for (i in this.routes[routename].markers) {
                        if (typeof this.routes[routename].markers[i] !== 'undefined') {
                            this.routes[routename].markers[i].setVisible(false);
                        }
                    }
                }
            }
        }
    },
    makeEmptyRoute: function(routename) {
        this.clearAllMarkers();
        this.routes[routename] = {};
        this.routes[routename].markers = [];
        this.routes[routename].waypoints = [];
        this.routes[routename].legs = [];
        this.routes[routename].renderData = [];
        this.routes[routename].isCompiled = false;
        this.routes[routename].compiled = null;
    },
    addRoutePoint: function(routename,lon,lat,hasMarker) {
        if(typeof this.routes[routename] === 'undefined') {
            this.makeEmptyRoute(routename);
        }
        this.routes[routename].legs.push({
            location: new google.maps.LatLng(lat, lon),
            lat: lat,
            lon: lon,
            marker: hasMarker=="1"
        });
        this.routes[routename].waypoints.push({
            location: new google.maps.LatLng(lat, lon),
            stopover: true
        });
    },
    loadRouteFromArray:function(routename,points) {
        if(typeof this.routes[routename] !== 'undefined') {
            this.makeEmptyRoute(routename);
        }
        for(c in points) {

            this.addRoutePoint(routename,points[c].lon,points[c].lat,points[c].mrk);
        }
    },
    createMarker : function(latlng) {
        var clickMarkerIcon = {
            url: this.options.markerImage,
            /*The size image file.*/
            size: new google.maps.Size(this.options.markerWidth, this.options.markerHeight),
            /*The point on the image to measure the anchor from. 0, 0 is the top left.*/
            origin: new google.maps.Point(0, 0),
            /*The x y coordinates of the anchor point on the marker. e.g. If your map marker was a drawing pin then the anchor would be the tip of the pin.*/
            anchor: new google.maps.Point(this.options.markerOrientationLeft, this.options.markerOrientationBottom)

        };
        var clickMarker = new google.maps.Marker({
            position: latlng,
            /** to prevent clipping on tile edges */
            optimized: false,
            map: this.map,
            title: '',
            icon: clickMarkerIcon,
            zIndex:20000,
        });
        google.maps.event.addListener(clickMarker, 'mouseout', function() {
        });
        google.maps.event.addListener(clickMarker, 'mouseover', function() {
        });
        return clickMarker
    },

    drawRoute: function(name) {
        if(this.routes[name].renderData.length === 0) {
            var that = this;
            this.loadRoute(name,function(details) {
                if (details !== null) {
                    that.renderRoute(name);
                }
            });
        }
        else {
            this.renderRoute(name);
        }

    },
    renderRoute: function(name) {
        var that = this;
        this.directionsDisplay.setDirections(this.routes[name].renderData[0]);

        var legs = this.routes[name].legs;

        for (var i = 0; i < legs.length; i++) {
            if (Boolean(legs[i].marker)) {
                var marker = this.createMarker(legs[i].location);
                this.routes[name].markers.push(marker);
            }


        }


    }
};

