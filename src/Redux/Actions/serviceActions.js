import { createAsyncThunk } from "@reduxjs/toolkit";

// Fetch all services
export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async () => {
    const response = await fetch(
      "https://dashboard-backend-rw1e.onrender.com/api/v1/getallService"
    );
    const data = await response.json();
    return data.services;
  }
);

// Add a new service
export const addService = createAsyncThunk(
  "services/addService",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://dashboard-backend-rw1e.onrender.com/api/v1/Create",
        {
          method: "POST",
          body: formData, // Send the FormData object
        }
      );

      if (!response.ok) {
        const errorData = await response.json(); // Parse backend error
        return rejectWithValue(errorData.message || "Failed to add service.");
      }

      const data = await response.json();
      return data; // Return the newly created service
    } catch (error) {
      return rejectWithValue(error.message); // Handle network/other errors
    }
  }
);

// Delete a service
export const deleteService = createAsyncThunk(
  "services/deleteService",
  async (serviceId) => {
    try {
      const response = await fetch(
        `https://dashboard-backend-rw1e.onrender.com/api/v1/deleteService/${serviceId}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return error.message || "Failed to delete service";
    }
  }
);

// Update a service
export const updateService = createAsyncThunk(
  "services/updateService",
  async ({ serviceId, title, description }) => {
    try {
      const response = await fetch(
        `https://dashboard-backend-rw1e.onrender.com/api/v1/updateService/${serviceId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, description }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to update service");
      }
      return data;
    } catch (error) {
      throw new Error(error.message || "Failed to update service");
    }
  }
);
