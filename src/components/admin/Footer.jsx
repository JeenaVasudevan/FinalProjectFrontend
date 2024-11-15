import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10 px-4 md:px-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Services Section */}
        <nav>
          <h6 className="text-xl font-semibold text-yellow-400 mb-4">Services</h6>
          <a className="block text-base hover:text-yellow-400 mb-2">Branding</a>
          <a className="block text-base hover:text-yellow-400 mb-2">Design</a>
          <a className="block text-base hover:text-yellow-400 mb-2">Marketing</a>
          <a className="block text-base hover:text-yellow-400 mb-2">Advertisement</a>
        </nav>

        {/* Company Section */}
        <nav>
          <h6 className="text-xl font-semibold text-yellow-400 mb-4">Company</h6>
          <a className="block text-base hover:text-yellow-400 mb-2">About us</a>
          <a className="block text-base hover:text-yellow-400 mb-2">Contact</a>
          <a className="block text-base hover:text-yellow-400 mb-2">Jobs</a>
          <a className="block text-base hover:text-yellow-400 mb-2">Press kit</a>
        </nav>

        {/* Legal Section */}
        <nav>
          <h6 className="text-xl font-semibold text-yellow-400 mb-4">Legal</h6>
          <a className="block text-base hover:text-yellow-400 mb-2">Terms of use</a>
          <a className="block text-base hover:text-yellow-400 mb-2">Privacy policy</a>
          <a className="block text-base hover:text-yellow-400 mb-2">Cookie policy</a>
        </nav>

        {/* Newsletter Section */}
        <form>
          <h6 className="text-xl font-semibold text-yellow-400 mb-4">Newsletter</h6>
          <fieldset className="form-control">
            <label className="label mb-2">
              <span className="label-text text-base">Enter your email address</span>
            </label>
            <div className="flex flex-col md:flex-row items-center">
              <input
                type="email"
                placeholder="username@site.com"
                className="input input-bordered w-full md:w-64 p-2 mb-4 md:mb-0 rounded-l-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <div className="mt-4 md:mt-0 md:ml-4">
                <button className="btn btn-primary w-full md:w-auto rounded-r-md text-white font-semibold hover:bg-yellow-600 transition duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>

      <div className="text-center text-sm mt-10 border-t pt-4 border-gray-700">
        <p>&copy; 2024 Zestora. All rights reserved.</p>
      </div>
    </footer>
  );
};
