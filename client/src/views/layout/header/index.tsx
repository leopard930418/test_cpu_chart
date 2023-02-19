import { Grid, Hidden, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import TuneIcon from "@mui/icons-material/Tune";

import useMediaQuery from "@mui/material/useMediaQuery";
import Logo from "../../components/Logo";

export default function Header({ color = false, ...props }) {
  const isPhoneMode = useMediaQuery("(max-width:600px)");

  return (
    <div className="fixed w-full bg-[#0c0d0f] z-50 py-2 px-4 sm:px-10   bg-gradient-to-t from-[#111316] to-[#0c0d0f]">
      <Grid container className="items-center">
        <Grid item lg={6} md={6} sm={6} xs={6}>
          {isPhoneMode ? (
            <div className="flex flex-row items-center space-x-2">
              <HomeIcon style={{ color: "white" }} />
              <div className="flex sm:hidden cursor-pointer text-xl text-white font-bold">
                challenge
              </div>
            </div>
          ) : (
            <Logo />
          )}
        </Grid>

        <Grid
          item
          lg={6}
          md={6}
          sm={0}
          xs={0}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          <div className="flex flex-row justify-end xs:space-x-10 md:space-x-8">
            {isPhoneMode ? (
              <ViewModuleIcon style={{ color: "#d1d5db" }} fontSize="large" />
            ) : (
              <div className="text-gray-300 hover:text-white text-xl font-bold cursor-pointer hover-underline-animation">
                Home
              </div>
            )}
            {isPhoneMode ? (
              <TuneIcon style={{ color: "#d1d5db" }} fontSize="large" />
            ) : (
              <div className="text-gray-300 hover:text-white text-xl font-bold cursor-pointer hover-underline-animation ">
                About Us
              </div>
            )}
            {/* <AccountCircleIcon
              style={{ color: "#d1d5db" }}
              fontSize="large"
              className="hover:text-white cursor-pointer"
            /> */}
            <div className="border-2 border-white text-white text-2xl font-bold">
              Login
            </div>
          </div>
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6} className="flex justify-end">
          <Hidden mdUp>
            <div className="flex justify-end">
              <MenuIcon
                style={{ color: "#d1d5db" }}
                fontSize="large"
                className="hover:text-white cursor-pointer"
              />
            </div>
          </Hidden>
        </Grid>
      </Grid>
    </div>
  );
}
