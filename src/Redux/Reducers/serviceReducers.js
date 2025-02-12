import { createSlice } from "@reduxjs/toolkit";
import { fetchServices, addService, deleteService, updateService } from "../Actions/serviceActions";

const serviceSlice = createSlice({
  name: "services",
  initialState: {
    services: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetching services
      .addCase(fetchServices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Handle adding a new service
      .addCase(addService.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addService.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.services.push(action.payload); // Add new service to the state
      })
      .addCase(addService.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // Handle deleting a service
      .addCase(deleteService.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.services = state.services.filter((service) => service.id !== action.payload);
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // Handle updating a service
      .addCase(updateService.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedService = action.payload;
        state.services = state.services.map((service) =>
          service._id === updatedService._id ? updatedService : service
        );
      })
      .addCase(updateService.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export default serviceSlice.reducer;
