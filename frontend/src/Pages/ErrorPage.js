import React from "react";

const ErrorPage = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-around bg-black">
      <p className="text-red-600 font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
        Page Not Found
      </p>
      <button className="bg-bgTwo text-textTwo hover:scale-105 duration-200 text-lg p-2 rounded-md">
        Back to Safety
      </button>
    </div>
  );
};

export default ErrorPage;
