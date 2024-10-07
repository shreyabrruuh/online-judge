import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id, token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
        console.log("Sending request to reset password with:", { id, token, password });
      const response = await fetch(
        `http://localhost:8000/reset-password/${id}/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Received response:", data);

      if (data.status === "Success") {
        navigate("/login");
      } else {
        setError("Failed to reset password.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch. Please check your connection and try again.");
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-200 min-h-screen">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h4 className="text-xl font-semibold mb-4">Reset Password</h4>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              <strong>New Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              autoComplete="off"
              name="password"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-200"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;