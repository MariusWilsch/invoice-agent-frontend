import React from 'react';
import { Button } from "@/components/ui/button";
import FormInput from '@/components/atoms/FormInput';
import PasswordInput from '@/components/atoms/PasswordInput';

const SignUpForm = ({ email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, handleSubmit, isSubmitting }) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormInput
        label="Email"
        id="email"
        type="email"
        placeholder="E.g. john@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={isSubmitting}
      />
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <PasswordInput
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isSubmitting}
        />
      </div>
      <FormInput
        label="Confirm Password"
        id="confirmPassword"
        type="password"
        placeholder="Confirm your password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        disabled={isSubmitting}
      />
      <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700" disabled={isSubmitting}>
        {isSubmitting ? 'Signing Up...' : 'Sign Up'}
      </Button>
    </form>
  );
};

export default SignUpForm;