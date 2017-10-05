module Model.Model exposing (initialModel)

import Model.Types exposing (..)


initialModel : Model
initialModel =
    { date =
        { loading = False
        , loaded = False
        , value = Nothing
        }
    }
