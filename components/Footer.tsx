import NavLink from "./NavLink";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-white">
      <div className="mx-auto max-w-6xl px-6 py-10 md:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:items-start">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-[#6155F5]">
              Course Compass
            </h2>
          </div>
    <footer className="border-t bg-white px-8 py-10">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
        <div>
          <h2 className="text-2xl font-bold text-indigo-600">Course Compass</h2>
        </div>

          <div className="text-center md:text-left">
            <h3 className="mb-4 text-lg font-semibold text-black">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-base">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/browse">Browse</NavLink>
              <NavLink href="/about">About</NavLink>
            </div>
          </div>

          {/* Right: Feedback */}
          <div className="text-center md:text-left">
            <div className="flex flex-col items-center gap-4 md:items-end">
              <button className="rounded-lg bg-[#6155F5] px-6 py-3 text-white hover:opacity-90">
                Leave Feedback
              </button>

              <p className="max-w-xs text-sm leading-6 text-gray-600 md:text-right">
                Did you find what you were looking for? Share your feedback!
              </p>
            </div>
          </div>
        <div className="flex flex-col items-start gap-3">
          <button className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
            Leave Feedback
          </button>
          <p className="text-sm text-gray-500">
            Did you find what you were looking for? Share your feedback!
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="border-t border-gray-300" />
      </div>

      <div className="mx-auto max-w-6xl px-6 py-8 text-center text-sm text-gray-600 md:px-10">
        © 2026 Course Compass
      </div>
      <p className="text-center text-sm text-gray-500">© 2026 Course Compass</p>
    </footer>
  );
}
