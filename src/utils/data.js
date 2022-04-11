import { APPLIANCE, TOOL, PACS } from '../utils/types';
import { v4 as uuidv4 } from 'uuid';

export const appliances = [
  {
    household_appliances: 'Air Fryer',
    rated_continous_running: 1500,
    additional_surge_watts: 0,
  },
  {
    household_appliances: 'Air Purifier',
    rated_continous_running: 25,
    additional_surge_watts: 5,
  },
  {
    household_appliances: 'Amazon Echo',
    rated_continous_running: 3,
    additional_surge_watts: 0,
  },
  {
    household_appliances: 'Amazon Echo Show',
    rated_continous_running: 2,
    additional_surge_watts: 2,
  },
  {
    household_appliances: 'Apple TV',
    rated_continous_running: 3,
    additional_surge_watts: 3,
  },
  {
    household_appliances: 'Aquarium',
    rated_continous_running: 150,
    additional_surge_watts: null,
  },
  {
    household_appliances: 'AV Receiver',
    rated_continous_running: 450,
    additional_surge_watts: 0,
  },
  {
    household_appliances: 'Bathroom Towel Heater',
    rated_continous_running: 60,
    additional_surge_watts: 90,
  },
  {
    household_appliances: 'Blender',
    rated_continous_running: 500,
    additional_surge_watts: null,
  },
  {
    household_appliances: 'Blu-Ray or DVD Player',
    rated_continous_running: 15,
    additional_surge_watts: null,
  },
  {
    household_appliances: 'Ceiling Fan',
    rated_continous_running: 60,
    additional_surge_watts: 70,
  },
  {
    household_appliances: 'Cell Phone Battery Charger',
    rated_continous_running: 25,
    additional_surge_watts: 0,
  },
  {
    household_appliances: 'Cell Phone Charger',
    rated_continous_running: 10,
    additional_surge_watts: null,
  },
  {
    household_appliances: 'Clock Radio',
    rated_continous_running: 50,
    additional_surge_watts: null,
  },
  {
    household_appliances: 'Clothes Dryer (Electric)',
    rated_continous_running: 5400,
    additional_surge_watts: 6750,
  },
  {
    household_appliances: 'Clothes Dryer (Gas)',
    rated_continous_running: 700,
    additional_surge_watts: 1800,
  },
  {
    household_appliances: 'Clothes Iron',
    rated_continous_running: 1500,
    additional_surge_watts: null,
  },
  {
    household_appliances: 'Coffee Maker',
    rated_continous_running: 1000,
    additional_surge_watts: 0,
  },
  {
    household_appliances: 'Computer Monitor',
    rated_continous_running: 25,
    additional_surge_watts: 5,
  },
  {
    household_appliances: 'Cooker Hood',
    rated_continous_running: 20,
    additional_surge_watts: 10,
  },
  {
    household_appliances: 'Copy Machine',
    rated_continous_running: 1600,
    additional_surge_watts: 0,
  },
  {
    household_appliances: 'Curling Iron',
    rated_continous_running: 1500,
    additional_surge_watts: 0,
  },
  {
    household_appliances: 'DAB Mains Radio',
    rated_continous_running: 5,
    additional_surge_watts: 4,
  },
  {
    household_appliances: 'Deep Freezer',
    rated_continous_running: 500,
    additional_surge_watts: 1500,
  },
  {
    household_appliances: 'Dehumidifier',
    rated_continous_running: 240,
    additional_surge_watts: 0,
  },
  {
    household_appliances: 'Desktop with Monitor',
    rated_continous_running: 300,
    additional_surge_watts: null,
  },
  {
    household_appliances: 'Dishwasher',
    rated_continous_running: 1500,
    additional_surge_watts: 1500,
  },
  {
    household_appliances: 'Electric Blanket',
    rated_continous_running: 200,
    additional_surge_watts: 0,
  },
  {
    household_appliances: 'Electric Can Opener',
    rated_continous_running: 170,
    additional_surge_watts: 0,
  },
  {
    household_appliances: 'Electric Doorbell Transformer',
    rated_continous_running: 2,
    additional_surge_watts: 0,
  },
  {
    household_appliances: 'Electric Heater (Fan)',
    rated_continous_running: 2000,
    additional_surge_watts: 1000,
  },
  {
    household_appliances: 'Electric Kettle',
    rated_continous_running: 1200,
    additional_surge_watts: 3000,
  },
  {
    household_appliances: 'Electric Mower',
    rated_continous_running: 1500,
    additional_surge_watts: 0,
  },
  {
    household_appliances: 'Electric Oven',
    rated_continous_running: 2150,
    additional_surge_watts: 0,
  },
  {
    household_appliances: 'Electric Shaver',
    rated_continous_running: 15,
    additional_surge_watts: 20,
  },
  {
    household_appliances: 'Electric Skillet',
    rated_continous_running: 1500,
    additional_surge_watts: null,
  },
  {
    household_appliances: 'Electric Stove (8" Element)',
    rated_continous_running: 2100,
    additional_surge_watts: 0,
  },
  {
    household_appliances: 'Electric Thermal Radiator',
    rated_continous_running: 500,
    additional_surge_watts: 0,
  },
  {
    household_appliances: 'Electric Trimmer',
    rated_continous_running: 300,
    additional_surge_watts: 500,
  },
  {
    household_appliances: 'Electric Water Heater',
    rated_continous_running: 4000,
    additional_surge_watts: 0,
  },
  {
    household_appliances: 'Electric Water Heater (Tankless)',
    rated_continous_running: 6600,
    additional_surge_watts: 2200,
  },
  {
    household_appliances: 'Espresso Coffee Machine',
    rated_continous_running: 1300,
    additional_surge_watts: 200,
  },
  {
    household_appliances: 'EV Home Charger',
    rated_continous_running: 1600,
    additional_surge_watts: 1800,
  },
  {
    household_appliances: 'Extractor Fan',
    rated_continous_running: 12,
    additional_surge_watts: 0,
  },
  {
    household_appliances: 'Fan (Pedestal)',
    rated_continous_running: 50,
    additional_surge_watts: 10,
  },
  {
    household_appliances: 'Fan (Table)',
    rated_continous_running: 10,
    additional_surge_watts: 15,
  },
  {
    household_appliances: 'Fan (Wall)',
    rated_continous_running: 45,
    additional_surge_watts: 15,
  },
  {
    household_appliances: 'Fax',
    rated_continous_running: 60,
    additional_surge_watts: 0,
  },
  {
    household_appliances: 'Food Dehydrator',
    rated_continous_running: 800,
    additional_surge_watts: 0,
  },
  {
    household_appliances: 'Food Processor/Blender',
    rated_continous_running: 400,
    additional_surge_watts: 0,
  },
  {
    household_appliances: 'Fryer',
    rated_continous_running: 1000,
    additional_surge_watts: 0,
  },
  {
    household_appliances: 'Garage Door Opener (1/2 HP)',
    rated_continous_running: 875,
    additional_surge_watts: 2350,
  },
  {
    household_appliances: 'Garage Door Opener (1/2 HP)',
    rated_continous_running: 875,
    additional_surge_watts: 2350,
  },
  {
    household_appliances: 'Guitar Amplifier',
    rated_continous_running: 20,
    additional_surge_watts: 10,
  },
  {
    household_appliances: 'Hair Dryer',
    rated_continous_running: 1250,
    additional_surge_watts: 0,
  },
  {
    household_appliances: 'Heated Bathroom Mirror',
    rated_continous_running: 50,
    additional_surge_watts: 50,
  },
  {
    household_appliances: 'Home Internet Router',
    rated_continous_running: 5,
    additional_surge_watts: 15,
  },
  {
    household_appliances: 'Home Phone',
    rated_continous_running: 3,
    additional_surge_watts: 5,
  },
  {
    household_appliances: 'Home Sound System',
    rated_continous_running: 95,
    additional_surge_watts: 0,
  },
  {
    household_appliances: 'Home Theater Projector',
    rated_continous_running: 200,
    additional_surge_watts: null,
  },
  {
    household_appliances: 'Hot Plate',
    rated_continous_running: 1500,
    additional_surge_watts: null,
  },
  {
    household_appliances: 'Hot Water Dispenser',
    rated_continous_running: 1200,
    additional_surge_watts: 100,
  },
  {
    household_appliances: 'Household Fan',
    rated_continous_running: 120,
    additional_surge_watts: null,
  },
  {
    household_appliances: 'Humidifier (13 Gal.)',
    rated_continous_running: 175,
    additional_surge_watts: 0,
  },
  {
    household_appliances: 'Induction Hob (Per Hob)',
    rated_continous_running: 1400,
    additional_surge_watts: 400,
  },
  {
    household_appliances: 'Inkjet Printer',
    rated_continous_running: 75,
    additional_surge_watts: null,
  },
  {
    household_appliances: 'iPad / Tablet',
    rated_continous_running: 44854,
    additional_surge_watts: null,
  },
  {
    household_appliances: 'Iron',
    rated_continous_running: 1200,
    additional_surge_watts: 0,
  },
  {
    household_appliances: 'Keurig',
    rated_continous_running: 1500,
    additional_surge_watts: null,
  },
  {
    household_appliances: 'Laptop',
    rated_continous_running: 50,
    additional_surge_watts: 0,
  },
  {
    household_appliances: 'Laptop Computer',
    rated_continous_running: 75,
    additional_surge_watts: null,
  },
  {
    household_appliances: 'Laser Printer',
    rated_continous_running: 500,
    additional_surge_watts: 2000,
  },
  {
    household_appliances: 'Light Bulb (Common)',
    rated_continous_running: 75,
    additional_surge_watts: 0,
  },
  {
    household_appliances: 'Light Bulb (LED)',
    rated_continous_running: 9,
    additional_surge_watts: 0,
  },
  {
    household_appliances: 'MacBook Pro',
    rated_continous_running: 85,
    additional_surge_watts: null,
  },
  {
    household_appliances: 'Mi Box',
    rated_continous_running: 5,
    additional_surge_watts: 2,
  },
  {
    household_appliances: 'Microwave',
    rated_continous_running: 1000,
    additional_surge_watts: 0,
  },
  {
    household_appliances: 'Monitor',
    rated_continous_running: 200,
    additional_surge_watts: 0,
  },
  {
    household_appliances: 'Night Light',
    rated_continous_running: 1,
    additional_surge_watts: 0,
  },
  {
    household_appliances: 'Nintendo Switch AC Adapter',
    rated_continous_running: 7,
    additional_surge_watts: 33,
  },
  {
    household_appliances: 'Outdoor Light String',
    rated_continous_running: 250,
    additional_surge_watts: 0,
  },
  {
    household_appliances: 'Oversink Water Heater (Hand Wash)',
    rated_continous_running: 3000,
    additional_surge_watts: 0,
  },
  {
    household_appliances: 'Paper Shredder',
    rated_continous_running: 200,
    additional_surge_watts: 220,
  },
  {
    household_appliances: 'Percolator',
    rated_continous_running: 800,
    additional_surge_watts: 300,
  },
  {
    household_appliances: 'Photographic Strobe (300 Watt-Second)',
    rated_continous_running: 1200,
    additional_surge_watts: null,
  },
  {
    household_appliances: 'Playstation 4',
    rated_continous_running: 85,
    additional_surge_watts: 5,
  },
  {
    household_appliances: 'Power Shower',
    rated_continous_running: 7500,
    additional_surge_watts: 10500,
  },
  {
    household_appliances: 'Pressure Cooker',
    rated_continous_running: 700,
    additional_surge_watts: 0,
  },
  {
    household_appliances: 'Printer (Inkjet)',
    rated_continous_running: 20,
    additional_surge_watts: 10,
  },
  {
    household_appliances: 'Printer (Laser)',
    rated_continous_running: 600,
    additional_surge_watts: 200,
  },
  {
    household_appliances: 'Projector',
    rated_continous_running: 220,
    additional_surge_watts: 270,
  },
  {
    household_appliances: 'Refrigerator / Freezer',
    rated_continous_running: 700,
    additional_surge_watts: 2200,
  },
  {
    household_appliances: 'Rice Cooker',
    rated_continous_running: 200,
    additional_surge_watts: 500,
  },
  {
    household_appliances: 'Sandwich Maker',
    rated_continous_running: 700,
    additional_surge_watts: 300,
  },
  {
    household_appliances: 'Satellite Dish / Receiver',
    rated_continous_running: 20,
    additional_surge_watts: null,
  },
  {
    household_appliances: 'Scanner',
    rated_continous_running: 10,
    additional_surge_watts: 18,
  },
  {
    household_appliances: 'Security System',
    rated_continous_running: 500,
    additional_surge_watts: 0,
  },
  {
    household_appliances: 'Set Top Box',
    rated_continous_running: 27,
    additional_surge_watts: 3,
  },
  {
    household_appliances: 'Sewing Machine',
    rated_continous_running: 70,
    additional_surge_watts: 10,
  },
  {
    household_appliances: 'Side-by-Side Fridge',
    rated_continous_running: 800,
    additional_surge_watts: 1200,
  },
  {
    household_appliances: 'Slow Cooker',
    rated_continous_running: 160,
    additional_surge_watts: 20,
  },
  {
    household_appliances: 'Smart Fridge',
    rated_continous_running: 500,
    additional_surge_watts: 750,
  },
  {
    household_appliances: 'Space Heater',
    rated_continous_running: 1800,
    additional_surge_watts: 0,
  },
  {
    household_appliances: 'Space Heater',
    rated_continous_running: 750,
    additional_surge_watts: null,
  },
  {
    household_appliances: 'Steam Iron',
    rated_continous_running: 2200,
    additional_surge_watts: 300,
  },
  {
    household_appliances: 'Stereo',
    rated_continous_running: 450,
    additional_surge_watts: 0,
  },
  {
    household_appliances: 'Steriliser',
    rated_continous_running: 650,
    additional_surge_watts: 0,
  },
  {
    household_appliances: 'Straightening Iron',
    rated_continous_running: 75,
    additional_surge_watts: 300,
  },
  {
    household_appliances: 'Tablet Charger',
    rated_continous_running: 10,
    additional_surge_watts: 5,
  },
  {
    household_appliances: 'Television (22" LED)',
    rated_continous_running: 17,
    additional_surge_watts: 0,
  },
  {
    household_appliances: 'Television (49" LED)',
    rated_continous_running: 85,
    additional_surge_watts: 0,
  },
  {
    household_appliances: 'Television (82" LED)',
    rated_continous_running: 230,
    additional_surge_watts: 65,
  },
  {
    household_appliances: 'Television (CRT)',
    rated_continous_running: 500,
    additional_surge_watts: 0,
  },
  {
    household_appliances: 'Toaster',
    rated_continous_running: 850,
    additional_surge_watts: 0,
  },
  {
    household_appliances: 'Toaster Oven',
    rated_continous_running: 1200,
    additional_surge_watts: null,
  },
  {
    household_appliances: 'Treadmill',
    rated_continous_running: 280,
    additional_surge_watts: 900,
  },
  {
    household_appliances: 'Tube Light (1500mm)',
    rated_continous_running: 22,
    additional_surge_watts: 0,
  },
  {
    household_appliances: 'TV 32" LED/LCD',
    rated_continous_running: 50,
    additional_surge_watts: null,
  },
  {
    household_appliances: 'TV 42" Plasma',
    rated_continous_running: 240,
    additional_surge_watts: null,
  },
  {
    household_appliances: 'Vacuum Cleaner',
    rated_continous_running: 200,
    additional_surge_watts: 200,
  },
  {
    household_appliances: 'VCR / DVD Player',
    rated_continous_running: 100,
    additional_surge_watts: 0,
  },
  {
    household_appliances: 'Video Game Console (Xbox / PS4 / Wii)',
    rated_continous_running: 100,
    additional_surge_watts: null,
  },
  {
    household_appliances: 'Waffle Iron',
    rated_continous_running: 1500,
    additional_surge_watts: null,
  },
  {
    household_appliances: 'Washing Machine',
    rated_continous_running: 1150,
    additional_surge_watts: 2250,
  },
  {
    household_appliances: 'Water Dispenser',
    rated_continous_running: 100,
    additional_surge_watts: 0,
  },
  {
    household_appliances: 'Water Feature',
    rated_continous_running: 35,
    additional_surge_watts: 0,
  },
  {
    household_appliances: 'Water Filter & Cooler',
    rated_continous_running: 70,
    additional_surge_watts: 30,
  },
  {
    household_appliances: 'Wine Cooler (18 Bottles)',
    rated_continous_running: 83,
    additional_surge_watts: 0,
  },
];

export const pumpsAndAirConditioners = [
  {
    pumps_and_air_conditioners: 'Central AC (10,000 BTU)',
    rated_continous_running: 1500,
    additional_surge_watts: 4500,
  },
  {
    pumps_and_air_conditioners: 'Central AC (24,000 BTU)',
    rated_continous_running: 3800,
    additional_surge_watts: 11400,
  },
  {
    pumps_and_air_conditioners: 'Central AC (40,000 BTU)',
    rated_continous_running: 6000,
    additional_surge_watts: 6700,
  },
  {
    pumps_and_air_conditioners: 'Furnace Fan Blower (1/2 HP)',
    rated_continous_running: 800,
    additional_surge_watts: 2350,
  },
  {
    pumps_and_air_conditioners: 'Furnace Fan Blower (1/3 HP)',
    rated_continous_running: 700,
    additional_surge_watts: 1400,
  },
  {
    pumps_and_air_conditioners: 'Heat Pump',
    rated_continous_running: 4700,
    additional_surge_watts: 4500,
  },
  {
    pumps_and_air_conditioners: 'Sump Pump (1/2 HP)',
    rated_continous_running: 1050,
    additional_surge_watts: 2150,
  },
  {
    pumps_and_air_conditioners: 'Sump Pump (1/3 HP)',
    rated_continous_running: 800,
    additional_surge_watts: 1300,
  },
  {
    pumps_and_air_conditioners: 'Well Pump 1/2 hp',
    rated_continous_running: 1000,
    additional_surge_watts: 4000,
  },
  {
    pumps_and_air_conditioners: 'Well Pump 1/3 hp',
    rated_continous_running: 750,
    additional_surge_watts: 3000,
  },
  {
    pumps_and_air_conditioners: 'Window AC (10,000 BTU)',
    rated_continous_running: 1200,
    additional_surge_watts: 3600,
  },
  {
    pumps_and_air_conditioners: 'Window AC (12,000 BTU)',
    rated_continous_running: 3250,
    additional_surge_watts: 9750,
  },
];

export const tools = [
  {
    common_tools: 'Angle Grinder',
    rated_continous_running: 900,
  },
  {
    common_tools: 'Drill (1/4"-1/2")',
    rated_continous_running: 960,
  },
  {
    common_tools: 'Disc Sander',
    rated_continous_running: 1200,
  },
  {
    common_tools: 'Jig Saw',
    rated_continous_running: 700,
  },
  {
    common_tools: 'Band Saw',
    rated_continous_running: 1200,
  },
  {
    common_tools: 'Table Saw',
    rated_continous_running: 1800,
  },
  {
    common_tools: 'Circular Saw',
    rated_continous_running: 1800,
  },
  {
    common_tools: 'Chop / Cut Off Saw',
    rated_continous_running: 1800,
  },
  {
    common_tools: 'Shop Vac 6.5 hp',
    rated_continous_running: 1440,
  },
  {
    common_tools: 'Electric Chain Saw 14"',
    rated_continous_running: 1200,
  },
  {
    common_tools: 'Airless Sprayer 1/2 hp',
    rated_continous_running: 750,
  },
  {
    common_tools: 'Air Compressor 1 hp',
    rated_continous_running: 2000,
  },
  {
    common_tools: 'Power Tool Battery Charger',
    rated_continous_running: 240,
  },
];

export const indexedAppliances = appliances.map((appl) => ({
  ...appl,
  id: uuidv4(),
  type: APPLIANCE,
}));
export const indexedTools = tools.map((tls) => ({
  ...tls,
  id: uuidv4(),
  type: TOOL,
}));
export const indexPumpAndAirConditioners = pumpsAndAirConditioners.map(
  (pacs) => ({ ...pacs, id: uuidv4(), type: PACS }),
);
