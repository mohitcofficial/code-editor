import axios from "axios";
import React, { useEffect, useState } from "react";
import api from "../services/api/Auth.api";

function Verify() {
  const [found, setFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const currentUrl = window.location.href;
  const parts = currentUrl.split("/");
  const lastElement = parts[parts.length - 1];

  useEffect(() => {
    const verifyUser = async () => {
      try {
        setLoading(true);
        const data = await api.verify({ token: lastElement });
        console.log(data);
        setFound(true);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setFound(false);
      }
    };
    verifyUser();
  }, []);

  return (
    <>
      {!loading && found && (
        <h2 style={{ color: "white" }}>Account Verified</h2>
      )}
      {!loading && !found && (
        <h2 style={{ color: "white" }}>Token Expired Try Again!</h2>
      )}
    </>
  );
}

export default Verify;
