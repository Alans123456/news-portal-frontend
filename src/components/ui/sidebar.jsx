"use client";

import * as React from "react";
import { PanelLeft } from "lucide-react";

// ----------------- Simple cn utility -----------------
const cn = (...classes) => classes.filter(Boolean).join(" ");

// ----------------- Mobile detection hook -----------------
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
}

// ----------------- Button -----------------
const Button = React.forwardRef(
  ({ children, className, onClick, ...props }, ref) => (
    <button
      ref={ref}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center rounded-md border border-gray-300 px-2 py-1 text-sm font-medium shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
);
Button.displayName = "Button";

// ----------------- Sheet -----------------
const Sheet = ({ open, onOpenChange, children }) => {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex bg-black/40"
      onClick={() => onOpenChange(false)}
    >
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { onClick: (e) => e.stopPropagation() })
      )}
    </div>
  );
};

const SheetContent = ({ side = "left", children, style = {}, ...props }) => {
  const baseClass =
    "fixed top-0 bottom-0 z-50 w-72 bg-white shadow-lg transition-transform duration-300 ease-in-out";
  const positionClass = side === "left" ? "left-0" : "right-0";
  return (
    <div className={cn(baseClass, positionClass)} style={style} {...props}>
      {children}
    </div>
  );
};

// ----------------- Sidebar Context -----------------
const SIDEBAR_COOKIE_NAME = "sidebar:state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

const SidebarContext = React.createContext(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return context;
}

// ----------------- Sidebar Provider -----------------
const SidebarProvider = React.forwardRef(
  (
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const isMobile = useIsMobile();
    const [openMobile, setOpenMobile] = React.useState(false);
    const [_open, _setOpen] = React.useState(defaultOpen);
    const open = openProp ?? _open;

    const setOpen = React.useCallback(
      (value) => {
        const openState = typeof value === "function" ? value(open) : value;
        if (setOpenProp) setOpenProp(openState);
        else _setOpen(openState);
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
      },
      [setOpenProp, open]
    );

    const toggleSidebar = React.useCallback(() => {
      return isMobile ? setOpenMobile((o) => !o) : setOpen((o) => !o);
    }, [isMobile, setOpen, setOpenMobile]);

    React.useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.key === "b" && (event.metaKey || event.ctrlKey)) {
          event.preventDefault();
          toggleSidebar();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [toggleSidebar]);

    const state = open ? "expanded" : "collapsed";

    const contextValue = React.useMemo(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      }),
      [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
    );

    return (
      <SidebarContext.Provider value={contextValue}>
        <div
          style={{ "--sidebar-width": "16rem", ...style }}
          className={cn("flex min-h-screen w-full", className)}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      </SidebarContext.Provider>
    );
  }
);
SidebarProvider.displayName = "SidebarProvider";

// ----------------- Sidebar -----------------
const Sidebar = React.forwardRef(
  (
    { side = "left", collapsible = "offcanvas", className, children, ...props },
    ref
  ) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

    if (isMobile) {
      return (
        <Sheet open={openMobile} onOpenChange={setOpenMobile}>
          <SheetContent side={side} className="flex flex-col p-2">
            {children}
          </SheetContent>
        </Sheet>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          "hidden md:flex flex-col h-full transition-all bg-gray-100",
          state === "collapsed" && "w-16",
          state === "expanded" && "w-64",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Sidebar.displayName = "Sidebar";

// ----------------- Sidebar Trigger -----------------
const SidebarTrigger = React.forwardRef(
  ({ className, onClick, ...props }, ref) => {
    const { toggleSidebar } = useSidebar();
    return (
      <Button
        ref={ref}
        className={cn("h-8 w-8 p-1", className)}
        onClick={(e) => {
          onClick?.(e);
          toggleSidebar();
        }}
        {...props}
      >
        <PanelLeft />
      </Button>
    );
  }
);
SidebarTrigger.displayName = "SidebarTrigger";

// ----------------- Exports -----------------
export {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  Button,
  Sheet,
  SheetContent,
  useSidebar,
};
