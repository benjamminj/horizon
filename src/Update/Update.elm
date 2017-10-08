module Update.Update exposing (..)

import Date exposing (Date)
import Update.Types as Types exposing (..)
import Model.Types exposing (Model)
import Cmd.Cmd exposing (..)
import Network.Request exposing (getSunriseData, sanitizeData)
import Counter exposing (..)
import Debug


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

        GetGeoAttempt ->
            let
                prevGeo =
                    model.geo

                nextGeo =
                    { prevGeo
                        | loaded = False
                        , loading = True
                        , location = Nothing
                        , error = Nothing
                    }
            in
                ( { model | geo = nextGeo }, getGeo )

        GetGeoComplete (Ok location) ->
            let
                prevGeo =
                    model.geo

                nextGeo =
                    { prevGeo
                        | loading = False
                        , loaded = True
                        , location = Just location
                    }
            in
                -- recursive call to update to dispatch the next message
                update HorizonDataReqAttempt { model | geo = nextGeo }

        GetGeoComplete (Err error) ->
            let
                prevGeo =
                    model.geo

                nextGeo =
                    { prevGeo
                        | loading = False
                        , loaded = False
                        , error = Just error
                    }
            in
                ( { model | geo = nextGeo }, Cmd.none )

        HorizonDataReqAttempt ->
            let
                prevTimes =
                    model.times

                nextTimes =
                    { prevTimes | loading = True }

                command =
                    case model.geo.location of
                        Nothing ->
                            Cmd.none

                        Just { latitude, longitude } ->
                            getSunriseData latitude longitude
            in
                ( { model | times = nextTimes }, command )

        HorizonDataReqComplete (Ok data) ->
            let
                prevTimes =
                    model.times

                nextTimes =
                    { prevTimes
                        | loading = False
                        , loaded = True
                        , values = sanitizeData data
                    }
            in
                update GetCounterCurrent { model | times = nextTimes }

        HorizonDataReqComplete (Err error) ->
            let
                prevTimes =
                    model.times

                nextTimes =
                    { prevTimes
                        | loading = False
                        , loaded = True
                        , error = Just "Invalid JSON"
                    }
            in
                ( { model | times = nextTimes }, Cmd.none )

        -- Counter
        TickCounter time ->
            let
                prevDate =
                    model.date

                nextDate =
                    { prevDate
                        | value = Just time
                    }
            in
                ( { model | date = nextDate }, Cmd.none )

        GetCounterCurrent ->
            let
                current =
                    getCounterCurrent
                        model.date.value
                        model.times.values

                prevCounter =
                    model.counter

                nextCounter =
                    { prevCounter
                        | current = current
                    }

                foundCurrent =
                    case current of
                        Just _ ->
                            True

                        Nothing ->
                            False
            in
                if foundCurrent then
                    ( { model | counter = nextCounter }, Cmd.none )
                else
                    -- here is where I fire the code to look for tomorrow's times
                    Debug.log "hasn't found a current value yet, must be evening"
                        ( { model | counter = nextCounter }, Cmd.none )
