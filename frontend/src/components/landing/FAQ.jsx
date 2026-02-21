const FAQ = () => {
  return (
    <section className="px-6 py-16 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-center text-[#15173D]">
        Frequently Asked Questions
      </h2>

      <div className="mt-8 space-y-6">
        <div>
          <h3 className="font-medium text-[#15173D]">
            can i edit the data?
          </h3>
          <p className="text-gray-600 text-sm mt-1">
            Yes,u can update the user details.
          </p>
        </div>

        <div>
          <h3 className="font-medium text-[#15173D]">
            Can I export user data?
          </h3>
          <p className="text-gray-600 text-sm mt-1">
            Yes, you can export user data into CSV format.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;