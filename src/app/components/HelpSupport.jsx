// components/HelpSupport.js

import React from "react";

const HelpSupport = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Help & Support Desk
      </h3>
      <p className="text-lg text-gray-700 dark:text-gray-300">
        For assistance with any issues or questions about our platform, please
        refer to the following options:
      </p>
      <div className="space-y-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
            Contact Us
          </h4>
          <p className="text-gray-700 dark:text-gray-300">
            You can reach our support team at:
          </p>
          <p className="text-blue-500 hover:underline">support@NASENIconnect.com or call +2348166967926</p>
          
        </div>

       
      </div>
    </div>
  );
};

export default HelpSupport;
