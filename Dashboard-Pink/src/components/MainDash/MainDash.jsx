import React from 'react'
import './MainDash.css'
import Card from '../Cards/Cards'
import Table from '../Table/Table'

const MainDash = () => {
  return (
    <div className="MainDash">
      <h1>DashBoard</h1>
      <Card />
      <Table />
    </div>
  )
}

export default MainDash