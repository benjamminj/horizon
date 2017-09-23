module Main exposing (..)

import Html exposing (Html, text, div, img)
import Html.Attributes exposing (src)
import Http
import Json.Decode exposing (..)
import Debug
import Json.Decode.Pipeline exposing (decode, required, optional, requiredAt, custom)


---- MODEL ----


type alias Model =
    { status : Maybe String
    , results : Maybe Results
    }


initialModel : Model
initialModel =
    { status = Nothing
    , results = Nothing
    }


init : ( Model, Cmd Msg )
init =
    ( initialModel, fetchData )


fetchData : Cmd Msg
fetchData =
    let
        url =
            "https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400"

        request =
            Http.get url decodeSunriseStatus
    in
        Http.send NewData request


type alias Data =
    { status : Maybe String
    , results : Results
    }


decodeSunriseStatus : Decoder Data
decodeSunriseStatus =
    decode Data
        |> required "status" (maybe string)
        |> required "results" decodeResults


type alias Results =
    { sunrise : String
    , sunset : String
    , day_length : String
    , astronomical_twilight_begin : String
    , astronomical_twilight_end : String
    , nautical_twilight_begin : String
    , nautical_twilight_end : String
    , civil_twilight_begin : String
    , civil_twilight_end : String
    , solar_noon : String
    }


decodeResults : Decoder Results
decodeResults =
    decode Results
        |> required "sunrise" string
        |> required "sunset" string
        |> required "day_length" string
        |> required "astronomical_twilight_begin" string
        |> required "nautical_twilight_begin" string
        |> required "civil_twilight_begin" string
        |> required "solar_noon" string
        |> required "astronomical_twilight_end" string
        |> required "nautical_twilight_end" string
        |> required "civil_twilight_end" string



---- UPDATE ----


type Msg
    = NewData (Result Http.Error Data)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NewData (Ok data) ->
            ( { data | results = Just data.results }, Cmd.none )

        NewData (Err _) ->
            ( model, Cmd.none )



---- VIEW ----


view : Model -> Html Msg
view model =
    div []
        [ div [] [ text (toString model) ]
        ]



---- PROGRAM ----


main : Program Never Model Msg
main =
    Html.program
        { view = view
        , init = init
        , update = update
        , subscriptions = always Sub.none
        }
