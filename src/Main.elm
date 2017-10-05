module Main exposing (..)

import Html exposing (..)
import Html.Events exposing (onClick)
import Date exposing (Date)
import Time exposing (Time)
import Task


-- 1a. get today's date
-- 1b. get the user's geolocation
-- 2. get horizon related to the date
--      a. fetch times for today
--      b. run formatting...
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


type alias Model =
    { date :
        { loading : Bool
        , loaded : Bool
        , value : Maybe Time
        }
    }


initialModel : Model
initialModel =
    { date =
        { loading = False
        , loaded = False
        , value = Nothing
        }
    }


type Msg
    = GetDateComplete (Result String Date)
    | GetDateAttempt


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GetDateAttempt ->
            let
                prevDate =
                    model.date

                nextDate =
                    { prevDate
                        | loading = True
                        , loaded = False
                    }
            in
                ( model, getToday )

        GetDateComplete (Ok date) ->
            let
                nextDate =
                    { value = Just (Date.toTime date)
                    , loading = False
                    , loaded = False
                    }
            in
                ( { model | date = nextDate }, Cmd.none )

        GetDateComplete (Err error) ->
            let
                nextDate =
                    { value = Nothing
                    , loading = False
                    , loaded = False
                    }
            in
                ( { model | date = nextDate }, Cmd.none )



-- MODEL UPDATES --


getToday : Cmd Msg
getToday =
    Task.attempt GetDateComplete Date.now


view : Model -> Html Msg
view model =
    div []
        [ div [] [ text (toString model) ]
        , button [ onClick GetDateAttempt ] [ text "get today" ]
        ]


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none


init : ( Model, Cmd Msg )
init =
    ( initialModel, getToday )
