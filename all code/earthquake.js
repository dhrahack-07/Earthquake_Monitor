// 1. Create the Earth instance
const myEarth = Globe()(document.getElementById('3dGlobe'))
    .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
    .width(1200)
    .height(450);

myEarth.controls().autoRotate = true;
myEarth.controls().autoRotateSpeed = 0.6;
myEarth.controls().enableZoom = false;

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
            .ringColor(() => '#ffffff') 
            .ringMaxRadius(d => Math.max(d.properties.mag * 2, 3)) 
            .ringRepeatPeriod(() => 1000)
            .ringAltitude(() => 0.02); 
    })
    .catch(error => {
        console.error("The fetch chain broken somewhere:", error);
    });