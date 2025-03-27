import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const Header = () => {
  const navigate = useNavigate();
  return (
    <nav className="p-4 flex justify-between items-center">
      <Link to={"/"}>
        <img
          src="/logo.png"
          alt="url-shortener-logo"
          className="h-16 rounded-full"
        />
      </Link>

      <div>
        <Button onClick={() => navigate("/auth")}>Login</Button>
      </div>
    </nav>
  );
};

export default Header;
