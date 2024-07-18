import React from "react";

import { ReactNavbar } from "overlay-navbar";
import { MdAccountCircle } from "react-icons/md";
import { MdSearch } from "react-icons/md";
import { MdAddShoppingCart } from "react-icons/md";

import logo from "../../images/logo.png";

function Header() {
  return (
    <React.Fragment>
      <ReactNavbar
        logo={logo}
        burgerColor="#190482"
        navColor1="white"
        burgerColorHover="#8E8FFA"
        logoWidth="90%"
        logoHoverColor="blue"
        link1Size="1.2rem"
        link1Color="#121212"
        link1Padding="1vmax"
        link1ColorHover="#190482"
        nav2justifyContent="flex-end"
        link1Margin="1vmax"
        link2Margin="0"
        link3Margin="0"
        link4Margin="1vmax"
        nav3justifyContent="flex-start"
        link1Family="sans-serif"
        link1Text="Home"
        link2Text="Products"
        link3Text="About Us"
        link4Text="Contact Us"
        link1Url="/"
        link2Url="/products"
        link3Url="About Us"
        link4Url="Contact Us"
        nav4justifyContent="flex-start"
        searchIconMargin="0.5vmax"
        cartIconMargin="1vmax"
        profileIconMargin="0.5vmax"
        searchIconColor="black"
        profileIconColor="black"
        cartIconColor="black"
        searchIconColorHover="#190482"
        cartIconColorHover="#190482"
        profileIconColorHover="#190482"
        profileIconUrl="/login"
        profileIcon={true}
        searchIcon={true}
        cartIcon={true}
        ProfileIconElement={MdAccountCircle}
        SearchIconElement={MdSearch}
        CartIconElement={MdAddShoppingCart}
      />
    </React.Fragment>
  );
}

export default Header;
