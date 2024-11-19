import { useContext } from "react";

import { CurrentUserContext } from "../utils/context";

export const useCurrentUser = () => useContext(CurrentUserContext)
