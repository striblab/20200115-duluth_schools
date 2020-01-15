/**
 * Main JS file for project.
 */

/**
 * Define globals that are added through the js.globals in
 * the config.json file, here, mostly so linting won't get triggered
 * and its a good queue of what is available:
 */
// /* global $, _ */

// Dependencies
import utils from './shared/utils.js';

// Mark page with note about development or staging
utils.environmentNoting();



/**
 * Adding dependencies
 * ---------------------------------
 * Import local ES6 or CommonJS modules like this:
 * import utilsFn from './shared/utils.js';
 *
 * Or import libraries installed with npm like this:
 * import module from 'module';
 */


/**
 * Adding Svelte templates in the client
 * ---------------------------------
 * We can bring in the same Svelte templates that we use
 * to render the HTML into the client for interactivity.  The key
 * part is that we need to have similar data.
 *
 * First, import the template.  This is the main one, and will
 * include any other templates used in the project.
 *
 *   `import Content from '../templates/_index-content.svelte.html';`
 *
 * Get the data parts that are needed.  There are two ways to do this.
 * If you are using the buildData function to get data, then add make
 * sure the config for your data has a `local: "content.json"` property
 *
 *  1. For smaller datasets, just import them like other files.
 *     `import content from '../assets/data/content.json';`
 *  2. For larger data points, utilize window.fetch.
 *     `let content = await (await window.fetch('../assets/data/content.json')).json();`
 *
 * Once you have your data, use it like a Svelte component:
 *
 * const app = new Content({
 *  target: document.querySelector('.article-lcd-body-content'),
 *  hydrate: true,
 *  data: {
 *    content
 *  }
 * });
 */



// Common code to get svelte template loaded on the client and hack-ishly
// handle sharing
//
// import Content from '../templates/_index-content.svelte.html
//
// $(document).ready(() => {
//   // Hack to get share back
//   let $share = $('.share-placeholder').size()
//     ? $('.share-placeholder')
//       .children()
//       .detach()
//     : undefined;
//   let attachShare = !$share
//     ? undefined
//     : () => {
//       $('.share-placeholder').append($share);
//     };

//   // Main component
//   const app = new Content({
//     target: document.querySelector('.article-lcd-body-content'),
//     hydrate: true,
//     data: {
//       attachShare
//     }
//   });
// });

import scenario1 from '../sources/scenario1.json';
import scenario2 from '../sources/scenario2.json';
import scenario3 from '../sources/scenario3.json';


var center = [-92.06090600142731, 46.930417334742174];
var zoom = 8.4;

mapboxgl.accessToken = 'pk.eyJ1Ijoic3RhcnRyaWJ1bmUiLCJhIjoiY2sxYjRnNjdqMGtjOTNjcGY1cHJmZDBoMiJ9.St9lE8qlWR5jIjkPYd3Wqw';
var map1 = new mapboxgl.Map({
container: 'mapper1',
style: 'mapbox://styles/startribune/ck1b7427307bv1dsaq4f8aa5h',
center: center,
zoom: zoom
});
 
var geocoder1 = new MapboxGeocoder({
accessToken: mapboxgl.accessToken,
mapboxgl: mapboxgl
});

map1.scrollZoom.disable();
map1.dragRotate.disable();
// map1.doubleClickZoom.disable();
map1.touchZoomRotate.disableRotation();
 
document.getElementById('geocoder1').appendChild(geocoder1.onAdd(map1));

map1.on('load', function() {

    map1.addSource('nb1', {
        type: 'geojson',
        data: scenario1
      });

      map1.addLayer({
        'id': 'nb-layer1',
        'interactive': true,
        'source': 'nb1',
        'layout': {},
        'type': 'fill',
         'paint': {
            'fill-antialias' : true,
            'fill-opacity': 0.7,
            'fill-color':'#89B07D',
            'fill-outline-color': '#ffffff'
         }
    }, 'settlement-label');

    var popup1 = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    map1.on('mousemove', function(e) {
        var features = map1.queryRenderedFeatures(e.point, {
            layers: ['nb-layer1']
        });
        // Change the cursor style as a UI indicator.
        map1.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

        if (!features.length) {
            popup1.remove();
            return;
        }

        var feature = features[0];

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup1.setLngLat(e.lngLat)
            .setHTML(feature.properties.ES)
            .addTo(map1);
    });
});


var map2 = new mapboxgl.Map({
    container: 'mapper2',
    style: 'mapbox://styles/startribune/ck1b7427307bv1dsaq4f8aa5h',
    center: center,
    zoom: zoom
    });
     
var geocoder2 = new MapboxGeocoder({
accessToken: mapboxgl.accessToken,
mapboxgl: mapboxgl
});

map2.scrollZoom.disable();
map2.dragRotate.disable();
// map2.doubleClickZoom.disable();
map2.touchZoomRotate.disableRotation();
     
document.getElementById('geocoder2').appendChild(geocoder2.onAdd(map2));


map2.on('load', function() {

    map2.addSource('nb2', {
        type: 'geojson',
        data: scenario2
      });

      map2.addLayer({
        'id': 'nb-layer2',
        'interactive': true,
        'source': 'nb2',
        'layout': {},
        'type': 'fill',
         'paint': {
            'fill-antialias' : true,
            'fill-opacity': 0.7,
            'fill-color':'#b37862',
            'fill-outline-color': '#ffffff'
         }
    }, 'settlement-label');

    var popup2 = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    map2.on('mousemove', function(e) {
        var features = map2.queryRenderedFeatures(e.point, {
            layers: ['nb-layer2']
        });
        // Change the cursor style as a UI indicator.
        map2.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

        if (!features.length) {
            popup2.remove();
            return;
        }

        var feature = features[0];

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup2.setLngLat(e.lngLat)
            .setHTML(feature.properties.ES)
            .addTo(map2);
    });
});



var map3 = new mapboxgl.Map({
    container: 'mapper3',
    style: 'mapbox://styles/startribune/ck1b7427307bv1dsaq4f8aa5h',
    center: center,
    zoom: zoom
    });
 
var geocoder3 = new MapboxGeocoder({
accessToken: mapboxgl.accessToken,
mapboxgl: mapboxgl
});

map3.scrollZoom.disable();
map3.dragRotate.disable();
// map3.doubleClickZoom.disable();
map3.touchZoomRotate.disableRotation();

 
document.getElementById('geocoder3').appendChild(geocoder3.onAdd(map3));

map3.on('load', function() {

    map3.addSource('nb3', {
        type: 'geojson',
        data: scenario3
      });

      map3.addLayer({
        'id': 'nb-layer3',
        'interactive': true,
        'source': 'nb3',
        'layout': {},
        'type': 'fill',
         'paint': {
            'fill-antialias' : true,
            'fill-opacity': 0.7,
            'fill-color':'#80ADAD',
            'fill-outline-color': '#ffffff'
         }
    }, 'settlement-label');

    var popup3 = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    map3.on('mousemove', function(e) {
        var features = map3.queryRenderedFeatures(e.point, {
            layers: ['nb-layer3']
        });
        // Change the cursor style as a UI indicator.
        map3.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

        if (!features.length) {
            popup3.remove();
            return;
        }

        var feature = features[0];

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup3.setLngLat(e.lngLat)
            .setHTML(feature.properties.ES)
            .addTo(map3);
    });
});

$(".reset").on("click", function(){
    map1.flyTo({center: center, zoom: zoom});
    map2.flyTo({center: center, zoom: zoom});
    map3.flyTo({center: center, zoom: zoom});
});


!function(){"use strict";window.addEventListener("message",function(a){if(void 0!==a.data["datawrapper-height"])for(var e in a.data["datawrapper-height"]){var t=document.getElementById("datawrapper-chart-"+e)||document.querySelector("iframe[src*='"+e+"']");t&&(t.style.height=a.data["datawrapper-height"][e]+"px")}})}();