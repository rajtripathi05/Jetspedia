
export type Generation = '4' | '4+' | '4++' | '5' | '4.5';
export type ServiceStatus = 'Active' | 'Development' | 'Testing' | 'Retired';
export type Role = 'Multirole' | 'Air Superiority' | 'Strike' | 'Interceptor' | 'Attack';

export interface PerformanceRatings {
  airToAir: number;
  bvr: number;
  dogfight: number;
  avionics: number;
  stealth: number;
  multirole: number;
  survivability: number;
  overall: number;
}

export interface TechnicalProfile {
  airframe: string;
  propulsion: string;
  performance: string;
  avionics: string;
  weapons: string;
  stealth?: string;
}

export interface Aircraft {
  id: string;
  name: string;
  country: string;
  generation: Generation;
  primaryRole: Role;
  status: ServiceStatus;
  manufacturer: string;
  firstFlight: string;
  unitCost?: string;
  summary: string;
  techProfile: TechnicalProfile;
  ratings: PerformanceRatings;
  comparativeAnalysis: string[];
  futureOutlook: string;
  relatedIds: string[];
}
