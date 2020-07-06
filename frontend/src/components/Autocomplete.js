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
                <span onClick={flyTo(suggestion.geometry.coordinates,this.props.map)}>{suggestion.properties.name}</span>
            );
        }
        onChange = (event, { newValue, method }) => {
            this.setState({
                value: newValue
            });
        };
        
        onSuggestionsFetchRequested = ({ value }) => {
            console.log(value)
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