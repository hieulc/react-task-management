import { useContext } from "react";
import AuthContext from "../context/users";

function useUserContext() {
  return useContext(AuthContext);
}

export default useUserContext;
