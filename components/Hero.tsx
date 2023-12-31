import React, { FunctionComponent, PropsWithChildren } from "react";

const Hero: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative text-gray-50 overflow-hidden border-b border-gray-200">
      <main className="font-metalch uppercase mt-5 mb-16 mx-auto max-w-screen-lg px-4 sm:px-6 md:mt-10">{children}</main>
    </div>
  );
};

export default Hero;
