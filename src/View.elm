module View exposing (..)

import Html exposing (..)
import Html.Events exposing (onClick)
import Model.Types exposing (Model)
import Update.Types exposing (Msg(..))
import View.Countdown exposing (..)


view : Model -> Html Msg
view model =
    div []
        [ div [] [ text (toString model) ]
        , button [ onClick GetGeoAttempt ] [ text "get your location" ]
        , countdown model
        ]
