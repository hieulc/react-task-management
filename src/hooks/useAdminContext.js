import { useContext } from "react";
import AdminContext from "../context/admin";

function useAdminContext() {
  return useContext(AdminContext);
}

export default useAdminContext;
