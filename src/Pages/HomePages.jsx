import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';

export default function HomePages() {
  return (
    <>
      <Outlet />
    </>
  )
}