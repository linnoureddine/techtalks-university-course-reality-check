export default function Footer() {
  return (
    <footer className="border-t bg-white px-8 py-10">
     
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
        
        <div>
          <h2 className="text-2xl font-bold text-indigo-600">
            Course Compass
          </h2>
        </div>

        <div>
          <h3 className="mb-3 font-semibold text-gray-900">Quick Links</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="hover:text-indigo-600 cursor-pointer">Home</li>
            <li className="hover:text-indigo-600 cursor-pointer">Browse</li>
            <li className="hover:text-indigo-600 cursor-pointer">About</li>
          </ul>
        </div>

        <div className="flex flex-col items-start gap-3">
          <button className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
            Leave Feedback
          </button>
          <p className="text-sm text-gray-500">
            Did you find what you were looking for?  
            Share your feedback!
          </p>
        </div>
      </div>

      <div className="my-8 border-t"></div>

      <p className="text-center text-sm text-gray-500">
        © 2026 Course Compass
      </p>
    </footer>
  );
}
