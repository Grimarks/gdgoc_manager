import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route");
  }, []);

  return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="mb-4 text-5xl font-bold text-black">404</h1>
          <p className="mb-4 text-lg text-gray-600">
            Oops! Page not found!
            Tunggu nanti yaaa
          </p>

          <a
              href="/"
              className="text-[#4285F4] underline hover:opacity-80 transition"
          >
            Return to Home
          </a>
        </div>
      </div>
  );
}
