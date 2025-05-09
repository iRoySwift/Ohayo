import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular, brands, icon, thin } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import Chart from 'react-apexcharts'
import { AnimatePresence, motion } from 'framer-motion'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './Card.css'

const Card = (props) => {
  const [expanded, setExpanded] = useState(false)
  return (
    <AnimatePresence className='Card'>
      {
        expanded ? (
          <ExpandedCard param={props} setExpanded={() => setExpanded(false)} />
        ) : (
          <CompactCard param={props} setExpanded={() => setExpanded(true)} />
        )
      }
    </AnimatePresence>
  )
}

// CompactCard
function CompactCard ({ param, setExpanded }) {
  const Png = param.png
  return (
    <motion.div className="CompactCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow
      }}
      onClick={setExpanded}
      layout
      // initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: "spring" }}
      layoutId={`CompactCard${param.title}`}>
      <motion.div className="radialBar">
        <CircularProgressbar
          value={param.barValue}
          text={`${param.barValue}%`} />
        <motion.span>
          {param.title}
        </motion.span>
      </motion.div>
      <motion.div className="detail">
        {Png}
        <motion.span>
          ${param.value}
        </motion.span>
        <motion.span>
          Last 24 hours
        </motion.span>
      </motion.div>
    </motion.div>
  )
}

// ExpandedCard
function ExpandedCard ({ param, setExpanded }) {
  const data = {
    options: {
      chart: {
        type: "area",
        height: "auto",
      },

      dropShadow: {
        enabled: false,
        enabledOnSeries: undefined,
        top: 0,
        left: 0,
        blur: 3,
        color: "#000",
        opacity: 0.35,
      },

      fill: {
        colors: ["#fff"],
        type: "gradient",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        colors: ["white"],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
      grid: {
        show: true,
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
        ],
      },
    },
  };
  return (
    <motion.div className="ExpandedCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow
      }}
      initial={{ opacity: 0.5, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      layoutId={`ExpandedCard${param.title}`}>
      <motion.div style={{
        alignSelf: "flex-end",
        cursor: 'pointer',
        color: "white"
      }} >
        <FontAwesomeIcon icon={solid("xmark")} onClick={setExpanded} />
      </motion.div>
      <motion.span>{param.title}</motion.span>
      <motion.div className="chartContainer">
        <Chart series={param.series} type="area" options={data.options} />
      </motion.div>
      <motion.span>
        Last 24 hours
      </motion.span>
    </motion.div>
  )
}

export default Card