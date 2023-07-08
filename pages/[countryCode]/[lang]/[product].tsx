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
  const handleBackTo = (e: any) => {
    e.preventDefault();
    router.back();
  };
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

          <div className="pattern  md:overflow-hidden pin flex flex-wrap text-grey-dark font-sans font-hairline text-4xl  leading-loose">
            <div className=" flex w-full mx-20">
             <div className="md:pl-3 md:pr-0 pt-8 pb-0 md:pb-6 px-2 w-full flex flex-wrap bg-grey-light">
              <div className="relative h-auto text-center md:text-left w-full mt-32 ">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">BRAND</h2>
                  <p className="text-gray-900 text-xl md:text-2xl xl:text-[2.5rem] w-1/3 font-extrabold title-font  my-3 uppercase tracking-wide !leading-9">{product.name}</p>
              </div>
           <div className="h-auto relative w-full bg-grey">

  <div className="flex flex-col-reverse xl:flex-row">
      <div className="w-1/3">
          <div className="relative" data-children-count="1">
                    <select
                          placeholder={locale[lang].selectSize as string}
                          className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-blue-500 text-base pl-3 pr-10"
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
            </div>
            <div className="flex items-center">
            <PricesContainer>
                        <Price
                          skuCode={selectedVariant}
                          className="text-metal tracking-wide !text-[1.5rem] font-semibold mr-1"
                          compareClassName="!text-[1rem] text-gray-500 line-through text-lg"
                        />
            </PricesContainer>
            </div>
            <div>
            <AddToCartButton
                      skuCode={selectedVariant}
                      label={locale[lang].addToCart as string}
                      className="btn_mask text-[1rem] text-white tracking-wide font-bold rounded-full bg-black focus:outline-none focus:ring-3 focus:ring-offset-2 focus:ring-metal disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {AddToCartCustom}
            </AddToCartButton>
            </div>
   </div>
   <div className="relative bottom-32 flex w-full xl:w-1/2 xl:h-full">
        <div >
                  <Image
                    alt={product.name}
                    className="w-full object-center rounded borde"
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
