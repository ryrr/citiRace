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
  const [done, setDone] = useState(false);
  const mapContainer = useRef(null);

  useEffect(() => {
	const initializeMap = ({ setMap, mapContainer }) => {
		const map = new mapboxgl.Map({
			container: mapContainer.current,
			style: "mapbox://styles/mapbox/dark-v10", // stylesheet location
			center: [-74.0066, 40.7135],
			zoom: 12.5,
			pitch: 45,
			bearing: -10.6,
			antialias: true
		});
		setMap(map)
		setDone(true)
		

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

			
		});
	};

	if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);
  return(
  		<div  ref={el => (mapContainer.current = el)} style={styles}>
			{done ? <Input map={map}></Input>:null} 
		</div>
  )
};

export default MapboxGLMap;