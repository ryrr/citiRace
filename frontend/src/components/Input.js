import { StyleSheet, css } from 'aphrodite';
import Autocomplete from './Autocomplete.js'
import React, { useEffect, useRef, useState } from "react";

let Input = (props)=>{
    const [validPath, setValidPath] = useState(false);
    const [pathInfo,setPathInfo] = useState(false)
    const [info, showInfo] = useState(false);
    let validatePath = (x)=>{
        if(x){
            setValidPath(x[0])
            setPathInfo(x[1])
        }
        else{
            setValidPath(false)
        }
    }
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
			width:'40%'
        },
        info:{
            zIndex:'1', 
            backgroundColor:'rgba(0,0,0,0.5)',
            position:'fixed',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            flexDirection:'column',
            width:'450px',
            top:'120px',
            left:'25px',
            border:'solid red',
            color:'white'
            
        },
        mapInfo:{
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            width:'80%'
        }, 
        filters:{
            display:'flex',
            flexDirection:'row'
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
        },
        go:{
            marginLeft:'20px',
            height:'42px',
            width:'50px',
            borderRadius:'10px',
            ":focus":{outline:'none'},
            backgroundColor:"#03AA46",
            color:'white'
        },
        invalid:{
            color:'red',
            margin:'20px'
        }
    });

    const secToMin = (sec)=>{
        sec = Number(sec)
        let mins = Math.floor(sec/60)
        let seconds = Math.floor(sec%60)
        let minSecs
        if(seconds<10){
            minSecs = mins+':'+seconds+'0'
        }
        else{
            minSecs = mins+':'+seconds
        }
        return minSecs
    }
    const meterToMiles =(i)=> {
        let miles = Math.round( (i*0.000621371192) * 10) / 10
        return miles
    }
    if(!info){
        return(
            <div className={css(styles.input)}>
                <Autocomplete type={'from'} map={props.map} validate={(x)=>{validatePath(x)}}></Autocomplete>
                <h2 className={css(styles.to)}>to</h2>
                <Autocomplete type={'to'} map={props.map} validate={(x)=>{validatePath(x)}}></Autocomplete>
                {validPath?<button onClick={()=>{showInfo(true)}}className={css(styles.go)}>go</button>:<h2 className={css(styles.invalid)}>invalid path</h2>}
            </div>
        )
    }
    else{
        return(
            <div className={css(styles.info)}>
                <button onClick={()=>{showInfo(false)}}>BACK</button>
                <h2>{validPath}</h2>
                <div className={css(styles.mapInfo)}>
                    <h2>{secToMin(pathInfo.matchings[0]['duration'])}</h2>
                    <h2>{meterToMiles(pathInfo.matchings[0]['distance'])} miles</h2>
                    <h2>{pathInfo.matchings[0]['weight']}</h2>
                </div>
                <div className={css(styles.filters)}>
                    <select className={css(styles.dropdown)}>
                        <option>fastest</option>
                        <option>slowest</option>
                    </select>
                    <select className={css(styles.dropdown)}>
                        <option>people</option>
                        <option>men</option>
                        <option>women</option>
                    </select>
                </div>
            </div>
        )
    }

}

export default Input
