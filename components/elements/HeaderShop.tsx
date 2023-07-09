import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LineItemsContainer, LineItemsCount } from "@commercelayer/react-components";
import ShoppingBag from "../ShoppingBag";
import LanguageSelector from "../LanguageSelector";
import CountrySelector from "../CountrySelector";
import { Country } from "@typings/models";
import { Transition } from "@headlessui/react";
import locale from "@locale/index";
import Logo from "../assets/logo-metal-chronometrie-dark.png"



type Props = {

  showMenu?: boolean;
  lang?: string;
  buildLanguages?: Country[];
  countries?: Country[];
};

const HeaderShop: React.FunctionComponent<Props> = ({
    showMenu = true,
    lang = "en-us",
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
    <div>
    <div className="fixed z-10 w-full top-0 py-10">
      <div className="relative">
        <div className="xl:mx-20">
          <nav className="relative flex items-center justify-between sm:h-10 md:justify-center" aria-label="Global">
            <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
              <div className="flex items-center justify-between w-full md:w-auto">
                <Link href="/" passHref>
                  <span className="sr-only">metal chronoetrie</span>
                  <Image
                    className="h-full w-full"
                    src={Logo}
                    alt="Logo Metal Chronometrie"
                    loading="eager"
                    width={300}
                    height={50}
                  />
                </Link>
                {showMenu && (
                  <div className="-mr-2 flex items-center md:hidden">
                    <button
                      type="button"
                      className="bg-gray-50 rounded-md p-2 inline-flex items-center justify-center text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black"
                      id="main-menu"
                      aria-haspopup="true"
                      onClick={() => setBurgerMenu(!burgerMenu)}
                    >
                      <span className="sr-only">Open main menu</span>
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>


            <div className="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
              {showMenu && (
                <a href="#" onClick={handleAnimation}>
                  <div className="flex flex-row items-center">
                    <span className="hidden md:inline-block">{locale[lang].shoppingBag}</span>
                    <LineItemsContainer>
                      <LineItemsCount className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium leading-5 bg-indigo-500 hover:bg-indigo-400 text-gray-50" />
                    </LineItemsContainer>
                  </div>
                </a>
              )}
            </div>
          </nav>
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
   
    </div>
  </ div>
  
  )
}

export default HeaderShop;