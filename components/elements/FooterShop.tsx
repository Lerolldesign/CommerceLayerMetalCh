import React, { FunctionComponent, PropsWithChildren } from "react";

const FooterShop: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
  <footer> 
<div className="w-full md:overflow-hidden pin flex flex-wrap">
    <div className=" h-full flex w-full mx-auto">
        <div className="md:pl-3 md:pr-0 pt-8 pb-0 md:pb-6 px-2 w-full flex flex-wrap bg-grey-light text-left">
             <div className="relative h-auto w-1/2 bg-grey">
                {/* switcher and disclamer METAL CHRONOMETRIE */}
             <div className="footer--extras">
            
                <div className="footer--disclaimer">
                <p className='font-extrabold uppercase !text-[.8rem]'>&copy; {new Date().getFullYear()}.Metal Chronometrie.</p>
             </div>
        </div>
      </div>
      <div className="relative h-full py-40 w-1/2 bg-grey text-right">
      <a className="font-extrabold uppercase !text-[.8rem]">We respect your privacy</a>
      </div>
    </div>
    </div>
</div>
<main>{children}</main>
</footer> 
  );
};

export default FooterShop;
