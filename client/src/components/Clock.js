import React, { PropTypes } from 'react' // eslint-disable-line
import './Clock.css'

const Clock = ({ remaining, name, waiting }) => {
  const hours = remaining / (1000 * 60 * 60)
  const minutes = (hours % 1) * 60
  const seconds = (minutes % 1) * 60
  const pad = (num) => (`0${Math.floor(num)}`).slice(-2)

  return (
    <div className='time-display'>
      <h6>{waiting ? `time until ${name}:` : `${name} is happening right now`}</h6>
      {waiting &&
        <h1>{pad(hours)}:{pad(minutes)}:{pad(seconds)}</h1>
      }
    </div>
  )
}

const { number, bool, string } = PropTypes

Clock.propTypes = {
  name: string.isRequired,
  remaining: number.isRequired,
  waiting: bool.isRequired
}

export default Clock
