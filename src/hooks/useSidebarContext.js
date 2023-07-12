import { useContext } from "react";
import SideBarContext from "../context/sidebarContext";

function useSidebarContext() {
  return useContext(SideBarContext);
}

export default useSidebarContext;
