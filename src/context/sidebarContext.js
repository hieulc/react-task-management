import { createContext, useState } from "react";

const SideBarContext = createContext();

function SidebarProvider({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const openSidebar = () => {
    setIsOpen(true);
  };

  const valueToShare = {
    isOpen,
    closeSidebar,
    openSidebar,
  };

  return (
    <SideBarContext.Provider value={valueToShare}>
      {children}
    </SideBarContext.Provider>
  );
}

export default SideBarContext;
export { SidebarProvider };
