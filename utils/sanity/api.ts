import { createClient, groq } from "next-sanity";
import _ from "lodash";
import { Product, Collection, Taxon, Taxonomy, Variant } from "@typings/models";
import { SanityCountry, SanityProduct, SanityCollection, SanityTaxon, SanityTaxonomy, SanityVariant } from "./typings";
import { parseLocale } from "@utils/parser";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET as string,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION as string,
  useCdn: process.env.NODE_ENV === "production" // `false` if you want to ensure fresh data
});

const sanityAllCountries = async (locale = "en-US") => {
  const lang = parseLocale(locale, "_", "-", "lowercase");
  const query = groq`*[_type == "country"]{
    name,
    code,
    marketId,
    defaultLocale,
    "image": {
      "url": image.asset->url
    },
    'catalog': {
      'id': catalog->_id
    }
  } | order(name["${lang}"] asc)`;
  const countries = await client.fetch<SanityCountry[]>(query);
  return countries.map((country) => {
    const localization = {
      name: country?.name[lang]
    };
    return { ...country, ...localization };
  });
};

const parsingVariant = (variants: SanityVariant[], lang = "en_us"): Variant[] => {
  return !_.isEmpty(variants)
    ? variants.map((variant) => {
        const localization = {
          name: variant?.name?.[lang] || "",
          size: { name: variant?.size?.name?.[lang] || "" }
        };
        return { ...variant, ...localization };
      })
    : [];
};

const parsingProduct = (products: SanityProduct[] | SanityProduct, lang = "en_us"): Product[] | Product => {
  return _.isArray(products)
    ? products.map((product) => {
        const localization = {
          name: product?.name[lang],
          slug: product?.slug[lang].current,
          description: product?.description[lang],
          variants: parsingVariant(product?.variants, lang) as Variant[],
     
        };
        return { ...product, ...localization };
      })
    : {
        ...products,
        name: products?.name[lang],
        slug: products?.slug[lang].current,
        description: products?.description[lang],
        variants: parsingVariant(products?.variants, lang) as Variant[],
  
      };
};

const parsingCollection = (collections: SanityCollection[], lang = "en_us"): Collection[] => {
  return collections.map((collection) => {
    const localization = {
      name: collection?.name[lang],
      slug: collection?.slug[lang].current,
    };
    return { ...collection, ...localization };
  });
};

const parsingTaxon = (taxons: SanityTaxon[], lang = "en_us"): Taxon[] => {
  return taxons.map((taxon) => {
    const localization = {
      name: taxon?.name[lang],
      label: taxon?.label[lang],
      products: taxon?.products ? (parsingProduct(taxon.products, lang) as Product[]) : []
    };
    return { ...taxon, ...localization };
  });
};

const parsingTaxonomies = (taxonomies: SanityTaxonomy[], locale = "en-US"): Taxonomy[] => {
  const lang = parseLocale(locale, "_", "-", "lowercase");
  const items = taxonomies.map((taxonomy) => {
    const localization = {
      name: taxonomy?.name[lang],
      label: taxonomy?.label[lang],
      taxons: parsingTaxon(taxonomy?.taxons, lang)
    };
    return { ...taxonomy, ...localization };
  });
  return items;
};

const sanityAllTaxonomies = async (catalogId: string, locale = "en-US") => {
  // const newLocale = getLocale(locale)
  const query = groq`*[_type == "catalog" && _id == '${catalogId}']{
    'taxonomies': taxonomies[]->{
      label,
      name,
      'taxons': taxons[]->{
        label,
        name,
        'products': products[]->{
          name,
          description,
   
          
          reference,
          slug,
          'images': images[]->{
            'url': images.asset->url
          },
          'variants': variants[]->{
            code,
            name,
            size->,
          }    
        }
      }
    }
  }  | order(name asc)`;
  const items: any[] = await client.fetch(query);
  return parsingTaxonomies(_.first(items)?.taxonomies, locale);
};

const sanityGetProduct = async (slug: string, locale = "en-US") => {
  const lang = parseLocale(locale, "_", "-", "lowercase");
  const query = groq`*[_type == "product" && slug["${lang}"].current == "${slug}"]{
    name,
    description,

    reference,
    slug,
    'images': images[]->{
      'url': images.asset->url
    },
    'variants': variants[]->{
      label,
      code,
      name,
      size->,
      'images': images[]->{
        'url': images.asset->url
      }
    }    
  }`;
  const item: any[] = await client.fetch(query);
  return parsingProduct(_.first(item), lang);
};

const sanityGetCollection = async (slug: string, locale = "en-US") => {
  const lang = parseLocale(locale, "_", "-", "lowercase");
  const query = groq`*[_type == "collection" && slug["${lang}"].current == "${slug}"]{
    name,
    slug,
    }    
  }`;
  const item: any[] = await client.fetch(query);
  return parsingCollection(_.first(item), lang);
};

const sanityData = {
  sanityAllCountries,
  sanityAllTaxonomies,
  sanityGetProduct,
  sanityGetCollection,
};

export default sanityData;
