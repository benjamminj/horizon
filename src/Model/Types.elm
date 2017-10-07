module Model.Types exposing (..)

import Time exposing (Time)
import Geolocation exposing (Location)


type alias Model =
    { date : ModelDate
    , geo : ModelGeo
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
