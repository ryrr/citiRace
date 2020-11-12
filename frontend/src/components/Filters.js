import { StyleSheet, css } from 'aphrodite';
import React, { useEffect, useRef, useState } from "react";
import Ride from './Ride.js'
let Filters = (props)=>{
    const [rides, setRides] = useState(false);
    const [gender,setGender] = useState(1)
    const [type,setType] = useState(1)
    const styles = StyleSheet.create({
        container:{
            display:'flex',
            flexDirection:'column',
            justifyContent:"center",
            alignItems:'center'
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
        filters:{
            display:'flex',
            flexDirection:'row',
            marginTop:'20px',
        },
        dropdown:{
            fontFamily:'helvetica',
            fontSize:'12pt',
            opacity:'0.9',
            padding:'10px',
            color:'grey',
            borderRadius:'5px',
           
        },
        ridesDiv:{
            maxHeight:'200px',
            overflowX:'hidden',
            overflowY:'auto',
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            width:'100%',
            padding:'50px',
            marginTop:'30px'
        }
    })
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
    let formRide = (ride)=>{
        let gender,name,time,age
        if(ride['gender']===1){gender='M'}
        if(ride['gender']===2){gender='F'}
        if(ride['gender']===0){gender='O'}
        age = 2020-(ride['birth year'])
        name = 'Bingus Chops'
        time = secToMin(ride['tripduration'])
        let formedRide ={
            name:'Bingus Chops',
            age:age,
            gender:gender,
            time:time
        }
        return formedRide
    }
    let makeRides = async()=>{
        console.log('called')
        let ss = (props.ss).replace(/ /g,"_");
        let es = (props.es).replace(/ /g,"_");
        let resp = await fetch(`http://localhost:3000/rides/${ss}/${es}/${gender}/${type}`)
        let themrides = await resp.json()
        console.log(resp)
        let ridess = []
        let counter = 0
        for (let ride of themrides){
            let formedRide = formRide(ride)
            ridess.push(<Ride key={counter} gender={formedRide['gender']} name={formedRide['name']} age={formedRide['age']} time={formedRide['time']}></Ride>)
            counter+=1
        }
        setRides(ridess)
    }
    return(
        <div className={css(styles.container)}>
            <div className={css(styles.filters)}>
                <select onChange={(e)=>{setType(e.target.value)}}className={css(styles.dropdown)}>
                    <option value={1}>fastest</option>
                    <option value={-1}>slowest</option>
                </select>
                <select  onChange={(e)=>{setGender(e.target.value)}}className={css(styles.dropdown)}>
                    <option value={null}>people</option>
                    <option value={1}>men</option>
                    <option value={2}>women</option>
                </select>
                <select className={css(styles.dropdown)}>
                    <option>age</option>
                </select>
                <button onClick={()=>{makeRides()}}className={css(styles.go)}>go</button>
            </div>
            {rides? 
            <div className={css(styles.ridesDiv)}>
                {rides}
            </div>
            :null}
            
        </div>
    )
}
export default Filters