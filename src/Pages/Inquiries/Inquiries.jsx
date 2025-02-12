import React, { useState } from 'react';
import { TriangleAlert, CheckCircle, Clock } from 'lucide-react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';



// This dummy data will be fetched from api
const dummyInquiries = [
  { id: 1, name: 'John Doe', email: 'john@example.com', message: 'How can I reset my password?', status: 'Pending' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', message: 'Do you offer refunds?', status: 'Resolved' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', message: 'Can I upgrade my plan?', status: 'Pending' }
];

const Inquiries = () => {
  const [inquiries, setInquiries] = useState(dummyInquiries);

  const toggleStatus = (id) => {
    setInquiries(prev => prev.map(inquiry =>
      inquiry.id === id ? { ...inquiry, status: inquiry.status === 'Pending' ? 'Resolved' : 'Pending' } : inquiry
    ));
  };

  return (
    <div className='p-6'>
      <div className='flex items-center gap-4 mb-6'>
        <TriangleAlert className='w-6 h-6 text-red-500' /> 
        <span className='text-2xl font-semibold'>Inquiries</span>
      </div>
      <TableContainer component={Paper} className='shadow-md'>
        <Table>
          <TableHead>
            <TableRow className='bg-gray-100'>
              <TableCell className='font-semibold'>Name</TableCell>
              <TableCell className='font-semibold'>Email</TableCell>
              <TableCell className='font-semibold'>Message</TableCell>
              <TableCell className='font-semibold'>Status</TableCell>
              <TableCell className='font-semibold'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inquiries.map(({ id, name, email, message, status }) => (
              <TableRow key={id}>
                <TableCell>{name}</TableCell>
                <TableCell>{email}</TableCell>
                <TableCell>{message}</TableCell>
                <TableCell>
                  <span className={`px-3 py-1 text-sm rounded ${status === 'Resolved' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                    {status === 'Resolved' ? <CheckCircle className='inline w-4 h-4 mr-1 text-green-600' /> : <Clock className='inline w-4 h-4 mr-1 text-yellow-600' />} 
                    {status}
                  </span>
                </TableCell>
                <TableCell>
                  <Button onClick={() => toggleStatus(id)} variant='outlined' className='border border-gray-400 px-3 py-1 rounded hover:bg-gray-100'>
                    Mark as {status === 'Pending' ? 'Resolved' : 'Pending'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Inquiries;
