import React from "react";

const GetInTouch: React.FC = () => {
  return (
    <section className="py-8 bg-gray-100">
      <div className="container mx-auto px-8 lg:px-16 mb-6">
        <h2 className="text-3xl font-bold text-center mb-8">Get in touch</h2>
        <div className="flex flex-wrap lg:flex-nowrap gap-12">
          <div className="flex-1 bg-white p-6 shadow-lg rounded-lg border-2 border-[#3b0764]">
            <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
            <ul className="space-y-2 text-gray-700">
              <li><i className="fas fa-phone-alt"></i> +91-79-40077398</li>
              <li><i className="fas fa-envelope"></i> admin@almatrail.com</li>
            </ul>
            <img src="/images/contact-us.png" alt="Contact Us" className="mt-6 w-1/3 mx-auto" />
          </div>
          <div className="flex-1 bg-white p-6 shadow-lg rounded-lg border-2 border-[#3b0764]">
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <input type="text" id="subject" className="w-full px-4 py-2 border rounded-lg" placeholder="Subject" />
                </div>
              </div>
              <div className="mb-4">
                <textarea id="comments" className="w-full px-4 py-2 border rounded-lg" rows="8" placeholder="Write Message Here"></textarea>
              </div>
              <div className="text-center">
                <button type="submit" className="w-full bg-[#1d0828] rounded-md py-2 text-white font-semibold shadow-sm transition duration-200 hover:bg-white hover:text-[#3b0764] border-2 border-transparent hover:border-[#3b0764]">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
