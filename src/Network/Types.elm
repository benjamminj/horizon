module Network.Types exposing (..)

-- import Time exposing (Time)


type alias Data =
    { results : List ResultItem }


type alias ResultItem =
    ( String, String )
