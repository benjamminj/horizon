module Update.Update exposing (..)

import Date exposing (Date)
import Update.Types as Types exposing (Msg)
import Model.Types exposing (Model)
import Cmd.Cmd exposing (..)
import Network.Request exposing (getSunriseData, sanitizeData)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Types.GetDateAttempt ->
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

        Types.GetDateComplete (Ok date) ->
            let
                nextDate =
                    { value = Just (Date.toTime date)
                    , loading = False
                    , loaded = False
                    }
            in
                ( { model | date = nextDate }, Cmd.none )

        Types.GetDateComplete (Err error) ->
            let
                nextDate =
                    { value = Nothing
                    , loading = False
                    , loaded = False
                    }
            in
                ( { model | date = nextDate }, Cmd.none )

        Types.GetGeoAttempt ->
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

        Types.GetGeoComplete (Ok location) ->
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
                update Types.HorizonDataReqAttempt { model | geo = nextGeo }

        Types.GetGeoComplete (Err error) ->
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

        Types.HorizonDataReqAttempt ->
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

        Types.HorizonDataReqComplete (Ok data) ->
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
                ( { model | times = nextTimes }, Cmd.none )

        Types.HorizonDataReqComplete (Err error) ->
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
