import React from "react";
import { StyleSheet, css } from 'aphrodite';
import Autocomplete from './Autocomplete.js'
import TextInput from 'react-autocomplete-input';
let stations = require('../data/stationNames.js')


let Input = (props)=>{

    const styles = StyleSheet.create({
        input:{
            height:'100px',
            display:'flex',
            position:'absolute',
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
            zIndex:'1',
            backgroundColor:'rgba(0,0,0,0.5)',
            top:'200px',
            borderRadius:'10px',
            padding:'10px',
            left:'100px',
			color:'white',
			fontFamily:'helvetica',
			width:'80%'
		},
		dropdown:{
			fontFamily:'helvetica',
			fontSize:'12pt',
			opacity:'0.9',
			padding:'10px',
			color:'grey',
			borderRadius:'5px'
		},
        to:{
            margin:'10px'
        }
    });
    const flyTo = (coordinates)=>{
        let map = props.map
        map.flyTo({
            center: coordinates,
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });
    }
  return(
	  <div className={css(styles.input)}>
          <select className={css(styles.dropdown)}>
              <option>fastest</option>
              <option>slowest</option>
          </select>
          <select className={css(styles.dropdown)}>
              <option>people</option>
              <option>men</option>
              <option>women</option>
          </select>
          <h2 className={css(styles.to)}>from</h2>
          <Autocomplete map={props.map}></Autocomplete>
          <h2 className={css(styles.to)}>to</h2>
		  <Autocomplete map={props.map}></Autocomplete>
	  </div>
  )
}

export default Input
