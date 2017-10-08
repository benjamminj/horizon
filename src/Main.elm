module Main exposing (..)

import Html exposing (..)
import Html.Events exposing (onClick)
import Model.Types exposing (Model)
import Model.Model exposing (initialModel)
import Update.Types as UpdateTypes exposing (Msg)
import Update.Update exposing (update)
import Cmd.Cmd exposing (getToday)
import Sub exposing (subscriptions)


-- 1a. get today's date ✔
-- 1b. get the user's geolocation ✔
-- 2. get horizon related to the date ✔
--      a. fetch times for today ✔
--      b. run formatting... ✔
--      b2. format should be for each item (SunriseStatus, Time - UTC ✔
--      b3. SunriseStatus = Union Type -> Name of status ✔
--      c. if now is after sunset then fetch tomorrow's times too
--      d. once data is correct then display the UI
{--sample model
    times: [
        type - WaitingSunrise | Sunrise | WaitingSunset | Sunset
        time - Time
        label - String
    ]

    geoLocation: {
        loading: Bool
        loaded: Bool
        location: Location
        error: Maybe Geolocation.Error
    }

    today: Maybe Time
    now: Maybe Time
--}


main : Program Never Model Msg
main =
    Html.program
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }


view : Model -> Html Msg
view model =
    div []
        [ div [] [ text (toString model) ]
        , button [ onClick UpdateTypes.GetGeoAttempt ] [ text "get your location" ]
        ]


init : ( Model, Cmd Msg )
init =
    ( initialModel, getToday )
