/* eslint-disable */
import fetch from 'isomorphic-fetch'

import { API_SERVER } from '../../config'
import { toUTC } from '../../Utils'

import {
  GET_TIME_LEFT,
  GET_TIME_LEFT_FAILURE,
  UPDATE_TIME_LEFT_AFTER_SUNSET
} from './actionTypes'

const GET_REMAINING = 'GET_REMAINING'

export default (targetTime) => {
  return {
    type: GET_REMAINING,
    remaining: targetTime - Date.now()
  }
}
