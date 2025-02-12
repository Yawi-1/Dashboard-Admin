import React, { useState } from 'react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    category: '',
    gender: '' // Added gender field
  });

  const roles = [
    'Web Developer',
    'Android Developer',
    'Graphic Designer',
    'Digital Marketing',
    'Data Analyst'
  ];

  const categories = [
    'React JS ',
    'React JS and  Node Js  ',
    'Python ',
    'Java ',
   
  ];

  const genders = [
    'Male',
    'Female'
  ];

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.role) {
      newErrors.role = 'Please select a role';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Please enter a valid ZIP code';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData.gender) {
      newErrors.gender = 'Please select a gender';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSuccess(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          role: '',
          phoneNumber: '',
          address: '',
          city: '',
          state: '',
          zipCode: '',
          category: '',
          gender: ''
        });
      } catch (error) {
        console.error('Registration failed:', error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const FormInput = ({ label, name, type = 'text', placeholder = '', autoComplete = '' }) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={formData[name]}
        onChange={handleChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`mt-1 block w-full rounded-md border ${
          errors[name] ? 'border-red-300' : 'border-gray-300'
        } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm`}
      />
      {errors[name] && (
        <p className="mt-2 text-sm text-red-600">{errors[name]}</p>
      )}
    </div>
  );

  const FormSelect = ({ label, name, options }) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className={`mt-1 block w-full rounded-md border ${
          errors[name] ? 'border-red-300' : 'border-gray-300'
        } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm`}
      >
        <option value="">Select a {label.toLowerCase()}</option>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      {errors[name] && (
        <p className="mt-2 text-sm text-red-600">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {success && (
            <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-md">
              Registration successful! Please check your email to verify your account.
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormInput label="First Name" name="firstName" />
              <FormInput label="Last Name" name="lastName" />
            </div>

            <FormInput 
              label="Email address" 
              name="email" 
              type="email" 
              autoComplete="email" 
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <FormSelect label="Role" name="role" options={roles} />
              <FormSelect label="Category" name="category" options={categories} />
              <FormSelect label="Gender" name="gender" options={genders} />
            </div>

            <FormInput 
              label="Phone Number" 
              name="phoneNumber" 
              type="tel" 
              placeholder="123-456-7890" 
            />

            <FormInput label="Street Address" name="address" />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <FormInput label="City" name="city" />
              <FormInput label="State" name="state" />
              <FormInput label="ZIP Code" name="zipCode" />
            </div>

            <FormInput 
              label="Password" 
              name="password" 
              type="password" 
              autoComplete="new-password" 
            />

            <FormInput 
              label="Confirm Password" 
              name="confirmPassword" 
              type="password" 
              autoComplete="new-password" 
            />

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#edba12] hover:bg-[#cea932fb] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;