import React from "react";

function Sidebar() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-gray-700 w-40 h-screen flex flex-col justify-between">
        <div className="space-y-4 p-4">
          <button className="w-full bg-gray-300 text-left py-2 px-4">Home</button>
          <button className="w-full bg-blue-600 text-left py-2 px-4">User</button>
          <button className="w-full bg-gray-300 text-left py-2 px-4">Blog</button>
        </div>
        <div className="p-4">
          <div className="text-white flex flex-col items-center mb-4">
            <span>Admin</span>
            <div className="w-10 h-10 bg-gray-300 rounded-full mt-2"></div>
          </div>
          <button className="w-full bg-gray-300 py-2 px-4">Log Out</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100">
        <div className="flex justify-end items-center bg-blue-800 p-4">
          <button className="bg-gray-300 py-2 px-4 rounded">Add User</button>
        </div>
        <div className="p-4">Main content goes here</div>
      </div>
    </div>
  );
}

export default Sidebar;