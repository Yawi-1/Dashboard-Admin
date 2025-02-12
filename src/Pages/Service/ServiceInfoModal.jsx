import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

const ServiceInfoModal = ({ isOpen, onClose, service }) => {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Service Details</DialogTitle>
      <DialogContent>
        <div className="p-4">
          {service.coverImage && (
            <img src={service.coverImage} alt={service.title} className="w-full h-96 object-cover rounded mb-4" />
          )}
          <h2 className="text-xl ">Title : <span className="font-semibold">{service.title}</span></h2>
          <p className="text-gray-700 mt-2">Description : <span className="font-semibold">{service.description}</span></p>
          <div className="mt-4 text-sm text-gray-500">
            <p><strong>Created At:</strong> {new Date(service.createdAt).toLocaleString()}</p>
            <p><strong>Updated At:</strong> {new Date(service.updatedAt).toLocaleString()}</p>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ServiceInfoModal;
