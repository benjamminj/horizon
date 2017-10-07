module Cmd.Cmd exposing (..)

import Task
import Date exposing (Date)
import Update.Types as UpdateTypes exposing (Msg)
import Geolocation


getToday : Cmd Msg
getToday =
    Task.attempt UpdateTypes.GetDateComplete Date.now


getGeo : Cmd Msg
getGeo =
    Task.attempt UpdateTypes.GetGeoComplete Geolocation.now
