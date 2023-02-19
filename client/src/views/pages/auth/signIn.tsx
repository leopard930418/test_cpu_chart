import React, { useState } from "react";
import Link from "@mui/material/Link";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import HttpsIcon from "@mui/icons-material/Https";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import authHeader from "../../../auth/auth";

export default function SignIn() {
  const navigation = useNavigate();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  const isPhoneMode = useMediaQuery("(max-width:600px)");
  const [passwordShown, setPasswordShown] = React.useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const ColorButton = styled(Button)(({ theme }) => ({
    // color: '#9ca3af',
    backgroundColor: "#1f2937 !important",
    "&:hover": {
      backgroundColor: "#1f2937 !important",
    },
    width: "50%",
  }));
  const [remember, setRememberState] = React.useState(false);
  const handleChange = (event: any) => {
    setRememberState(!remember);
  };
  const handleSignIn = (e: any) => {
    e.preventDefault();
    // navigation("/");
    axios
      .post("http://localhost:8080/api/auth/login", {
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem("accessToken", res.data.accessToken);
        navigation("/");
      });
  };

  return (
    <div className="bg-gradient-to-t from-[#3a444d] to-[#0c0d0f]">
      <div className="w-full h-screen sm:h-screen flex flex-col justify-center">
        <div className="w-full px-8 py-2 sm:p-2 ">
          <div className="flex justify-center items-center pt-32 sm:pt-24">
            <div className="w-full sm:w-1/3">
              <div className=" text-2xl sm:text-3xl text-white text-opacity-50 text-center font-bold  ">
                Customer Login
              </div>

              <div className="py-4 flex flex-col">
                <div className="flex flex-row space-x-4 py-4">
                  <PersonIcon style={{ color: "white" }} />
                  <div className="text-white">Email address</div>
                </div>
                <input
                  placeholder="Username"
                  className="w-full border border-[#E9E9E9] bg-[#F0F1F2] outline-none py-2 px-4"
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>

              <div className="py-4 flex flex-col">
                <div className="flex flex-row space-x-4 py-4">
                  <HttpsIcon style={{ color: "white" }} />
                  <div className="text-white">Password</div>
                </div>
                <div className="w-full flex flex-row justify-between bg-[#F0F1F2]  py-2 px-4">
                  <input
                    placeholder="Password"
                    className="bg-transparent outline-none"
                    type={passwordShown ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                  <div onClick={togglePasswordVisiblity}>
                    {!passwordShown ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </div>
                </div>
              </div>
              <div className="pl-1 flex flex-col">
                <div className="text-white">Don't have an account?</div>
                <Link
                  className="text-[14px] sm:text-[14px] italic text-white text-opacity-70 cursor-pointer pt-2.5"
                  underline="hover"
                  href="/auth/signUp"
                >
                  Create new Account
                </Link>
              </div>
              <div className="flex justify-center px-2 py-4">
                <ColorButton variant="contained" onClick={handleSignIn}>
                  Sign In
                </ColorButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
