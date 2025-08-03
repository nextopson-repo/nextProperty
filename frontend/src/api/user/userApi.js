import { API_BASE_URL, apiCall } from '../../config/api.js';

// Signup API using fetch
export const signupUser = async ({ name, email, password }) => {
  try {
    const res = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }), 
    });

    const data = await res.json();
    
    if (!res.ok) {
      throw data;
    }

    return data;
  } catch (error) {
    throw error || { message: "Signup failed" };
  }
};

// Login API using fetch and store token
export const loginUser = async ({ email, password }) => {
  try {
    const res = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw data;
    }

    // Save token to localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user)); 
    window.dispatchEvent(new Event("storage"));
    return data;
  } catch (error) {
    throw error || { message: "Login failed" };
  }
};

export const logoutUser = async () => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("storage"));
  } catch (error) {
    console.error("Logout error:", error);
  }
};

export const getUserProfile = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw { message: "No token found. Please login again." };
  }

  try {
    const res = await fetch(`${API_BASE_URL}/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // If response is HTML (i.e. server error), throw an error
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw { message: "Unexpected server response. Please check the API." };
    }

    const data = await res.json();

    if (!res.ok) {
      throw data;
    }

    return data;
  } catch (error) {
    throw error || { message: "Failed to fetch profile" };
  }
};