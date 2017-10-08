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


initialModelTimes : ModelTimes
initialModelTimes =
    { loading = False
    , loaded = False
    , error = Nothing
    , values = []
    }


initialModelCounter : ModelCounter
initialModelCounter =
    { waitingFor = Nothing
    , current = Nothing
    }


initialModel : Model
initialModel =
    { date = initialModelDate
    , geo = initialModelGeo
    , times = initialModelTimes
    , counter = initialModelCounter
    }
