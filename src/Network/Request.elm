module Network.Request exposing (getSunriseData, sanitizeData)

import Update.Types as UpdateTypes exposing (Msg)
import Json.Decode as Decode exposing (Decoder, keyValuePairs, string, oneOf, at, field, succeed)
import Http
import Network.Types exposing (..)
import List
import Date exposing (Date)
import Time exposing (Time)


-- import Debug


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


sanitizeData : Data -> List ( String, Time )
sanitizeData { results } =
    results
        |> List.filterMap addDate


addDate : ResultItem -> Maybe ( String, Time )
addDate ( key, dateString ) =
    case (Date.fromString dateString) of
        Err _ ->
            Nothing

        Ok date ->
            Just ( key, Date.toTime date )
