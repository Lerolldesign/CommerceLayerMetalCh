import React, { FunctionComponent, PropsWithChildren } from "react";

const FooterShop: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative text-gray-50 overflow-hidden border-b border-gray-200">
     <h3 className="text-red-500">I'm a footer</h3>   
      <main className="mt-5 mb-16 mx-auto max-w-screen-lg px-4 sm:px-6 md:mt-10">{children}</main>
    </div>
  );
};

export default FooterShop;
