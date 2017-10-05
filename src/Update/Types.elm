module Update.Types exposing (..)

import Date exposing (Date)


type Msg
    = GetDateComplete (Result String Date)
    | GetDateAttempt
