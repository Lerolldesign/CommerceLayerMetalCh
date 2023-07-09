import React, { useContext, useState, FunctionComponent, useEffect } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import _ from "lodash";
import Layout from "@components/Layout";
import {
  CommerceLayer,
  Price,
  PricesContainer,
  OrderContainer,
  AddToCartButton,
  OrderStorage
} from "@commercelayer/react-components";
import LayoutContext from "@context/LayoutContext";
import { useGetToken } from "@hooks/GetToken";
import { useRouter } from "next/router";
import locale from "@locale/index";
import { parseImg, parseLanguageCode } from "@utils/parser";
import { cmsFunctions } from "@utils/cms";
import { Product, Country } from "@typings/models";



type Props = {
  product: Product;
  clientId: string;
  endpoint: string;
  countryCode: string;
  lang: string;
  marketId: string;
  buildLanguages?: Country[];
  cms: string;
  countries: Country[];
};

const AddToCartCustom = (props: any) => {
  const { className, label, disabled, handleClick } = props;
  const { handleAnimation } = useContext(LayoutContext);
  const customHandleClick = async (e: any) => {
    const { success } = await handleClick(e);
    if (success && handleAnimation) handleAnimation(e);
  };
  return (
    <button disabled={disabled} className={className} onClick={customHandleClick}>
      {label}
    </button>
  );
};

const ProductPage: FunctionComponent<Props> = ({
  product,
  clientId,
  endpoint,
  countryCode,
  lang = "en-US",
  marketId,
  buildLanguages,
  cms,
  countries
}) => {
  const router = useRouter();
  const token = useGetToken({
    clientId,
    endpoint,
    scope: marketId,
    countryCode: router.query?.countryCode as string
  });
  const imgUrl = parseImg(_.first(product?.images)?.url as string, cms);
  const firstVariantCode = _.first(product?.variants)?.code as string;
  const variantOptions = product?.variants?.map((variant) => {
    return {
      label: variant.size.name,
      code: variant.code,
      lineItem: {
        name: product.name,
        imageUrl: _.first(variant.images)?.url
      }
    };
  });

  const languageCode = parseLanguageCode(lang, "toLowerCase", true);

  const [selectedVariant, setSelectedVariant] = useState<string>();

  useEffect(() => {
    setSelectedVariant(firstVariantCode);
  }, [firstVariantCode]);

  return !product ? null : (
    <CommerceLayer accessToken={token} endpoint={endpoint}>
      <OrderStorage persistKey={`order-${countryCode}`}>
        <OrderContainer attributes={{ language_code: languageCode }}>
          <Layout cms={cms} pageTitle={product.name} lang={lang} buildLanguages={buildLanguages} countries={countries}>

<div className="h-auto flex w-full text-center lg:text-left">
  <div className=" w-full flex flex-wrap bg-grey-light">
   
      <div className=" h-auto  w-full lg:w-1/3 bg-grey">
        <div className="pt-20 lg:pt-60 lg:pl-24">
          <span className="uppercase pt-20 lg:pt-60 left-36 title-font font-bold text-gray-500 tracking-widest text-sm"> Brand</span>
            <h2 className="z-20 text-gray-900 font-metalch text-xl md:text-2xl lg:text-[3rem] lg:leading-[3rem] w-full lg:w-2/3 font-extrabold title-font  md:my-3 uppercase tracking-wider">{product.name}</h2>
        </div>


        
      <div className="flex flex-col-reverse lg:flex lg:flex-row lg:w-screen">
        <div className="w-full lg:w-1/2 bg-grey">
   

            <div className="lg:pl-24 lg:pt-8" data-children-count="1">
                    <select
                          placeholder={locale[lang].selectSize as string}
                          className="lg:w-1/3 text-center border-0 cursor-pointer rounded-full font-metalch text-xs h-10 bg-gray-100 duration-300 hover:bg-metal focus:bg-gray-300"
                          value={selectedVariant}
                          onChange={(e) => setSelectedVariant(e.target.value)}
                    >
                          {variantOptions?.map((option) => (
                            <option key={option.code} value={option.code}>
                              {option.label}
                            </option>
                          ))}
                    </select>
                 <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                          >
                          </svg>
                  </span>
      
          <div className="pt-5 lg:pl-28 ">
            <PricesContainer>
                        <Price
                          skuCode={selectedVariant}
                          className="text-metal tracking-wide text-xl lg:!text-[1.5rem] font-semibold mr-1"
                          compareClassName="!text-[1rem] text-gray-500 line-through text-lg"
                        />
            </PricesContainer>
          </div>
          <div className="pt-10">
            <AddToCartButton
                      skuCode={selectedVariant}
                      label={locale[lang].addToCart as string}
                      className="btn_mask text-[1rem] text-white tracking-wide font-bold rounded-full bg-black focus:outline-none focus:ring-3 focus:ring-offset-2 focus:ring-metal disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {AddToCartCustom}
            </AddToCartButton>
            </div>
            </div>

    </div>

  <div>
  <div className="relative lg:right-72 lg:bottom-[25vh] w-full lg:w-full">
      <Image
                    alt={product.name}
                    className="object-center items-center w-full py-3"
                    src={imgUrl}
                    width={500}
                    height={500}
                  />
      </div>
  </div>

</div>
</div> 
</div>
</div>

          </Layout>
        </OrderContainer>
      </OrderStorage>
    </CommerceLayer>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const lang = params?.lang as string;
  const cms = process.env.BUILD_CMS;
  const countryCode = params?.countryCode || process.env.BUILD_COUNTRY?.toLowerCase();
  const slug = params?.product;
  const countries = _.has(cmsFunctions, `${cms}AllCountries`) ? await cmsFunctions[`${cms}AllCountries`](lang) : {};
  const buildLanguages = _.compact(
    process.env.BUILD_LANGUAGES?.split(",").map((l) => {
      const country = countries.find((country: Country) => country.code === parseLanguageCode(l));
      return !_.isEmpty(country) ? country : null;
    })
  );
  const country = countries.find((country: Country) => country.code.toLowerCase() === countryCode);
  const product = _.has(cmsFunctions, `${cms}GetProduct`) ? await cmsFunctions[`${cms}GetProduct`](slug, lang) : {};
  return {
    props: {
      product,
      clientId: process.env.CL_CLIENT_ID,
      endpoint: process.env.CL_ENDPOINT,
      lang,
      countryCode,
      marketId: `market:${country?.marketId}`,
      buildLanguages,
      cms: process.env.BUILD_CMS,
      countries
    },
    revalidate: 60
  };
};

export default ProductPage;
