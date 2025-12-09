import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { MessageSquare } from "lucide-react";

const Navbar = () => {
  const {logout, authUser} = useAuthStore();
  if (authUser) {

  }

  return (

  )
}

export default Navbar
