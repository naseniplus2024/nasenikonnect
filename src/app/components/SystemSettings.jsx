// components/SystemSettings.js

export default function SystemSettings() {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">System Settings</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Manage your system preferences and settings below.
        </p>
  
        <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Account Settings</h3>
          <form className="mt-4">
            <div className="mb-4">
              <label className="block text-sm text-gray-700 dark:text-gray-200" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="w-full mt-2 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                placeholder="Enter your username"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-700 dark:text-gray-200" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full mt-2 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                placeholder="Enter your email"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
            >
              Save Changes
            </button>
          </form>
        </div>
  
        <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Notification Preferences</h3>
          <div className="mt-4 space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="email-notifications"
                className="h-5 w-5 text-blue-600"
              />
              <label htmlFor="email-notifications" className="ml-2 text-gray-700 dark:text-gray-300">
                Email Notifications
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="sms-notifications"
                className="h-5 w-5 text-blue-600"
              />
              <label htmlFor="sms-notifications" className="ml-2 text-gray-700 dark:text-gray-300">
                SMS Notifications
              </label>
            </div>
          </div>
          <button
            type="button"
            className="mt-4 px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md"
          >
            Update Preferences
          </button>
        </div>
      </div>
    );
  }
  