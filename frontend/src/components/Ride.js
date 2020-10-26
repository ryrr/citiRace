import { StyleSheet, css } from 'aphrodite';
import React, { useEffect, useRef, useState } from "react";
let Ride = (props)=>{
    const styles = StyleSheet.create({
        rides:{
            width:'100%',
        },
        ride:{
            border:'solid green',
            height:'40px',
            borderRadius:'10px',
            backgroundColor:'green',
            marginBottom:'20px',
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center',
            paddingRight:'15px',
            paddingLeft:'15px',
            fontSize:'12pt'

        },
        time:{
            fontFamily:'helvetica',
            fontSize:'23pt'
        },
        name:{
           

        }
    })
    return(
        <div className={css(styles.rides)}>
            <div className={css(styles.ride)}>
                <div className={css(styles.time)}>{props.time}</div>
                <div className={css(styles.name)}>{props.name}</div>
                <div className={css(styles.personal)}>{props.sex}/{props.age}</div>
            </div>
        </div>
    )
}
export default Ride