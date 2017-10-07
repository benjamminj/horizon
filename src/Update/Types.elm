module Update.Types exposing (..)

import Date exposing (Date)
import Geolocation exposing (Location)
import Http
import Network.Types exposing (Data)


type Msg
    = GetDateAttempt
    | GetDateComplete (Result String Date)
    | GetGeoAttempt
    | GetGeoComplete (Result Geolocation.Error Location)
    | HorizonDataReqAttempt
    | HorizonDataReqComplete (Result Http.Error Data)
