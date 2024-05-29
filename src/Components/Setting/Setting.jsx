import React from 'react'
import { SlidBarSetting, SlidProfile } from '../ImportFile'
import { Outlet } from 'react-router-dom'
import "./StyleSetting.css"
export default function Setting() {
  return (
    <div className="container">
    <div className="row d-flex text-center">
      <div className="col-md-3">
        <SlidBarSetting />
      </div>
      <div className="col-md-9">
      <Outlet />
      </div>
    </div>
    </div>
  )
}
