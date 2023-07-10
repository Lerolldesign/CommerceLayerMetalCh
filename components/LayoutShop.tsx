import React, { useState } from "react";
import SEOHead from "@components/SEO";
import { LineItemsContainer, LineItemsCount } from "@commercelayer/react-components";
import LayoutContext from "@context/LayoutContext";
import LanguageSelector from "./LanguageSelector";
import CountrySelector from "./CountrySelector";
import { Country } from "@typings/models";
import { Transition } from "@headlessui/react";
import { SocialIcon } from "./SocialIcons";
import HeaderShop from "./elements/HeaderShop";
import ShoppingBag from "./ShoppingBag";
import FooterShop from "./elements/FooterShop";



type Props = {
  children: React.ReactNode;
  title?: string;
  socialIcons?: SocialIcon[];
  showMenu?: boolean;
  lang?: string;
  buildLanguages?: Country[];
  countries?: Country[];
  cms: string;
  pageTitle?: string;
};

const LayoutShop: React.FunctionComponent<Props> = ({
  children,
  lang = "en-us",
  showMenu = true,
  pageTitle,
  buildLanguages = [],
  countries = []
}) => {
  const [animation, setAnimation] = useState(false);
  const [burgerMenu, setBurgerMenu] = useState(false);
  const handleAnimation = (event: React.MouseEvent) => {
    event.preventDefault();
    setAnimation(!animation);
  };

  return (
    <LayoutContext.Provider value={{ handleAnimation }}>
   
      <SEOHead productName={pageTitle} />

      <div className="relative bg-ashy pattern overflow-hidden">
        
       <HeaderShop/>
         
     
        <div className="z-10 relative pt-5 pb-10 px-5 lg:px-0 lg:pb-16 max-w-screen-lg mx-auto">
          <div className="max-w-9xl mx-auto">
          <div className="hidden md:hidden md:absolute md:inset-y-0 md:right-40 md:items-center md:justify-end md:space-x-5">
                {showMenu && <CountrySelector options={countries} />}
                {showMenu && <LanguageSelector options={buildLanguages} />}
              </div>
          </div>
          <Transition
            show={burgerMenu}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 overflow-hidden z-10 top-0 transition transform origin-top-right md:hidden">
              <div className="px-4 sm:px-0 bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="pt-4 mb-10 flex items-center justify-between">
                  <div className="mr-3 mt-12 absolute right-0">
                    <button
                      type="button"
                      className="bg-white rounded-md p-2 inline-flex items-center justify-center text-black focus:outline-none"
                      onClick={() => setBurgerMenu(!burgerMenu)}
                    >
                      <span className="sr-only">Close menu</span>
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="min-h-screen" role="menu" aria-orientation="vertical" aria-labelledby="main-menu">
                  <div className="px-2 pt-24" role="none">
                    {showMenu && <CountrySelector options={countries} />}
                  </div>
                  <div className="px-2 pt-8" role="none">
                    {showMenu && <LanguageSelector options={buildLanguages} />}
                  </div>
                  <div className="px-3 pt-8" role="none">
                    {showMenu && (
                      <a href="#" onClick={handleAnimation}>
                        <div className="flex flex-row items-center">
                          <span className="inline-block">Cart</span>
                          <LineItemsContainer>
                            <LineItemsCount className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium leading-5 bg-blue-500 hover:bg-blue-400 text-gray-50" />
                          </LineItemsContainer>
                        </div>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
        <ShoppingBag active={animation} handleAnimation={handleAnimation} lang={lang} />
        <main>{children}</main>
        <FooterShop />
      </div>
      
    </LayoutContext.Provider>
  );
};

export default LayoutShop;
