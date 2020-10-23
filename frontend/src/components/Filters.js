import { StyleSheet, css } from 'aphrodite';
import React, { useEffect, useRef, useState } from "react";
let Filters = (props)=>{
    const [rides, showRides] = useState(false);
    const styles = StyleSheet.create({
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
        rides:{
            padding:'20px'
        },
        ride:{
            border:'solid green',
            height:'40px',
            borderRadius:'10px',
            backgroundColor:'green',
            marginTop:'20px'
        }
    })
    return(
        <div>
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
                <button onClick={()=>{showRides(true)}}className={css(styles.go)}>go</button>
            </div>
            {rides?
                <div className={css(styles.rides)}>
                    <div className={css(styles.ride)}>3:30      BAmboozeld fawn      M / 27</div>
                    <div className={css(styles.ride)}></div>
                </div>
            :null}
            
        </div>
    )
}
export default Filters