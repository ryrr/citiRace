import { StyleSheet, css } from 'aphrodite';
import React, { useEffect, useRef, useState } from "react";
import Ride from './Ride.js'
let Filters = (props)=>{
    const [rides, setRides] = useState(false);
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
    let getRides = ()=>{
        let doesrides = [{
            "name": "Spanish Moss",
            "age": 53,
            "time": "20:06",
            "sex": "F"
            }, {
            "name": "Fernleaf Biscuitroot",
            "age": 76,
            "time": "3:15",
            "sex": "F"
            }, {
            "name": "Cathedral Bluff Meadow-rue",
            "age": 78,
            "time": "7:17",
            "sex": "F"
            }, {
            "name": "Lengua De Vaca",
            "age": 15,
            "time": "4:18",
            "sex": "F"
            }, {
            "name": "Blood-flower",
            "age": 46,
            "time": "2:26",
            "sex": "F"
            }, {
            "name": "Variableleaf Flymallow",
            "age": 60,
            "time": "0:43",
            "sex": "F"
            }, {
            "name": "Shady Woodsorrel",
            "age": 19,
            "time": "11:33",
            "sex": "F"
            }, {
            "name": "Bitterbush",
            "age": 80,
            "time": "7:01",
            "sex": "F"
            }, {
            "name": "Intricate Rim Lichen",
            "age": 16,
            "time": "19:44",
            "sex": "M"
            }, {
            "name": "Walkingstick Cactus",
            "age": 44,
            "time": "21:46",
            "sex": "F"
            }, {
            "name": "Cetraria Lichen",
            "age": 65,
            "time": "23:13",
            "sex": "M"
            }, {
            "name": "Mt. Tedoc Linanthus",
            "age": 31,
            "time": "13:05",
            "sex": "M"
            }, {
            "name": "Pyrenocollema Lichen",
            "age": 64,
            "time": "19:01",
            "sex": "M"
            }, {
            "name": "Oriental Lady's Thumb",
            "age": 76,
            "time": "18:45",
            "sex": "M"
            }, {
            "name": "Fewleaf Sunflower",
            "age": 65,
            "time": "20:21",
            "sex": "M"
            }, {
            "name": "Pore Lichen",
            "age": 57,
            "time": "23:02",
            "sex": "F"
            }, {
            "name": "Salt Spring Checkerbloom",
            "age": 23,
            "time": "9:31",
            "sex": "M"
            }, {
            "name": "Dominican Signalgrass",
            "age": 34,
            "time": "10:25",
            "sex": "F"
            }, {
            "name": "Groundberry",
            "age": 1,
            "time": "3:18",
            "sex": "M"
            }, {
            "name": "White Kauai Rosemallow",
            "age": 36,
            "time": "19:51",
            "sex": "F"
            }]
        return doesrides 
    }
    let makeRides = ()=>{
        let themrides = getRides()
        let ridess = []
        for (let ride of themrides){
            ridess.push(<Ride sex={ride['sex']} name={ride['name']} age={ride['age']} time={ride['time']}></Ride>)
        }
        setRides(ridess)
    }
    return(
        <div className={css(styles.container)}>
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