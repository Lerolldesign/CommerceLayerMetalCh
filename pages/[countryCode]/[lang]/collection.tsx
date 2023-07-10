import React, { useState } from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import _ from "lodash";
import { CommerceLayer, OrderContainer, OrderStorage } from "@commercelayer/react-components";
import queryString from "query-string";
import Layout from "@components/Layout";

import { parseLanguageCode, parseLocale } from "@utils/parser";
import { cmsFunctions } from "@utils/cms";
import { useGetToken } from "@hooks/GetToken";
import { Country } from "@typings/models";
import HeaderShop from "@components/elements/HeaderShop";
import locale from "@locale/index";
import { Collection } from "@typings/models";

type Props = {
  collection: Collection;
  lang: string;
  cms: string;
  taxonomies: any;
  country: {
    code: string;
    defaultLocale: string;
    marketId: string;
  };
  clientId: string;
  endpoint: string;
  searchEngine: string;
  buildLanguages?: Country[];
  countries?: any[];
};

const FilterPage: NextPage<Props> = ({
  country,
  clientId,
  endpoint,
  searchEngine,
  buildLanguages = [],
  countries = [],
  lang,
  cms
}) => {
  const {
    query: { countryCode, searchBy, lang: currentLang },
    push,
    asPath
  } = useRouter();
  const parseUrl = queryString.parseUrl(asPath);
  const showSearch = _.has(parseUrl.query, "searchBy");
  const [activeAlgolia, setActiveAlgolia] = useState(showSearch);
  const code = country?.code.toLowerCase();
  const marketId = country?.marketId || "all";
  const token = useGetToken({
    clientId,
    endpoint,
    scope: `market:${marketId}`,
    countryCode: countryCode as string
  });
  const collectionLang = parseLocale(currentLang as string, "-", "-");
  const collectionName = `${cms}_${code}_${collectionLang}`;
  const handleActiveAlgolia = () => {
    setActiveAlgolia(!activeAlgolia);
    searchBy ? push(`/${countryCode}/${lang}`) : push(`/${countryCode}/${lang}?searchBy=${searchEngine}`);
  };
  const languageCode = parseLanguageCode(lang, "toLowerCase", true);
  return !endpoint ? null : (
    <CommerceLayer accessToken={token} endpoint={endpoint}>
      <OrderStorage persistKey={`order-${code}`}>
        <OrderContainer attributes={{ language_code: languageCode }}>
          <Layout cms={cms}  lang={lang} buildLanguages={buildLanguages} countries={countries}>
            <HeaderShop lang={lang} />
            {locale[lang].welcomeTo}{"mi amor di coeur"}
            <h1 className="text-green-600 font-metalch py-5 text-5xl hidden md:bloc lg:block">    {locale[lang].imhungry}</h1>
        
          </Layout>
        </OrderContainer>
      </OrderStorage>
    </CommerceLayer>
  );
};

export default FilterPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const lang = params?.lang as string;
    const cms = process.env.BUILD_CMS;
    const countryCode = params?.countryCode || process.env.BUILD_COUNTRY?.toLowerCase();
    const countries = _.has(cmsFunctions, `${cms}AllCountries`) ? await cmsFunctions[`${cms}AllCountries`](lang) : {};
    const buildLanguages = _.compact(
      process.env.BUILD_LANGUAGES?.split(",").map((l) => {
        const country = countries.find((country: Country) => country.code === parseLanguageCode(l));
        return !_.isEmpty(country) ? country : null;
      })
    );
    const country = countries.find((country: Country) => country.code.toLowerCase() === countryCode);
    const taxonomies = _.has(cmsFunctions, `${cms}AllTaxonomies`)
      ? await cmsFunctions[`${cms}AllTaxonomies`](country.catalog.id, lang)
      : {};
    return {
      props: {
        country,
        countries,
        clientId: process.env.CL_CLIENT_ID,
        endpoint: process.env.CL_ENDPOINT,
        buildLanguages,
        searchEngine: process.env.BUILD_SEARCH_ENGINE || "",
        lang,
        cms
      },
      revalidate: 60
    };
  } catch (err: any) {
    console.error(err);
    return {
      props: {
        clientId: process.env.CL_CLIENT_ID,
        endpoint: process.env.CL_ENDPOINT,
        errors: err.message
      },
      revalidate: 60
    };
  }
};
