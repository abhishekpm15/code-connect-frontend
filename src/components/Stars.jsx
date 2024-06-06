import React from 'react'
import Star from "../assets/star2.svg"
import "../App.css"

const Stars = () => {
  const starPositions = [
    { class: "w-14 absolute left-2 top-2", scale: "150" },
    { class: "w-32 absolute right-5 top-10", scale: "50" },
    { class: "w-16 absolute right-[20%] top-20", scale: "150" },
    { class: "w-14 absolute left-[20%] top-[22%]", scale: "150" },
    { class: "w-24 absolute top-[50%] left-[10%]", scale: "150" },
    { class: "w-14 absolute top-[60%] right-[30%]", scale: "150" },
    { class: "w-14 absolute top-[60%] left-[50%]", scale: "150" },
    { class: "w-20 absolute bottom-10 left-10", scale: "150" },
    { class: "w-10 absolute bottom-20 right-10", scale: "200" },
    { class: "w-16 absolute top-10 right-[40%]", scale: "150" },
    { class: "w-14 absolute top-[80%] left-[30%]", scale: "150" },
  ];

  return (
    <div className='absolute w-full h-full'>
      {starPositions.map((pos, index) => (
        <div key={index}>
          <img 
            src={Star} 
            alt="star" 
            className={`${pos.class} hover:scale-${pos.scale} duration-200 star z-10`} 
          />
        </div>
      ))}
    </div>
  )
}

export default Stars
