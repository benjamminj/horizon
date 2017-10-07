module Update.Types exposing (..)

import Date exposing (Date)
import Geolocation exposing (Location)


type Msg
    = GetDateAttempt
    | GetDateComplete (Result String Date)
    | GetGeoAttempt
    | GetGeoComplete (Result Geolocation.Error Location)
