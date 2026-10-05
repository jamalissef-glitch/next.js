'use client';

import { useState } from 'react';

export default function Exercise3Page() {
 const [formData, setFormData] = useState({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
 });

 const [error, setError] = useState('');
 const [successMessage, setSuccessMessage] = useState('');
 const [submittedName, setSubmittedName] = useState('');

 const handleChange = (e: React.ChangeEvent) => {
  setFormData({
   ...formData,
   [e.target.name]: e.target.value,
  });
 };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setSuccessMessage('');

  if (formData.password.length < 6) {
   setError('Password-ku waa inuu ka badan yahay ugu yaraan 6 xarfo.');
   return;
  }

  console.log('Server Received Email:', formData.email);

  setSubmittedName(`\({formData.firstName}\){formData.lastName}`);
  setSuccessMessage('Thanks for submitting!');

  setFormData((prev) => ({ ...prev, password: '' }));
 };

 return (
  <main className="p-6">
   <h1 className="text-2xl font-bold mb-2">Exercise 3: Form Validation</h1>
   <form onSubmit={handleSubmit} className="space-y-4">
    <div>
     <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
      First Name
     </label>
     <input
      type="text"
      id="firstName"
      name="firstName"
      value={formData.firstName}
      onChange={handleChange}
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
     />
    </div>
    <div>
     <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
      Last Name
     </label>
     <input
      type="text"
      id="lastName"
      name="lastName"
      value={formData.lastName}
      onChange={handleChange}
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
     />
    </div>
    <div>
     <label htmlFor="email" className="block text-sm font-medium text-gray-700">
      Email
     </label>
     <input
      type="email"
      id="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
     />
    </div>
    <div>
     <label htmlFor="password" className="block text-sm font-medium text-gray-700">
      Password
     </label>
     <input
      type="password"
      id="password"
      name="password"
      value={formData.password}
      onChange={handleChange}
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
     />
    </div>
    {error && (
     <div className="p-4 bg-red-100 text-red-800 rounded-md">{error}</div>
    )}
    {successMessage && (
     <div className="p-4 bg-green-100 text-green-800 rounded-md">{successMessage}</div>
    )}
    {submittedName && (
     <div className="p-4 bg-blue-100 text-blue-800 rounded-md">
      Submitted Name: {submittedName}
     </div>
    )}
    <button
     type="submit"
     className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-offset-2 focus:ring-blue-5₀₀"
    >
     Submit
    </button>
   </form>
  </main>
 );
}