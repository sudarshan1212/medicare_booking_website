import { useContext, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";

import logo from "../../assets/images/logo.png";

import { BiMenu } from "react-icons/bi";
import { authContext } from "../../context/AuthContext";

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/doctors",
    display: "Find a Doctors",
  },
  {
    path: "/services",
    display: "Services",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];
const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const { user, role, token } = useContext(authContext);
  // console.log(user);
  const handleStickyHeader = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };
  useEffect(() => {
    handleStickyHeader();

    return () => window.removeEventListener("scroll", handleStickyHeader);
  });
  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  return (
    <header className="header flex items-center" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between ">
          {/*____________logo____________ */}
          <div>
            <img src={logo} alt="logo" />
          </div>
          {/*____________menu____________ */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={(naClass) =>
                      naClass.isActive
                        ? "text-primaryColor text-[16px] leading-7 font-[600]"
                        : "text-textColor text-[16px] leading-7 font-[600] hover:text-primaryColor"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          {/* _____________navBar__________________ */}
          <div className="flex items-center gap-4 ">
            {token && user ? (
              <Link
                to={`${
                  role === "doctor" ? "/doctors/profile/me" : "/users/profile/me"
                } `}
              >
                <figure className="w-[35px] h-[35px] rounded-full cursor-pointer">
                  <img
                    src={user?.photo}
                    className="w-full rounded-full"
                    // alt="userimg"
                  />
                </figure>
                <h1 className="text-center ">{user?.name}</h1>
              </Link>
            ) : (
              <Link to="login">
                <button className=" bg-primaryColor py-2 px-6 text-white font-semibold h-[44px] flex items-center  rounded-3xl">
                  Login
                </button>
              </Link>
            )}

            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-5 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
