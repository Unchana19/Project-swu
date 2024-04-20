import React from "react";
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Button, Avatar } from "@nextui-org/react";
import { getSession } from "../services/authorize";
import { Link, useLocation } from "react-router-dom";

export default function NavbarComponent() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const menuItems = [
    { label: "BMI", path: "/" },
    { label: "Health Information", path: "/Health-Information" },
    { label: "Community", path: "/Community" },
    { label: `${getSession("username") ? "Logout" : "Login"}`, path: `${getSession("username") ? "/Profile" : "/Login"}` },
  ];

  return (
    <Navbar
      className="bg-zinc-800"
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle className="text-white" aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <p className="font-bold text-inherit text-white">LOGO</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        <NavbarBrand>
          <p className="font-bold text-inherit text-white">LOGO</p>
        </NavbarBrand>
        <NavbarItem>
          <Link to="/" aria-current={location.pathname === "/" ? "page" : undefined}>
            <p className={location.pathname === "/" ? "text-green-500" : "text-white"}>BMI</p>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/Health-Information" aria-current={location.pathname === "/Health-Information" ? "page" : undefined}>
            <p className={location.pathname === "/Health-Information" ? "text-green-500" : "text-white"}>Health Information</p>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/Community" aria-current={location.pathname === "/Community" ? "page" : undefined}>
            <p className={location.pathname === "/Community" ? "text-green-500" : "text-white"}>Community</p>
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex">
          {getSession("username") ?
            <p className="text-white">{getSession("username")}</p> :
            <Link to="/Sign-Up"><p className="text-white">Sign up</p></Link>}
        </NavbarItem>
        <NavbarItem className="items-center justify-center flex">
          {getSession("username") ?
            <Link to="/Profile">
              <Avatar showFallback src='https://images.unsplash.com/broken' />
            </Link> :
            <Button as={Link} color="success" to="/Login" variant="flat">
              Login
            </Button>}
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.label}-${index}`}>
            <Link
              className={`w-full ${location.pathname === item.path ? "text-green-500" : menuItems.length - 1 === index && getSession("username") ? "text-rose-700" : ""}`}
              to={item.path}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}