import React from "react";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div>
      <p>Something wnet wrong</p>
      <button
        onClick={() => navigate("/")}
        className="w-[100px] h-[34px] rounded-lg bg-red-800 text-white"
      >
        Go to home
      </button>
    </div>
  );
}

export default ErrorPage;
