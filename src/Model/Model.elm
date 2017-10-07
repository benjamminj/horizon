module Model.Model exposing (initialModel)

import Model.Types exposing (..)


initialModelDate : ModelDate
initialModelDate =
    { loading = False
    , loaded = False
    , value = Nothing
    }


initialModelGeo : ModelGeo
initialModelGeo =
    { loading = False
    , loaded = False
    , location = Nothing
    , error = Nothing
    }


initialModel : Model
initialModel =
    { date = initialModelDate
    , geo = initialModelGeo
    }
