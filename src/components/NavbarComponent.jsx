import React from "react";
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";

export default function NavbarComponent() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathName = window.location.pathname;

  const menuItems = [
    "Home",
    "BMI",
    "Activity",
    "Health Information",
    "Community",
    "Log Out",
  ];

  return (
    <Navbar
      className="bg-zinc-700"
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
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
            <p className={pathName === "/" ? "text-green-500" : "text-white"} >Home</p>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/BMI" aria-current={pathName === "/BMI" ? "page" : undefined}>
          <p className={pathName === "/BMI" ? "text-green-500" : "text-white"}>BMI</p>
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
        <NavbarItem className="hidden lg:flex">
          <Link href="#"><p className="text-white">Login</p></Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="success" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2 ? "success" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              href="#"
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