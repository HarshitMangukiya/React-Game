import React from 'react'

const Die = (props) => {
const styles={
backgroundColor:props.isHeld?"pink":"white"
}
  return (
    <div className='die-face' style={styles} onClick={props.holdDice}>
     <h2>{props.value}</h2> 
    </div>
  )
}

export default Die
