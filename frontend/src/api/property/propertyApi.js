import { API_BASE_URL, getAuthHeaders, apiCall } from '../../config/api.js';

export const createProperty = async (formData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/properties`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error creating property:", data.message || data);
      throw new Error(data.message || "Failed to create property");
    }

    return data;
  } catch (error) {
    console.error("Create property error:", error);
    throw error;
  }
};

// GET single property by ID
export const getPropertyById = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("Error fetching property:", data.message || data);
      throw new Error(data.message || "Failed to fetch property");
    }

    return data;
  } catch (error) {
    console.error("Get property error:", error);
    throw error;
  }
};

export const updateProperty = async (id, formData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error updating property:", data.message || data);
      throw new Error(data.message || "Failed to update property");
    }

    return data;
  } catch (error) {
    console.error("Update property error:", error);
    throw error;
  }
};

export const deleteProperty = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error deleting property:", data.message || data);
      throw new Error(data.message || "Failed to delete property");
    }

    return data;
  } catch (error) {
    console.error("Delete property error:", error);
    throw error;
  }
};

// GET all public properties
export const getAllPublicProperties = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/properties`, {
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