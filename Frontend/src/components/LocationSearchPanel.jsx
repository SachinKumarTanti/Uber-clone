import React, { useState } from 'react'

const LocationSearchPanel = ({ setSuggestion,suggestions, setVehiclePanel, setPanelOpen, setPickup, setDestination, activeField }) => {

    const handleSuggestionClick = (suggestion) => {
        if (activeField === 'pickup') {
            setPickup(suggestion)
        } else if (activeField === 'destination') {
            setDestination(suggestion)
        }
       // setVehiclePanel(true)
       // setPanelOpen(false)
       setSuggestion([]);
    }
  return (

    <>
     {
      suggestions.map((elem, idx) => (
       <div key={idx} onClick={() => handleSuggestionClick(elem)} className='flex gap-4 border-2 border-gary-50 active:border-black rounded-xl p-2 items-center justify-start mb-4'>
        <h2 className='flex items-center justify-center bg-[#eee] h-10 w-16 rounded-full'><i className='ri-map-pin-fill'/></h2>
        <h4 className='font-semibold pl-3'>{elem}</h4>
       </div>
      ))
     }
    </>
  )
}

export default LocationSearchPanel