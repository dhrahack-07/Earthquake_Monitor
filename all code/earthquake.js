// 1. Create the Earth instance
const myEarth = Globe()(document.getElementById('3dGlobe'))
    .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
    .width(document.getElementById('3dGlobe').clientWidth)
    .height(document.getElementById('3dGlobe').clientHeight);

myEarth.controls().autoRotate = true;
myEarth.controls().autoRotateSpeed = 0.6;
myEarth.controls().enableZoom = false;

// 2. This alternative API url queries ALL magnitudes for maximum density
// This URL filters the data to ONLY show earthquakes with a magnitude of 4.5 or greater
const APIURL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson';

console.log("Attempting to fetch seismic data...");

fetch(APIURL)
    .then(response => response.json())
    .then(data => {
        console.log("Successfully connected! Found " + data.features.length + " earthquakes.");

        // 3. Map out the visual parameters
        myEarth.ringsData(data.features)
            .ringLng(d => d.geometry.coordinates[0]) 
            .ringLat(d => d.geometry.coordinates[1]) 
            .ringColor(() => '#ffffff') // Pure glowing white
            .ringMaxRadius(d => Math.max(d.properties.mag * 2, 3)) // Ensuring smaller quakes show up clearly
            .ringPropagationSpeed(() => 1.5)
            .ringRepeatPeriod(() => 1000)
            .ringAltitude(() => 0.02); // This pushes the rings slightly ABOVE the globe surface so they don't hide
    })
    .catch(error => {
        console.error("The fetch chain broken somewhere:", error);
    });