import { createAsyncThunk } from "@reduxjs/toolkit";


const BASE_URL = "https://dashboard-backend-rw1e.onrender.com/api/v1/gallery"
export const addGallery = createAsyncThunk(
    "gallery/addGallery",
    async (gallery) => {
        try {
            const res = await fetch(`${BASE_URL}/Create`,{
                method: 'POST',
                body : gallery
            });
            const data = await res.json();
            return data.gallery;
        } catch (error) {
            console.log('Error at adding gallery ',error);
            
        }
    }
)

export const fetchAllGallery = createAsyncThunk(
    "gallery/fetchALLGallery",
    async () => {
        try {
            const res = await fetch(`${BASE_URL}/getAllGallery`);
            const data = await res.json();
            return data.gallery;
        } catch (error) {
            console.log('Error at fetching all gallery ',error);
        }
    }
)

export const deleteGallery = createAsyncThunk(
    "gallery/deleteGallery",
    async (galleryId) => {
        try {
            const res = await fetch(`${BASE_URL}/delete/${galleryId}`,{
                method: 'DELETE'
            })
            const data = await res.json();
            return data.gallery;
        } catch (error) {
            console.log('Error at deleting gallery ',error);
        }
    }
)