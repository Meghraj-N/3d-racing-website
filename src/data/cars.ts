export type TuningPart = {
  id: string;
  name: string;
  type: 'color' | 'spoiler' | 'rims' | 'hood';
  value: string; // hex code for color, or mesh name for parts
  price: number;
};

export type CarStats = {
  topSpeed: number; // Max 100
  acceleration: number; // Max 100
  handling: number; // Max 100
  nitro: number; // Max 100
};

export type EngineeringData = {
  engine: string;
  horsepower: number;
  torque: number;
  zeroToSixty: number;
  weight: number;
  drivetrain: string;
};

export type Car = {
  id: string;
  name: string;
  brand: string;
  class: 'D' | 'C' | 'B' | 'A' | 'S';
  stats: CarStats;
  engineering: EngineeringData;
  modelUrl: string; // e.g. /models/gtr.glb
  defaultColor: string;
  availableColors: TuningPart[];
  availableSpoilers: TuningPart[];
  availableRims: TuningPart[];
};

export const defaultColors: TuningPart[] = [
  { id: 'c1', name: 'Velocity Red', type: 'color', value: '#DC2626', price: 0 },
  { id: 'c2', name: 'Stealth Black', type: 'color', value: '#0F172A', price: 500 },
  { id: 'c3', name: 'Alpine White', type: 'color', value: '#F8FAFC', price: 500 },
  { id: 'c4', name: 'Cyber Yellow', type: 'color', value: '#EAB308', price: 1200 },
  { id: 'c5', name: 'Neon Blue', type: 'color', value: '#3B82F6', price: 1500 },
];

export const defaultSpoilers: TuningPart[] = [
  { id: 's1', name: 'Stock Spoiler', type: 'spoiler', value: 'spoiler_stock', price: 0 },
  { id: 's2', name: 'Carbon Fiber GT', type: 'spoiler', value: 'spoiler_gt', price: 2500 },
  { id: 's3', name: 'Aero Wing', type: 'spoiler', value: 'spoiler_aero', price: 4000 },
];

export const defaultRims: TuningPart[] = [
  { id: 'r1', name: 'Stock Alloys', type: 'rims', value: 'rims_stock', price: 0 },
  { id: 'r2', name: 'Forged Track', type: 'rims', value: 'rims_track', price: 3000 },
  { id: 'r3', name: 'Chrome Spinner', type: 'rims', value: 'rims_chrome', price: 5000 },
];

export const CARS: Car[] = [
  {
    id: 'nissan-gtr',
    name: 'GT-R Nismo',
    brand: 'Nissan',
    class: 'A',
    modelUrl: '/models/nissan-gtr.glb',
    defaultColor: '#F8FAFC',
    stats: { topSpeed: 82, acceleration: 88, handling: 85, nitro: 75 },
    engineering: {
      engine: '3.8L Twin-Turbo V6',
      horsepower: 600,
      torque: 481,
      zeroToSixty: 2.5,
      weight: 3865,
      drivetrain: 'AWD',
    },
    availableColors: defaultColors,
    availableSpoilers: defaultSpoilers,
    availableRims: defaultRims,
  },
  {
    id: 'porsche-911',
    name: '911 GT3 RS',
    brand: 'Porsche',
    class: 'S',
    modelUrl: '/models/porsche-911.glb',
    defaultColor: '#EAB308',
    stats: { topSpeed: 85, acceleration: 85, handling: 95, nitro: 80 },
    engineering: {
      engine: '4.0L Naturally Aspirated Flat-6',
      horsepower: 518,
      torque: 342,
      zeroToSixty: 2.7,
      weight: 3268,
      drivetrain: 'RWD',
    },
    availableColors: defaultColors,
    availableSpoilers: defaultSpoilers,
    availableRims: defaultRims,
  },
  {
    id: 'lambo-svj',
    name: 'Aventador SVJ',
    brand: 'Lamborghini',
    class: 'S',
    modelUrl: '/models/lambo-svj.glb',
    defaultColor: '#22C55E', // Green
    stats: { topSpeed: 92, acceleration: 90, handling: 88, nitro: 85 },
    engineering: {
      engine: '6.5L Naturally Aspirated V12',
      horsepower: 759,
      torque: 531,
      zeroToSixty: 2.6,
      weight: 3362,
      drivetrain: 'AWD',
    },
    availableColors: [...defaultColors, { id: 'c6', name: 'Verde Mantis', type: 'color', value: '#22C55E', price: 2000 }],
    availableSpoilers: defaultSpoilers,
    availableRims: defaultRims,
  },
  {
    id: 'ferrari-laferrari',
    name: 'LaFerrari',
    brand: 'Ferrari',
    class: 'S',
    modelUrl: '/models/laferrari.glb',
    defaultColor: '#DC2626',
    stats: { topSpeed: 94, acceleration: 92, handling: 90, nitro: 88 },
    engineering: {
      engine: '6.3L V12 Hybrid',
      horsepower: 949,
      torque: 664,
      zeroToSixty: 2.4,
      weight: 3495,
      drivetrain: 'RWD',
    },
    availableColors: defaultColors,
    availableSpoilers: defaultSpoilers,
    availableRims: defaultRims,
  },
  {
    id: 'mclaren-p1',
    name: 'P1',
    brand: 'McLaren',
    class: 'S',
    modelUrl: '/models/mclaren-p1.glb',
    defaultColor: '#F97316', // Orange
    stats: { topSpeed: 93, acceleration: 91, handling: 92, nitro: 90 },
    engineering: {
      engine: '3.8L Twin-Turbo V8 Hybrid',
      horsepower: 903,
      torque: 664,
      zeroToSixty: 2.5,
      weight: 3411,
      drivetrain: 'RWD',
    },
    availableColors: [...defaultColors, { id: 'c7', name: 'Papaya Orange', type: 'color', value: '#F97316', price: 2500 }],
    availableSpoilers: defaultSpoilers,
    availableRims: defaultRims,
  },
  {
    id: 'bugatti-chiron',
    name: 'Chiron Super Sport',
    brand: 'Bugatti',
    class: 'S',
    modelUrl: '/models/bugatti-chiron.glb',
    defaultColor: '#3B82F6',
    stats: { topSpeed: 100, acceleration: 98, handling: 75, nitro: 95 },
    engineering: {
      engine: '8.0L Quad-Turbo W16',
      horsepower: 1578,
      torque: 1180,
      zeroToSixty: 2.3,
      weight: 4360,
      drivetrain: 'AWD',
    },
    availableColors: defaultColors,
    availableSpoilers: defaultSpoilers,
    availableRims: defaultRims,
  },
  {
    id: 'koenigsegg-jesko',
    name: 'Jesko Absolut',
    brand: 'Koenigsegg',
    class: 'S',
    modelUrl: '/models/koenigsegg-jesko.glb',
    defaultColor: '#94A3B8', // Silver
    stats: { topSpeed: 100, acceleration: 95, handling: 85, nitro: 90 },
    engineering: {
      engine: '5.0L Twin-Turbo V8',
      horsepower: 1600,
      torque: 1106,
      zeroToSixty: 2.5,
      weight: 3130,
      drivetrain: 'RWD',
    },
    availableColors: defaultColors,
    availableSpoilers: defaultSpoilers,
    availableRims: defaultRims,
  },
  {
    id: 'corvette-z06',
    name: 'Corvette Z06 (C8)',
    brand: 'Chevrolet',
    class: 'B',
    modelUrl: '/models/corvette-z06.glb',
    defaultColor: '#EAB308',
    stats: { topSpeed: 75, acceleration: 82, handling: 88, nitro: 70 },
    engineering: {
      engine: '5.5L Flat-Plane Crank V8',
      horsepower: 670,
      torque: 460,
      zeroToSixty: 2.6,
      weight: 3434,
      drivetrain: 'RWD',
    },
    availableColors: defaultColors,
    availableSpoilers: defaultSpoilers,
    availableRims: defaultRims,
  },
  {
    id: 'mustang-gt500',
    name: 'Mustang Shelby GT500',
    brand: 'Ford',
    class: 'C',
    modelUrl: '/models/mustang-gt500.glb',
    defaultColor: '#3B82F6',
    stats: { topSpeed: 70, acceleration: 78, handling: 72, nitro: 75 },
    engineering: {
      engine: '5.2L Supercharged V8',
      horsepower: 760,
      torque: 625,
      zeroToSixty: 3.3,
      weight: 4171,
      drivetrain: 'RWD',
    },
    availableColors: defaultColors,
    availableSpoilers: defaultSpoilers,
    availableRims: defaultRims,
  },
  {
    id: 'supra-gr',
    name: 'GR Supra',
    brand: 'Toyota',
    class: 'D',
    modelUrl: '/models/supra-gr.glb',
    defaultColor: '#DC2626',
    stats: { topSpeed: 65, acceleration: 70, handling: 78, nitro: 65 },
    engineering: {
      engine: '3.0L Turbo Inline-6',
      horsepower: 382,
      torque: 368,
      zeroToSixty: 3.9,
      weight: 3400,
      drivetrain: 'RWD',
    },
    availableColors: defaultColors,
    availableSpoilers: defaultSpoilers,
    availableRims: defaultRims,
  },
];
