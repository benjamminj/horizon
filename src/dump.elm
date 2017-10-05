module Main exposing (..)

import Html exposing (Html, text, div, button)
import Html.Events exposing (onClick)
import Geolocation exposing (Location)
import Date exposing (..)
import Task
import Http
import Json.Decode as Decode exposing (Decoder, keyValuePairs, string, oneOf, int)
import Tuple exposing (first, second)
import Time exposing (Time)
import String
import Regex exposing (regex, contains)


---- MODEL ----
-- model.geo


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



-- model.times


type alias FormattedDate =
    ( String, Time, SortLevel )


type alias TimesModel =
    { loaded : Bool
    , loading : Bool
    , times : List DataResult
    , formattedTimes : List FormattedDate
    }


initialTimesModel : TimesModel
initialTimesModel =
    { loaded = False
    , loading = False
    , times = []
    , formattedTimes = []
    }


type alias Model =
    { geo : GeoModel
    , date : Maybe Time
    , now : Maybe Time
    , times : TimesModel
    }


initialModel : Model
initialModel =
    { geo = initialGeoModel
    , date = Nothing
    , now = Nothing
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
    | Tick Time


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

                times =
                    model.times

                newTimes =
                    { times | loading = True }

                nextModel =
                    { model | geo = newGeo }

                command =
                    getSunriseData location.latitude location.longitude
            in
                ( nextModel, command )

        SunriseData (Ok result) ->
            let
                times =
                    model.times

                loaded =
                    result.status == "OK"

                newTimes =
                    { times
                        | loaded = loaded
                        , loading = False
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
            let
                day =
                    toString date

                times =
                    model.times

                formattedTimes =
                    formatTimes times.times date

                nextTimes =
                    { times | formattedTimes = formattedTimes }

                nextModel =
                    { model
                        | date = Just (Date.toTime date)
                        , times = nextTimes
                    }
            in
                ( nextModel, Cmd.none )

        Tick newTime ->
            ( { model | now = Just newTime }, Cmd.none )



--- DATA FORMATTING ---


formatTimes : List ( String, String ) -> Date -> List FormattedDate
formatTimes times date =
    times
        |> filterDayLength
        |> mapStringsToDates date
        |> mapDatesToUtc
        |> addSortLevelToTimes



-- |> addSortLevelToTimes
-- |> sortTimes


filterDayLength : List ( String, a ) -> List ( String, a )
filterDayLength entries =
    List.filter (\entry -> first entry /= "day_length") entries


mapStringsToDates : Date -> List ( a, String ) -> List ( a, Date )
mapStringsToDates date times =
    let
        day =
            toString (Date.day date)

        month =
            toString (Date.month date)

        year =
            toString (Date.year date)

        dateString time =
            String.join " " [ year, month, day, time ]
    in
        List.filterMap (transformToTime dateString) times


transformToTime : (a -> String) -> ( a1, a ) -> Maybe ( a1, Date )
transformToTime dateString time =
    let
        timeValue =
            Tuple.second time

        transformed =
            Date.fromString (dateString timeValue)
    in
        case transformed of
            Ok date ->
                Just (Tuple.mapSecond (\value -> date) time)

            Err _ ->
                Nothing


mapDatesToUtc : List ( a, Date ) -> List ( a, Time )
mapDatesToUtc dates =
    List.map (Tuple.mapSecond (\date -> Date.toTime date)) dates


addSortLevelToTimes : List ( String, Time ) -> List ( String, Time, SortLevel )
addSortLevelToTimes times =
    List.map (addSortLevel) times


addSortLevel : ( String, Time ) -> ( String, Time, SortLevel )
addSortLevel ( string, time ) =
    let
        sortLevel =
            matchSortLevel string
    in
        ( string, time, sortLevel )


type SortLevel
    = WaitingSunrise
    | Sunrise
    | WaitingSunset
    | Sunset


matchSortLevel : String -> SortLevel
matchSortLevel string =
    if contains (regex "sunrise") string then
        Sunrise
    else if contains (regex "solar_noon") string then
        WaitingSunset
    else if contains (regex "sunset") string then
        Sunset
    else
        WaitingSunrise



-- sortTimes : List FormattedDate -> List FormattedDate
-- sortTimes times =
--     List.sortWith compareTimes times
-- compareTimes :
--     ( a, comparable, comparable1 )
--     -> ( b, comparable, comparable1 )
--     -> Order
-- compareTimes ( key1, time1, order1 ) ( key2, time2, order2 ) =
--     case compare order1 order2 of
--         LT ->
--             LT
--         GT ->
--             GT
--         EQ ->
--             case compare time1 time2 of
--                 LT ->
--                     LT
--                 GT ->
--                     GT
--                 EQ ->
--                     EQ
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
    let
        ready =
            ( model.geo.loaded, model.times.loaded )
    in
        case ready of
            ( True, True ) ->
                div [] [ text (toString model) ]

            ( False, False ) ->
                geoScreens model.geo

            ( True, False ) ->
                -- this meanes that the geolocation has finished and times are loading
                div [] [ text "Fetching sunrise times for your area..." ]

            _ ->
                div [] [ text "Error..." ]


geoScreens : GeoModel -> Html Msg
geoScreens geo =
    case geo.loading of
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



--- SUBSCRIPTIONS ---


subscriptions : Model -> Sub Msg
subscriptions model =
    Time.every Time.second Tick



---- PROGRAM ----


main : Program Never Model Msg
main =
    Html.program
        { view = view
        , init = init
        , update = update
        , subscriptions = subscriptions
        }
