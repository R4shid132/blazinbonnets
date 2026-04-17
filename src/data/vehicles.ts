export interface Vehicle {
  id: string;
  slug: string;
  name: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  registration: string;
  fuelType: string;
  transmission: string;
  bodyType: string;
  condition: string;
  motExpiry?: string;
  description: string;
  price: number;
  images: string[];
  status: 'available' | 'reserved' | 'sold';
  badges: string[];
  financeFrom?: number;
  videos?: string[];
}

export const vehicles: Vehicle[] = [
  {
    id: '1',
    slug: 'hyundai-i10-2016-walsall',
    name: 'Hyundai i10',
    make: 'Hyundai',
    model: 'i10',
    year: 2016,
    mileage: 87645,
    registration: 'ET65 TVL',
    fuelType: 'Petrol',
    transmission: 'Manual',
    bodyType: 'Hatchback',
    condition: 'Runs and drives',
    motExpiry: 'January 2027',
    description: 'Reliable and economical Hyundai i10 ideal for city driving with excellent fuel efficiency. Perfect first car or daily runabout with low insurance costs and proven reliability. Well-maintained example with full service history available.',
    price: 3995,
    images: [
      '/vehicles/hyundai-i10/front.jpg',
      '/vehicles/hyundai-i10/side-right.jpg',
      '/vehicles/hyundai-i10/rear.jpg',
      '/vehicles/hyundai-i10/side-left.jpg',
    ],
    status: 'available',
    badges: ['Fully Inspected'],
    financeFrom: 89,
    videos: ['/vehicles/hyundai-i10/showcase.mp4'],
  },
  {
    id: '2',
    slug: 'vauxhall-viva-1-0-se-2016-walsall',
    name: 'Vauxhall Viva 1.0 SE',
    make: 'Vauxhall',
    model: 'Viva 1.0 SE',
    year: 2016,
    mileage: 57442,
    registration: 'HG65 OFD',
    fuelType: 'Petrol',
    transmission: 'Manual',
    bodyType: 'Hatchback',
    condition: 'Runs and drives',
    motExpiry: 'March 2026',
    description: 'Compact and economical hatchback offering low running costs and practical everyday usability. The Vauxhall Viva SE comes equipped with air conditioning, electric windows, and Bluetooth connectivity. An ideal choice for budget-conscious drivers seeking quality.',
    price: 3495,
    images: [],
    status: 'available',
    badges: ['Low Mileage', 'Fully Inspected'],
    financeFrom: 79,
  },
  {
    id: '3',
    slug: 'audi-a5-sportback-2-0-tdi-2012-walsall',
    name: 'Audi A5 Sportback 2.0 TDI',
    make: 'Audi',
    model: 'A5 Sportback 2.0 TDI',
    year: 2012,
    mileage: 156119,
    registration: 'SH62 EXL',
    fuelType: 'Diesel',
    transmission: 'Automatic',
    bodyType: 'Sportback',
    condition: 'Runs and drives',
    description: 'Stylish Audi Sportback delivering comfort, performance and premium design. Features include leather interior, satellite navigation, heated seats, and the renowned Audi MMI infotainment system. A premium driving experience at an accessible price point.',
    price: 6995,
    images: [],
    status: 'available',
    badges: ['Premium Spec'],
    financeFrom: 149,
  },
  {
    id: '4',
    slug: 'bmw-420d-m-sport-2014-walsall',
    name: 'BMW 420D M Sport',
    make: 'BMW',
    model: '420D M Sport',
    year: 2014,
    mileage: 131400,
    registration: 'WF14 EVH',
    fuelType: 'Diesel',
    transmission: 'Automatic',
    bodyType: 'Coupe',
    condition: 'Runs and drives',
    description: 'Sporty BMW 4 Series M Sport offering dynamic handling and refined performance. M Sport package includes sports suspension, M Sport steering wheel, and aerodynamic body styling. A head-turning coupe that delivers both style and substance.',
    price: 8995,
    images: [],
    status: 'available',
    badges: ['Premium Spec', 'Fully Inspected'],
    financeFrom: 189,
  },
];

export const makes = [...new Set(vehicles.map(v => v.make))];
export const models = [...new Set(vehicles.map(v => v.model))];
export const fuelTypes = [...new Set(vehicles.map(v => v.fuelType))];
export const transmissions = [...new Set(vehicles.map(v => v.transmission))];
export const bodyTypes = [...new Set(vehicles.map(v => v.bodyType))];
