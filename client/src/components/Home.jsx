import React from 'react';

const Navbar = () => {
  return (
    <div className="flex justify-between items-center bg-gray-800 text-white p-4">
      <div className="flex gap-4">
        <a href="#" className="hover:text-gray-300">Home</a>
        <a href="#" className="hover:text-gray-300">User</a>
        <a href="#" className="hover:text-gray-300">Blog</a>
      </div>
      <div>
        <a href="#" className="hover:text-gray-300">Add User</a>
      </div>
    </div>
  );
};

export default Navbar;
