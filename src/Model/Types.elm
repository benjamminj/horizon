module Model.Types exposing (..)

import Time exposing (Time)
import Geolocation exposing (Location)


type alias Model =
    { date : ModelDate
    , geo : ModelGeo
    , times : ModelTimes
    , counter : ModelCounter
    }


type alias ModelDate =
    { loading : Bool
    , loaded : Bool
    , value : Maybe Time
    }


type alias ModelGeo =
    { loading : Bool
    , loaded : Bool
    , location : Maybe Location
    , error : Maybe Geolocation.Error
    }


type alias ModelTimes =
    { loading : Bool
    , loaded : Bool
    , error : Maybe String
    , values : List HorizonItem
    }


type HorizonStatus
    = Sunrise
    | SunriseEnd
    | Sunset
    | SunsetEnd
    | SolarNoon
    | CivilTwilight
    | NauticalTwilight
    | AstronomicalTwilight


type alias HorizonItem =
    ( HorizonStatus, Time )


type alias ModelCounter =
    { waitingFor : Maybe HorizonStatus
    , current : Maybe HorizonStatus
    , now : Maybe Time
    }
