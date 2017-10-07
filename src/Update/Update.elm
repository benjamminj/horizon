module Update.Update exposing (..)

import Date exposing (Date)
import Update.Types as Types exposing (Msg)
import Model.Types exposing (Model)
import Cmd.Cmd exposing (..)


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
                ( { model | geo = nextGeo }, Cmd.none )

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
