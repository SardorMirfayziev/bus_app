import React, { useState } from 'react'

const Datepicker = ({ label, dateCallbakc }) => {
  const handleVal = e => {
    //dateCallbakc(e.target.value)
  }

  return (
    <div className='datepicker'>
      <span>{label} </span>
      <input type='date' value='2018-07-22' onChange={e => handleVal(e)} />
    </div>
  )
}

export default Datepicker
