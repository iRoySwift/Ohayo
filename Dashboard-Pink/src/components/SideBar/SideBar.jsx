import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular, brands, icon, thin } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import { motion } from 'framer-motion';
import logo from './../../assets/logo.png';
import { SideBarData } from '../../mocks/data';
import './SideBar.css'


const SideBar = () => {
  const [selected, setSelected] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const sidebarVariants = {
    true: {
      left: '0'
    },
    false: {
      left: "-60%"
    }
  }
  return (
    <>
      <div className='bars'
        style={expanded ? { left: "60%" } : { left: "5%" }}
        onClick={() => setExpanded(!expanded)}>
        <FontAwesomeIcon icon={solid('bars')} />
      </div>
      <motion.div className="SideBar"
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ''}>
        {/* logo */}
        <div className="logo">
          <img src={logo} alt="" />
          <span>
            Sh<span>o</span>ps
          </span>
        </div>
        {/* menu */}
        <div className="menu">
          {
            SideBarData.map((item, index) => (
              <div className={selected == index ? "menuItem active" : "menuItem"}
                key={index}
                onClick={() => setSelected(index)}>
                <div>
                  {item.icon}
                </div>
                <span>
                  {item.heading}
                </span>
              </div>
            ))
          }
          <div className="menuItem">
            <FontAwesomeIcon icon={solid('arrow-right-from-bracket')} />
          </div>

        </div>
      </motion.div>
    </>
  )
}

export default SideBar