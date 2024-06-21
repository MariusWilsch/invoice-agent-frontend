import React from 'react';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Your New App</h1>
        <p className="text-lg mb-6">This is a bare-bones application. Start building your amazing app here!</p>
        <Button variant="outline">Get Started</Button>
      </div>
    </div>
  );
};

export default Index;