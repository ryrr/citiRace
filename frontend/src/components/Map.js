import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
mapboxgl.accessToken = 'pk.eyJ1IjoicnlyciIsImEiOiJja2M1OXZ4NnMwZnUwMnhwamI0aTc1emlyIn0.RibSUPXtVIt2pcyZPrQocQ';
import Input from './Input.js'

const styles = {
  width: "calc(100vw)",
  height: "calc(100vh)",
  position: "absolute"
};

const MapboxGLMap = () => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  useEffect(() => {
	const initializeMap = ({ setMap, mapContainer }) => {
		const map = new mapboxgl.Map({
			container: mapContainer.current,
			style: "mapbox://styles/mapbox/dark-v10", // stylesheet location
			center: [-74.0066, 40.7135],
			zoom: 11.5,
			pitch: 45,
			bearing: -10.6,
			antialias: true
		});

		setMap(map)


	  map.on("load", () => {
	
		var layers = map.getStyle().layers;
		for (var i = 0; i < layers.length; i++) {
			if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
			// remove text labels
				map.removeLayer(layers[i].id);
			}
		}
		function rotateCamera(timestamp) {
			// clamp the rotation between 0 -360 degrees
			// Divide timestamp by 100 to slow rotation to ~10 degrees / sec
			map.rotateTo((timestamp / 100) % 360, { duration: 0 });
			// Request the next frame of the animation.
			requestAnimationFrame(rotateCamera);
		}

		map.addSource('points', {
			'type': 'geojson',
			'data': {
				'type': 'FeatureCollection',
				'features': [
					{
						// feature for Mapbox DC
						'type': 'Feature',
						'geometry': {
							'type': 'Point',
							'coordinates': [-73.99596 , 40.718822]
						},
						'properties': {
							'title': 'Eliz and Grand',
							'icon': 'monument',
						}
					}
				]
			}
		});
		
		map.addLayer({
			'id': 'points',
			'type': 'symbol',
			'source': 'points',
			'layout': {
			// get the icon name from the source's "icon" property
			// concatenate the name to get an icon from the style's sprite sheet
			'icon-image': ['concat', ['get', 'icon'], '-15'],
			// get the title name from the source's "title" property
			'text-field': ['get', 'title'],
			'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
			'text-offset': [0, 0.6],
			'text-anchor': 'top',
		
			}
		});

		
	  });

	
	};

	if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  return(
  		<div  ref={el => (mapContainer.current = el)} style={styles}>
			  <Input map={map}></Input>
		</div>
  )
};

export default MapboxGLMap;