module Network.Request exposing (getSunriseData, sanitizeData)

import Update.Types as UpdateTypes exposing (Msg)
import Json.Decode as Decode exposing (Decoder, keyValuePairs, string, oneOf, at, field, succeed)
import Http
import Network.Types exposing (..)
import List
import Date exposing (Date)
import Time exposing (Time)
import Model.Types as ModelTypes exposing (..)
import Regex exposing (regex, contains)
import Tuple


getSunriseData : Float -> Float -> Cmd Msg
getSunriseData lat lng =
    let
        url =
            "https://api.sunrise-sunset.org/json?lat="
                ++ toString lat
                ++ "&lng="
                ++ toString lng
                ++ "&formatted=0"

        -- request dates in UTC format for easier conversion
        request =
            Http.get url decodeSunriseData
    in
        Http.send UpdateTypes.HorizonDataReqComplete request


decodeSunriseData : Decoder Data
decodeSunriseData =
    Decode.map Data
        (field "results" (keyValuePairs badData))


badData : Decoder String
badData =
    oneOf [ string, succeed "INVALID DATE" ]


sanitizeData : Data -> List ( HorizonStatus, Time )
sanitizeData { results } =
    results
        |> List.filterMap addDate
        |> List.map addHorizonStatus
        |> addEndTimes
        |> List.sortBy Tuple.second


addDate : ResultItem -> Maybe ( String, Time )
addDate ( key, dateString ) =
    case (Date.fromString dateString) of
        Err _ ->
            Nothing

        Ok date ->
            Just ( key, Date.toTime date )


addHorizonStatus : ( String, Time ) -> HorizonItem
addHorizonStatus ( key, time ) =
    let
        status =
            if contains (regex "sunrise$") key then
                Sunrise
            else if contains (regex "sunset$") key then
                Sunset
            else if contains (regex "civil") key then
                CivilTwilight
            else if contains (regex "nautical") key then
                NauticalTwilight
            else if contains (regex "astronomical") key then
                AstronomicalTwilight
            else
                SolarNoon
    in
        ( status, time )


addEndTimes : List HorizonItem -> List HorizonItem
addEndTimes times =
    (List.filterMap getEndTimes times) ++ times


getEndTimes : HorizonItem -> Maybe HorizonItem
getEndTimes ( status, time ) =
    let
        -- 5 minutes after
        newTime =
            time + 300000
    in
        case status of
            Sunrise ->
                Just ( SunriseEnd, newTime )

            Sunset ->
                Just ( SunsetEnd, newTime )

            _ ->
                Nothing
