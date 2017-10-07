module Network.Request exposing (..)

import Update.Types as UpdateTypes exposing (Msg)
import Json.Decode as Decode exposing (Decoder, keyValuePairs, string, oneOf, int)
import Http
import Network.Types exposing (..)


getSunriseData : Float -> Float -> Cmd Msg
getSunriseData lat lng =
    let
        url =
            "https://api.sunrise-sunset.org/json?lat=" ++ toString lat ++ "&lng=" ++ toString lng

        request =
            Http.get url decodeSunriseData
    in
        Http.send UpdateTypes.HorizonDataReqComplete request


decodeSunriseData : Decoder Data
decodeSunriseData =
    Decode.map2 Data
        (Decode.field "status" Decode.string)
        (Decode.field "results" (keyValuePairs string))
