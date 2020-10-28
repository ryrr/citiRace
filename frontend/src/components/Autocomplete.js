import Autosuggest from 'react-autosuggest';
import React from "react";
import { StyleSheet, css } from 'aphrodite';
import rawStations from '../data/stations.json'

const stations = rawStations.features

   
    
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
    function escapeRegexCharacters(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    
    function getSuggestions(value) {
        const escapedValue = escapeRegexCharacters(value.trim());
        
        if (escapedValue === '') {
            return [];
        }
        
        const regex = new RegExp('^' + escapedValue, 'i');
        
        let filtered = stations.filter(station => regex.test(station.properties.name));
        return filtered.slice(0,3)
    }
    
    function getSuggestionValue(suggestion) {
        return suggestion.properties.name;
    }

    const flyTo = (coordinates,map)=>{
        //let map = props.map
        map.flyTo({
            center: coordinates,
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });
        //addPoint(coordinates,map)
    }
    const addPoint = (coordinates,map,name,type)=>{
        if(!map.getSource('toPoint')){
            initLayers(map)
        }
        if(type === 'to'){
            map.getSource('toPoint').setData({
                'type': 'FeatureCollection',
                'features': [
                    {
                        // feature for Mapbox DC
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': coordinates
                        },
                        'properties': {
                            'title': name
                        }
                    },
                ]
            })
        }
        else if(type==='from'){
            map.getSource('fromPoint').setData({
                'type': 'FeatureCollection',
                'features': [
                    {
                        // feature for Mapbox DC
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': coordinates
                        },
                        'properties': {
                            'title': name
                        }
                    },
                ]
            })
        }
    }
    const initLayers = (map)=>{
        map.addSource('toPoint', {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': [
                    {
                        // feature for Mapbox DC
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [0,0]
                        },
                        'properties': {
                            'title': 'null'
                        }
                    },
                ]
            }
        });

        map.addSource('fromPoint', {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': [
                    {
                        // feature for Mapbox DC
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [0,0]
                        },
                        'properties': {
                            'title': 'null'
                        }
                    },
                ]
            }
        });
        map.addLayer({
            'id': 'toPoint',
            'type': 'symbol',
            'source': 'toPoint',
            'layout': {
            'icon-image': 'custom-marker',
            // get the title name from the source's "title" property
            'text-field': ['get', 'title'],
            'text-font': [
            'Open Sans Semibold',
            'Arial Unicode MS Bold'
            ],
            'text-offset': [0, 1.25],
            'text-anchor': 'top'
            }
            });
        map.addLayer({
            'id': 'fromPoint',
            'type': 'symbol',
            'source': 'fromPoint',
            'layout': {
            'icon-image': 'custom-marker',
            // get the title name from the source's "title" property
            'text-field': ['get', 'title'],
            'text-font': [
            'Open Sans Semibold',
            'Arial Unicode MS Bold'
            ],
            'text-offset': [0, 1.25],
            'text-anchor': 'top'
            }
            });
        return map
    }
    const findValidPath = async(map)=>{
        //if the same dont fire request
        let fromPoint = map.getSource('fromPoint')['_data']['features'][0]['geometry']['coordinates']
        let toPoint = map.getSource('toPoint')['_data']['features'][0]['geometry']['coordinates']
        let fromName = map.getSource('fromPoint')['_data']['features'][0]['properties']['title']
        let toName = map.getSource('toPoint')['_data']['features'][0]['properties']['title']
        if(fromPoint[0]!=0 && toPoint[0]!=0){
            let pathName = fromName+'*'+toName
            let coordinateString = fromPoint.toString()+';'+toPoint.toString()
            let pathObj = await requestPath(coordinateString)
            console.log(pathObj)
            if(pathObj['code']!='Ok'){
                return null
            }
            else{
                return [pathName,pathObj]
            }
        }
        else{
            return null
        }
    }
    const requestPath = async(coordinateString)=>{
        let token = 'pk.eyJ1IjoicnlyciIsImEiOiJja2M1OXZ4NnMwZnUwMnhwamI0aTc1emlyIn0.RibSUPXtVIt2pcyZPrQocQ'
        let query = `https://api.mapbox.com/matching/v5/mapbox/cycling/${coordinateString}?access_token=${token}&steps=true&geometries=geojson&radiuses=15;15`
        let res = await fetch(query)
        let jsonRes = res.json()
        return await jsonRes
    }
    let drawPath= async(map,coords)=> {
        // If a route is already loaded, remove it
        if (map.getSource('route')) {
            map.removeLayer('route')
            map.removeSource('route')
        } 
       
        map.addLayer({
            "id": "route",
            "type": "line",
            "source": {
                "type": "geojson",
                "data": {
                "type": "Feature",
                "properties": {},
                "geometry": coords
                }
            },
            "layout": {
                "line-join": "round",
                "line-cap": "round"
            },
            "paint": {
                "line-color": "#03AA46",
                "line-width": 8,
                "line-opacity": 0.8
            }
        });
       
    }
    const showArea = async(coordinates,map,name,type,validate)=>{
        flyTo(coordinates,map)
        addPoint(coordinates,map,name,type)
        let resp = await findValidPath(map)
        if(resp){
            let pathGeometry = resp[1]
            let cords = pathGeometry.matchings[0].geometry
            let x = await drawPath(map,cords)
            validate(resp)
        }
        else{
            console.log('bad/incomplete path')
            validate(false)
        }
        

        //let pathGeometry = await makePath('-73.97793172,40.72082834;-73.98085795,40.7208736',map)
        //console.log(pathGeometry)
    }
    
    
    
    class Autocomplete extends React.Component {
        constructor() {
            super();
        
            this.state = {
                value: '',
                suggestions: []
            };    
        }
       renderSuggestion = (suggestion) =>{
            return (
                <span style={{}} onClick={()=>showArea(suggestion.geometry.coordinates,this.props.map,suggestion.properties.name,this.props.type,this.props.validate)}>{suggestion.properties.name}</span>
            );
        }
        onChange = (event, { newValue, method }) => {
            this.setState({
                value: newValue
            });
        };
        
        onSuggestionsFetchRequested = ({ value }) => {
            //console.log(value)
            this.setState({
                suggestions: getSuggestions(value)
            });
        };
        
        onSuggestionsClearRequested = () => {
            this.setState({
                suggestions: []
            });
        };
        
        render() {
            const { value, suggestions } = this.state;
            const inputProps = {
                placeholder: "station",
                value,
                onChange: this.onChange
            };
            return (
            <Autosuggest 
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps} />
            );
        }
    }
    export default Autocomplete