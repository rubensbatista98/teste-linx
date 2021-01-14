export type BreweryType =
  | 'brewpub'
  | 'contract'
  | 'closed'
  | 'micro'
  | 'nano'
  | 'planning'
  | 'proprietor'
  | 'regional';

export type Brewery = {
  id: number;
  name: string;
  brewery_type: BreweryType;
  website: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  longitude: string;
  latitude: string;
};
