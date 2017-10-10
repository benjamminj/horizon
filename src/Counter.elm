module Counter exposing (..)

import Model.Types exposing (..)
import Time exposing (Time)
import Tuple


getCounterCurrent : Maybe Time -> List HorizonItem -> Maybe HorizonStatus
getCounterCurrent now items =
    case now of
        Just time ->
            case items of
                [] ->
                    Nothing

                _ :: [] ->
                    Nothing

                ( status, x ) :: y :: xs ->
                    if x <= time && time < (Tuple.second y) then
                        Just status
                    else
                        getCounterCurrent now (y :: xs)

        Nothing ->
            Nothing
