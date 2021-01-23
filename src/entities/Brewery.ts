export const BREWERY_TYPES = [
  'brewpub',
  'contract',
  'closed',
  'micro',
  'nano',
  'planning',
  'proprietor',
  'regional'
] as const;

export type BreweryType = typeof BREWERY_TYPES[number];

export type Brewery = {
  id: number;
  name: string;
  brewery_type: BreweryType;
  website_url: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  longitude: string;
  latitude: string;
};
