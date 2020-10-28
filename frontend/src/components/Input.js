import { StyleSheet, css } from 'aphrodite';
import Autocomplete from './Autocomplete.js'
import Filters from './Filters.js'
import React, { useEffect, useRef, useState } from "react";

let Input = (props)=>{
    const [ss, setSs] = useState(false);
    const [es, setEs] = useState(false);
    const [validPath, setValidPath] = useState(false);
    const [pathInfo,setPathInfo] = useState(false)
    const [info, showInfo] = useState(false);
    const [filters, showFilters] = useState(false);
    let validatePath = (x)=>{
        if(x){
            setValidPath(x[0])
            setPathInfo(x[1])
            let paths = x[0].split('*')
            setSs(paths[0])
            setEs(paths[1])
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
            top:'150px',
            borderRadius:'10px',
            padding:'10px',
            left:'100px',
			color:'white',
            fontFamily:'helvetica',
            paddingLeft:'30px',
            paddingRight:'30px'
			
        },
        info:{
            zIndex:'1', 
            backgroundColor:'rgba(0,0,0,0.5)',
            position:'fixed',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            flexDirection:'column',
            width:'490px',
            top:'120px',
            left:'25px',
            borderRadius:'10px',
            padding:'15px',
            color:'white'
            
        },
        mapInfo:{
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            width:'80%'
        }, 
        heading:{
            display:'flex',
            width:'100%'
        },
        pathName:{
           
        },
        filters:{
            display:'flex',
            flexDirection:'row',
            marginTop:'20px'
            
        },
		dropdown:{
			fontFamily:'helvetica',
			fontSize:'12pt',
			opacity:'0.9',
			padding:'10px',
			color:'grey',
            borderRadius:'5px',
           
		},
        to:{
            marginLeft:'10px',
            marginRight:'10px',
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
        },
        stat:{
            fontSize:'20pt'
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
                <div className={css(styles.heading)}>
                    <i onClick={()=>{showInfo(false)}} class="fas fa-arrow-circle-left fa-3x" style={{marginTop:'10px',marginRight:'10px',cursor:'pointer'}} ></i>
                    <h2 className={css(styles.pathName)}>{ss}</h2>
                    <h2 className={css(styles.to)}>to</h2>
                    <h2 className={css(styles.pathName)}>{es}</h2>
                </div>
                <div className={css(styles.mapInfo)}>
                    <h2>Estimate</h2>
                    <h2>Distance</h2>
                    <h2>Difficulty</h2>
                </div>
                <div className={css(styles.mapInfo)}>
                    <h2 className={css(styles.stat)}>{secToMin(pathInfo.matchings[0]['duration'])}</h2>
                    <h2 className={css(styles.stat)}>{meterToMiles(pathInfo.matchings[0]['distance'])} miles</h2>
                    <h2 className={css(styles.stat)}>{pathInfo.matchings[0]['weight']}</h2>
                </div>
                {filters?<i onClick={()=>{showFilters(false)}} class="fas fa-chevron-up fa-3x" style={{cursor:'pointer'}}></i>:<i onClick={()=>{showFilters(true)}} class="fas fa-chevron-down fa-3x" style={{cursor:'pointer'}}></i>}
                {filters?<Filters ss={ss} es={es}></Filters>:null}
            </div>
        )
    }

}

export default Input
