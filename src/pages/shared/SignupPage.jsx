import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { axiosInstance } from '../../config/axiosInstance';

export const SignupPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  
  const [isAdmin, setIsAdmin] = useState(false);  // State to switch between user/admin signup

  const onSubmit = async (data) => {
    // Add role if admin signup
    if (isAdmin) {
      data.role = 'admin';
    }

    try {
      const response = await axiosInstance.post('/user/signup', data);

      if (response.data.success) {
        toast.success('Signup successful!');
        navigate('/login'); 
      } else {
        toast.error(response.data.message || 'Signup failed! Please try again.');
      }
    } catch (error) {
      console.log(error, '====error');
      toast.error('Signup failed! Please try again.');
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Signup now!</h1>
          <p className="py-6">
            Create an account to access exclusive offers, customize your orders, and enjoy a personalized food ordering experience. Join us today!
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                {...register('name', { required: 'Name is required' })}
                placeholder="Name"
                className={`input input-bordered ${errors.name ? 'input-error' : ''}`}
              />
              {errors.name && <span className="text-red-500">{errors.name.message}</span>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register('email', { required: 'Email is required' })}
                placeholder="Email"
                className={`input input-bordered ${errors.email ? 'input-error' : ''}`}
              />
              {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone</span>
              </label>
              <input
                type="text"
                {...register('mobile', { required: 'Mobile number is required', pattern: { value: /^\d{10}$/, message: 'Invalid phone number' } })}
                placeholder="Mobile Number"
                className={`input input-bordered ${errors.mobile ? 'input-error' : ''}`}
              />
              {errors.mobile && <span className="text-red-500">{errors.mobile.message}</span>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register('password', { required: 'Password is required' })}
                placeholder="Password"
                className={`input input-bordered ${errors.password ? 'input-error' : ''}`}
              />
              {errors.password && <span className="text-red-500">{errors.password.message}</span>}
            </div>
            {/* Optional Profile Picture */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Profile Picture (optional)</span>
              </label>
              <input
                type="text"
                {...register('profilePic')}
                placeholder="Profile Picture URL (optional)"
                className={`input input-bordered ${errors.profilePic ? 'input-error' : ''}`}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Are you an Admin?</span>
              </label>
              <input
                type="checkbox"
                onChange={() => setIsAdmin(!isAdmin)}
                className="checkbox checkbox-primary"
              />
              {isAdmin && <span className="text-sm">Admin access will give you the ability to manage menus and users.</span>}
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary w-full">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
