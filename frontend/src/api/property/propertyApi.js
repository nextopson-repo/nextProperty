const BASE_URL = "https://nextproperty-rfgj.onrender.com/api";

// Helper to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

export const createProperty = async (formData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${BASE_URL}/properties`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData, 
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create property");
    }
    
    return data;
  } catch (error) {
    console.error("Property creation error:", error);
    throw error;
  }
};

// GET single property by ID
export const getPropertyById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/properties/${id}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    const data = await response.json();
    if (!response.ok) throw data;
    return data;
  } catch (error) {
    throw error;
  }
};

// UPDATE property by ID (with image support)
export const updateProperty = async (id, formData) => {
  try {
    const token = localStorage.getItem("token");
    
    const response = await fetch(`${BASE_URL}/properties/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update property");
    }

    return data;
  } catch (error) {
    console.error("Error updating property:", error);
    throw error;
  }
};

// DELETE property by ID
export const deleteProperty = async (id) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${BASE_URL}/properties/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Delete failed:", data);
      throw new Error(data.message || "Failed to delete property");
    }

    return data;
  } catch (error) {
    console.error("Error deleting property:", error);
    throw error;
  }
};

// GET all public properties
export const getAllPublicProperties = async () => {
  try {
    const response = await fetch(`${BASE_URL}/properties`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error fetching public properties:", data.message || data);
      throw new Error(data.message || "Failed to fetch public properties");
    }

    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};