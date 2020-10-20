import React, { useState, useEffect,useRef } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Input from './Input.js'
import Map from './Map.js'


let App = (props)=>{
	const styles = StyleSheet.create({
		input:{
			display:'flex',
			justifyContent:'center',
			alignItems:'center',
			border:'solid green'
		}
	});
	return(
		<div>
				<div className={css(styles.heading)}>
					<h1 className='title'>citiRaces</h1>
				</div>
				<Map></Map>
		</div>
	)
}

export default App
