module Main exposing (..)

import Html exposing (Html, text, div, button)
import Html.Events exposing (onClick)
import Geolocation exposing (Location)
import Date exposing (..)
import Task
import Http
import Json.Decode as Decode exposing (Decoder, keyValuePairs, string)


---- MODEL ----


type alias GeoModel =
    { location : Maybe Location
    , loading : Bool
    , loaded : Bool
    , error : Maybe Geolocation.Error
    }


initialGeoModel : GeoModel
initialGeoModel =
    { location = Nothing
    , loading = False
    , loaded = False
    , error = Nothing
    }


type alias TimesModel =
    { loaded : Bool
    , loading : Bool
    , times : List DataResult
    }


initialTimesModel : TimesModel
initialTimesModel =
    { loaded = False
    , loading = False
    , times = []
    }


type alias Model =
    { geo : GeoModel
    , date : Maybe Date
    , times : TimesModel
    }


initialModel : Model
initialModel =
    { geo = initialGeoModel
    , date = Nothing
    , times = initialTimesModel
    }


init : ( Model, Cmd Msg )
init =
    ( initialModel, Cmd.none )



---- UPDATE ----


type Msg
    = NoOp
    | AuthorizeGeo
    | Geo (Result Geolocation.Error Location)
    | SunriseData (Result Http.Error Data)
    | GetDate (Result String Date)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )

        AuthorizeGeo ->
            let
                geo =
                    model.geo

                newGeo =
                    { geo | loading = True }
            in
                ( { model | geo = newGeo }, getGeoLocation )

        Geo (Err error) ->
            let
                geo =
                    model.geo

                newGeo =
                    { geo
                        | loading = False
                        , error = Just error
                    }
            in
                ( { model | geo = newGeo }, Cmd.none )

        Geo (Ok location) ->
            let
                geo =
                    model.geo

                newGeo =
                    { geo
                        | location = Just location
                        , loaded = True
                        , loading = False
                    }

                nextModel =
                    { model | geo = newGeo }

                commandMsg =
                    getSunriseData location.latitude location.longitude
            in
                ( nextModel, commandMsg )

        SunriseData (Ok result) ->
            let
                times =
                    model.times

                loaded =
                    result.status == "OK"

                newTimes =
                    { times
                        | loaded = loaded
                        , times = result.results
                    }

                nextModel =
                    { model | times = newTimes }
            in
                ( nextModel, getToday )

        SunriseData (Err error) ->
            ( model, Cmd.none )

        GetDate (Err error) ->
            ( model, Cmd.none )

        GetDate (Ok date) ->
            ( { model | date = Just date }, Cmd.none )



--- TASKS ---
-- GeoLocation


getGeoLocation : Cmd Msg
getGeoLocation =
    Task.attempt Geo Geolocation.now



-- Sunrise & Sunset Times


type alias Data =
    { status : String
    , results : List DataResult
    }


type alias DataResult =
    ( String, String )


getSunriseData : Float -> Float -> Cmd Msg
getSunriseData lat lng =
    let
        url =
            "https://api.sunrise-sunset.org/json?lat=" ++ toString lat ++ "&lng=" ++ toString lng

        request =
            Http.get url decodeSunriseData
    in
        Http.send SunriseData request


decodeSunriseData : Decoder Data
decodeSunriseData =
    Decode.map2 Data
        (Decode.field "status" Decode.string)
        (Decode.field "results" (keyValuePairs string))



-- Today's Date


getToday : Cmd Msg
getToday =
    Task.attempt GetDate Date.now



---- VIEW ----


view : Model -> Html Msg
view model =
    case model.geo.loaded of
        True ->
            div []
                [ div [] [ text (toString model) ]
                ]

        False ->
            case model.geo.loading of
                True ->
                    div [] [ text "Fetching your location..." ]

                False ->
                    locationScreen


locationScreen : Html Msg
locationScreen =
    div []
        [ div []
            [ text "Using Horizon Requires Your Location. Is that Ok?" ]
        , button [ onClick AuthorizeGeo ]
            [ text "Yeah, I guess so" ]
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
