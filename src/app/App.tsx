import React from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import { Toaster } from 'sonner';

export default function App() {
  return (
    <>
      <Toaster 
        position="top-center" 
        expand={false} 
        richColors 
        theme="dark" 
        toastOptions={{
          style: {
            background: 'rgba(15, 23, 42, 0.9)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(71, 85, 105, 0.2)',
            color: '#fff',
          }
        }}
      />
      <RouterProvider router={router} />
    </>
  );
}
