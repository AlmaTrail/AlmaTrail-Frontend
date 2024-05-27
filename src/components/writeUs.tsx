import React from 'react';

const WriteUs = () => {
  return (
    <div className="bg-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mt-6 border-2 border-gray-600 rounded-md p-6 flex gap-8 h-96 overflow-y-auto">
          
          <div className="w-1/2 sm:w-1/2 lg:pl-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Write Message</h3>
            <textarea
              id="message"
              name="message"
              rows={3} // Adjust the number of rows here
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md mb-4 h-full" // Added h-full for full height
              placeholder="Your message here..."
            />
            <button type="submit" className="w-1/2 bg-[#1d0828] rounded-md py-2 text-white font-semibold shadow-sm transition duration-200 hover:bg-white hover:text-[#3b0764] border-2 border-transparent hover:border-[#3b0764]">
              Send Message
            </button>
          </div>

          <div className="w-1/2 sm:w-1/2">
            <h3 className="text-xl flex justify-center font-semibold text-gray-800 mb-4">Contact Information</h3>
            <div className="flex justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span className="text-gray-700">Mail: admin@almatrail.com</span>
            </div>
            <div className="flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span className="text-gray-700">Address: 123 Street, City, Country</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteUs;
