import React, { useState, useEffect } from "react";
import { Outlet, Link, NavLink, useNavigate } from "react-router-dom";
import { useClerk, useUser } from "@clerk/clerk-react";
import { appShellStyles } from "../assets/dummyStyles.js";
import logo from "../assets/logo.png";

const AppShell = () => {
  const navigate = useNavigate();
  const { signOut } = useClerk();
  const { user, isLoaded } = useUser();

  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem("sidebar_collapsed") === "true";
    } catch {
      return false;
    }
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  if (!isLoaded) return null;

  useEffect(() => {
    try {
      localStorage.setItem("sidebar_collapsed", collapsed ? "true" : "false");
    } catch {}
  }, [collapsed]);

  // Responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      const isM = window.innerWidth < 1024;
      setIsMobile(isM);
      if (isM) setCollapsed(false);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Header scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSidebar = () => setCollapsed(!collapsed);
   
//display name helper
const displayName = (() => {
    if (!user) return "User";
    const name = user.fullName || user.firstName || user.username || "";
    return name.trim() || (user.email || "").split?.("@")?.[0] || "User";
  })();

  const firstName = () => {
    const parts = displayName.split(" ").filter(Boolean);
    return parts.length ? parts[0] : displayName;
  };

  const initials = () => {
    const parts = displayName.split(" ").filter(Boolean);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (
      parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
    ).toUpperCase();
  };


  const logout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.warn("Signout error:", error);
    }
    navigate("/");
  };

  const CollapseIcon = ({ className = "w-6 h-6" }) => (
    <svg
      className={`${className} transition-transform duration-300 ${
        collapsed ? "rotate-180" : ""
      }`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
      />
    </svg>
  );

  const DashboardIcon = ({ className = "w-5 h-5" }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );

  const InvoiceIcon = ({ className = "w-5 h-5" }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );

  const CreateIcon = ({ className = "w-5 h-5" }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  );

  const ProfileIcon = ({ className = "w-5 h-5" }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );

  const LogoutIcon = ({ className = "w-5 h-5" }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );

  const SidebarLink = ({ to, icon, children }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${appShellStyles.sidebarLink} ${
          collapsed ? appShellStyles.sidebarLinkCollapsed : ""
        } ${
          isActive
            ? appShellStyles.sidebarLinkActive
            : appShellStyles.sidebarLinkInactive
        }`
      }
    >
      <>
        <div className={appShellStyles.sidebarIcon}>{icon}</div>
        {!collapsed && (
          <span className={appShellStyles.sidebarText}>{children}</span>
        )}
      </>
    </NavLink>
  );

  return (
    <div className={appShellStyles.root}>
      <div className={appShellStyles.layout}>

        <aside
          className={`${appShellStyles.sidebar} ${
            collapsed
              ? appShellStyles.sidebarCollapsed
              : appShellStyles.sidebarExpanded
          }`}
        >
          <div className={appShellStyles.sidebarContainer}>

            {/* Logo */}
            <div
              className={`${appShellStyles.logoContainer} ${
                collapsed ? appShellStyles.logoContainerCollapsed : ""
              }`}
            >
              <Link to="/" className={appShellStyles.logoLink}>
                <img src={logo} alt="logo" className={appShellStyles.logoImage}/>
                {!collapsed && (
                  <span className={appShellStyles.logoText}>InvoiceAI</span>
                )}
              </Link>
            </div>

            {/* Navigation */}
            <nav className={appShellStyles.nav}>
              <SidebarLink to="/app/dashboard" icon={<DashboardIcon />}>
                Dashboard
              </SidebarLink>

              <SidebarLink to="/app/invoices" icon={<InvoiceIcon />}>
                Invoices
              </SidebarLink>

              <SidebarLink to="/app/create-invoice" icon={<CreateIcon />}>
                Create Invoice
              </SidebarLink>

              <SidebarLink to="/app/business" icon={<ProfileIcon />}>
                Business Profile
              </SidebarLink>
            </nav>

            {/* Bottom Section */}
            <div className={appShellStyles.userSection}>

              {/* Logout */}
              <button
                onClick={logout}
                className={appShellStyles.logoutButton}
              >
                <span><LogoutIcon /></span>
                {!collapsed && <span>Logout</span>}
              </button>

              {/* Collapse Button BELOW logout */}
              <div className={appShellStyles.collapseSection}>
                <button
                  onClick={toggleSidebar}
                  className={`${appShellStyles.collapseButtonInner} ${
                    collapsed ? appShellStyles.collapseButtonCollapsed : ""
                  }`}
                >
                  {!collapsed && <span>Collapse</span>}
                  <CollapseIcon />
                </button>
              </div>

            </div>

          </div>
        </aside>

        {/* mobile view */}
        {mobileOpen && (
          <div className={appShellStyles.mobileOverlay}>
              <div className={appShellStyles.mobileBackdrop} onClick={()=>setMobileOpen(false)} />
          <div className={appShellStyles.mobileSidebar}>
            <div className={appShellStyles.mobileHeader}>
               <Link to='/' className={appShellStyles.mobileLogoLink}
               onClick={()=>setMobileOpen(false)}>
                <img src={logo} alt="logo" className={appShellStyles.mobileLogoImage} />
                <span className={appShellStyles.mobileLogoText}>
                   InvoiceAI
                </span>
               
               </Link>

               <button onClick={()=>setMobileOpen(false)}
                className={appShellStyles.mobileCloseButton}
                >
                                   <svg
                    className={appShellStyles.mobileCloseIcon}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg> 
               </button>
            </div>

            {/*navigations */}
             <nav className={appShellStyles.mobileNav}>
                <NavLink
                  onClick={() => setMobileOpen(false)}
                  to="/app/dashboard"
                  className={({ isActive }) =>
                    `${appShellStyles.mobileNavLink} ${
                      isActive
                        ? appShellStyles.mobileNavLinkActive
                        : appShellStyles.mobileNavLinkInactive
                    }`
                  }
                >
                  {" "}
                  <DashboardIcon /> Dashboard
                </NavLink>
                <NavLink
                  onClick={() => setMobileOpen(false)}
                  to="/app/invoices"
                  className={({ isActive }) =>
                    `${appShellStyles.mobileNavLink} ${
                      isActive
                        ? appShellStyles.mobileNavLinkActive
                        : appShellStyles.mobileNavLinkInactive
                    }`
                  }
                >
                  {" "}
                  <InvoiceIcon /> Invoices
                </NavLink>
                <NavLink
                  onClick={() => setMobileOpen(false)}
                  to="/app/create-invoice"
                  className={({ isActive }) =>
                    `${appShellStyles.mobileNavLink} ${
                      isActive
                        ? appShellStyles.mobileNavLinkActive
                        : appShellStyles.mobileNavLinkInactive
                    }`
                  }
                >
                  {" "}
                  <CreateIcon /> Create Invoice
                </NavLink>
                <NavLink
                  onClick={() => setMobileOpen(false)}
                  to="/app/business"
                  className={({ isActive }) =>
                    `${appShellStyles.mobileNavLink} ${
                      isActive
                        ? appShellStyles.mobileNavLinkActive
                        : appShellStyles.mobileNavLinkInactive
                    }`
                  }
                >
                  {" "}
                  <ProfileIcon /> Business Profile
                </NavLink>
              </nav>
            <div className={appShellStyles.mobileLogoutSection}>
               <button onClick={()=>{
                setMobileOpen(false);
                logout();
               }} className={appShellStyles.mobileLogoutButton}>
                 <LogoutIcon/> Logout
               </button>
            </div>
          </div>
          </div>
        )}

        {/*Main Content Navbar */}
        <div className="flex-1 min-w-0" 
        style={{position:"relative",
          zIndex:20,
        }}
        >
          <header className={`${appShellStyles.header} ${
            scrolled 
            ? appShellStyles.headerScrolled 
            : appShellStyles.headerNotScrolled
          }`}>
         
         <div className={appShellStyles.headerTopSection}>
         <div className={appShellStyles.headerContent}>
         <button onClick={()=> setMobileOpen(true)} className={appShellStyles.mobileMenuButton}>
             <svg
                    className={appShellStyles.mobileMenuIcon}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
         </button>
           {!isMobile && (
            <button onClick={toggleSidebar} className={appShellStyles.desktopCollapseButton}>
             <CollapseIcon collapsed={collapsed}/>
            </button>
           )}

           <div className={appShellStyles.welcomeContainer}>
              <h2 className={appShellStyles.welcomeTitle}>
             Welcome back, {" "}
             <span className={appShellStyles.welcomeName}>
                  {firstName()}
             </span>
              </h2> 
              <p className={appShellStyles.welcomeSubtitle}>Ready to create amazing invoices?</p>
           </div>
         </div>
         </div>
      
       <div className={appShellStyles.headerActions}>
        <button onClick={()=>navigate("/app/create-invoice")}
          className={appShellStyles.ctaButton}>
          <CreateIcon className={appShellStyles.ctaIcon} />
          <span className="hidden xs:inline ">Create Invoice</span>
          <span className="xs:hidden">Create</span>
        </button>
  
      <div className={appShellStyles.userSectionDesktop}>
        <div className={appShellStyles.userInfo}>
          <div className={appShellStyles.userName}>{displayName}</div>
            <div className={appShellStyles.userEmail}>{user?.email}</div>
         </div>
         
         <div className={appShellStyles.userAvatarContainer}>
          <div className={appShellStyles.userAvatar}>
            {initials()}
            <div className={appShellStyles.userAvatarBorder}/>
          </div>
          <div className={appShellStyles.userStatus}></div>
         </div>

      </div>

       </div>

          </header>

        <main className={appShellStyles.main}>
          <div className={appShellStyles.mainContainer}>
             <Outlet />
          </div>
         
        </main>
        </div>

      </div>
    </div>
  );
};

export default AppShell;