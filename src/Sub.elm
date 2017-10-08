module Sub exposing (..)

import Model.Types exposing (..)
import Update.Types exposing (..)
import Time exposing (every, second)


subscriptions : Model -> Sub Msg
subscriptions model =
    every second TickCounter
