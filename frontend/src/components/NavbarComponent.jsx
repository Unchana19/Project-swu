import React from "react";
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Button, Avatar } from "@nextui-org/react";
import { getSession } from "../services/authorize";
import {useNavigate} from "react-router-dom";

export default function NavbarComponent() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathName = window.location.pathname;
  const navigate = useNavigate();

  const menuItems = [
    "BMI",
    "Health Information",
    "Community",
    "Log Out",
  ];

  const linkItem = [
    "/",
    "/Health-Information",
    "/Community",
    "/Profile",
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
          <Link href="/" aria-current={pathName === "/" ? "page" : undefined}>
            <p className={pathName === "/" ? "text-green-500" : "text-white"}>BMI</p>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/Health-Information" aria-current={pathName === "/Health-Information" ? "page" : undefined}>
            <p className={pathName === "/Health-Information" ? "text-green-500" : "text-white"}>Health Information</p>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/Community" aria-current={pathName === "/Community" ? "page" : undefined}>
            <p className={pathName === "/Community" ? "text-green-500" : "text-white"}>Community</p>
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex">
          {getSession("username") ?
            <p className="text-white">{getSession("username")}</p> :
            <Link href="/Sign-Up"><p className="text-white">Sign up</p></Link>}
        </NavbarItem>
        <NavbarItem className="items-center justify-center flex">
          {getSession("username") ?
            <Link href="/Profile">
              <Avatar showFallback src='https://images.unsplash.com/broken' />
            </Link> :
            <Button as={Link} color="success" href="/Login" variant="flat">
              Login
            </Button>}
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                pathName === linkItem[index] ? "success" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              onPress={() => navigate(linkItem[index])}
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}