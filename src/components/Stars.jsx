import React from 'react'
import Star from "../assets/star2.svg"
import "../App.css"
const Stars = () => {
  return (
    <div className=''> 
        <div><img src={Star} alt="" className="w-14 absolute left-2 hover:scale-150 duration-200 star opacity-35 z-10"></img></div>
        <div><img src={Star} alt="" className="w-32 absolute right-5 hover:scale-50 duration-200 z-10 "></img></div>
        <div><img src={Star} alt="" className="w-16 absolute right-[20%] hover:scale-150 duration-200 z-10 "></img></div>
        <div><img src={Star} alt="" className="w-14 absolute left-[20%] top-[22%] hover:scale-150 duration-200 z-10"></img></div>
        <div><img src={Star} alt="" className="w-24 absolute top-[50%] left-[10%] hover:scale-150 duration-200 z-10"></img></div>
        <div><img src={Star} alt="" className="w-14 absolute top-[60%] right-[30%] hover:scale-150 duration-200 z-10"></img></div>
        <div><img src={Star} alt="" className="w-14 absolute top-[60%] left-[50%] hover:scale-150 duration-200  opacity-35 z-10"></img></div>
    </div>
  )
}

export default Stars