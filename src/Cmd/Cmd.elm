module Cmd.Cmd exposing (..)

import Task
import Date exposing (Date)
import Update.Types as UpdateTypes exposing (Msg)


getToday : Cmd Msg
getToday =
    Task.attempt UpdateTypes.GetDateComplete Date.now
