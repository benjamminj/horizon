module Model.Types exposing (..)

import Time exposing (Time)


type alias Model =
    { date :
        { loading : Bool
        , loaded : Bool
        , value : Maybe Time
        }
    }
