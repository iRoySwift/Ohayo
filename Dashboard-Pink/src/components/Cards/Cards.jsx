import React from 'react'
import Card from '../Card/Card'
import { CardsData } from '../../mocks/data'
import "./Cards.css"

const Cards = () => {
  return (
    <div className='Cards'>
      {
        CardsData.map((card, id) => {
          return (
            <div key={id} className="parentContainer">
              <Card
                {...card}
              />
            </div>
          )
        })
      }
    </div>
  )
}

export default Cards