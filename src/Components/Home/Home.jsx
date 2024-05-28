import React from 'react'
import { SlidBar, SlidProfile } from '../ImportFile/index'
import "./StyleHome.css"
export default function Home() {
  return (
    <div className="container">
    <div className="row d-flex text-center">
      <div className="col-md-3">
        <SlidBar />
      </div>
      <div className="col-md-6">
        PostHome
      </div>
      <div className="col-md-3">
        <SlidProfile />
      </div>
    </div>
    </div>

  )
}

