import React from 'react';
import { Link } from 'react-router-dom';

const LoginLink = () => {
  return (
    <p className="mt-4 text-center text-sm text-gray-600">
      Already have an account?{" "}
      <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
        Login here
      </Link>
    </p>
  );
};

export default LoginLink;