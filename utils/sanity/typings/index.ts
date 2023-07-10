import { Country, Product, Size, Taxon, Taxonomy, Variant } from "@typings/models";

export interface SanityCountry extends Omit<Country, "name"> {
  name: Record<string, string>;
}

export interface SanityTaxonomy extends Omit<Taxonomy, "name" | "taxons"> {
  name: Record<string, string>;
  label: Record<string, string>;
  taxons: SanityTaxon[];
}

export interface SanityTaxon extends Omit<Taxon, "name" | "products"> {
  name: Record<string, string>;
  label: Record<string, string>;
  products: SanityProduct[];
}

export interface SanityProduct extends Omit<Product, "name" | "description" | "slug" | "variants" | "slug" | "sectiontitle1"> {
  name: Record<string, string>;
  description: Record<string, string>;
  slug: Record<string, { current: string }>;
  variants: SanityVariant[];
  sectiontitle1: Record<string, string>;
}

export interface SanityVariant extends Omit<Variant, "name" | "size"> {
  name: Record<string, string>;
  size: SanitySize;
}

export interface SanitySize extends Omit<Size, "name"> {
  name: Record<string, any>;
}
