import React from "react";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/">
      <div className="font-bold text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
        Challenge
      </div>
    </Link>
  );
}
