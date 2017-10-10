module View.Countdown exposing (..)

import Html exposing (..)
import Model.Types exposing (Model)
import Update.Types exposing (Msg)


countdown : Model -> Html Msg
countdown model =
    div []
        [ text "this will be a countdown" ]
