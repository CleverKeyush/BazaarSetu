import React, { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Style, Icon, Text, Fill, Stroke } from 'ol/style';
import Overlay from 'ol/Overlay';
import T from './T';

// Indian street food vendor locations with detailed food information - Enhanced with more vendors
const streetFoodVendors = [
  {
    id: 1,
    name: 'Delhi Chaat Corner',
    city: 'Delhi',
    coordinates: [77.2090, 28.6139],
    specialties: ['Gol Gappa', 'Bhel Puri', 'Aloo Tikki', 'Chole Bhature'],
    category: 'Street Snacks',
    rating: 4.8,
    priceRange: '₹20-80',
    openHours: '10:00 AM - 10:00 PM',
    address: 'Chandni Chowk, Old Delhi',
    description: 'Famous for authentic Delhi street food and chaats',
    image: '🥘'
  },
  {
    id: 2,
    name: 'Mumbai Vada Pav Stall',
    city: 'Mumbai',
    coordinates: [72.8777, 19.0760],
    specialties: ['Vada Pav', 'Misal Pav', 'Bhaji Pav', 'Cutting Chai'],
    category: 'Mumbai Street Food',
    rating: 4.7,
    priceRange: '₹15-60',
    openHours: '7:00 AM - 11:00 PM',
    address: 'Dadar Station, Mumbai',
    description: 'Authentic Mumbai street food experience',
    image: '🍔'
  },
  {
    id: 9,
    name: 'Juhu Beach Bhel Puri',
    city: 'Mumbai',
    coordinates: [72.8265, 19.0990],
    specialties: ['Bhel Puri', 'Sev Puri', 'Pani Puri', 'Dahi Puri'],
    category: 'Mumbai Street Food',
    rating: 4.6,
    priceRange: '₹20-70',
    openHours: '4:00 PM - 12:00 AM',
    address: 'Juhu Beach, Mumbai',
    description: 'Famous beachside chaat with ocean view',
    image: '🏖️'
  },
  {
    id: 10,
    name: 'Bandra Pav Bhaji Corner',
    city: 'Mumbai',
    coordinates: [72.8400, 19.0544],
    specialties: ['Pav Bhaji', 'Cheese Pav Bhaji', 'Masala Pav', 'Butter Pav'],
    category: 'Mumbai Street Food',
    rating: 4.8,
    priceRange: '₹40-120',
    openHours: '6:00 PM - 2:00 AM',
    address: 'Linking Road, Bandra West',
    description: 'Late night pav bhaji with extra butter and cheese',
    image: '🧈'
  },
  {
    id: 11,
    name: 'Colaba Sandwich Wala',
    city: 'Mumbai',
    coordinates: [72.8311, 18.9067],
    specialties: ['Bombay Sandwich', 'Grilled Sandwich', 'Club Sandwich', 'Fresh Lime Soda'],
    category: 'Mumbai Street Food',
    rating: 4.5,
    priceRange: '₹30-90',
    openHours: '8:00 AM - 11:00 PM',
    address: 'Colaba Causeway, Mumbai',
    description: 'Crispy grilled sandwiches with green chutney',
    image: '🥪'
  },
  {
    id: 12,
    name: 'Andheri Dosa Express',
    city: 'Mumbai',
    coordinates: [72.8697, 19.1136],
    specialties: ['Mumbai Masala Dosa', 'Cheese Dosa', 'Schezwan Dosa', 'Filter Coffee'],
    category: 'Mumbai Street Food',
    rating: 4.4,
    priceRange: '₹35-110',
    openHours: '7:00 AM - 11:00 PM',
    address: 'Andheri West, Mumbai',
    description: 'Fusion dosas with Mumbai twist',
    image: '🌯'
  },
  {
    id: 13,
    name: 'Chowpatty Kulfi Corner',
    city: 'Mumbai',
    coordinates: [72.8089, 18.9547],
    specialties: ['Malai Kulfi', 'Pista Kulfi', 'Mango Kulfi', 'Kulfi Falooda'],
    category: 'Mumbai Street Food',
    rating: 4.7,
    priceRange: '₹25-80',
    openHours: '5:00 PM - 1:00 AM',
    address: 'Chowpatty Beach, Mumbai',
    description: 'Traditional kulfi with rich flavors',
    image: '🍦'
  },
  {
    id: 14,
    name: 'Borivali Frankie Point',
    city: 'Mumbai',
    coordinates: [72.8567, 19.2307],
    specialties: ['Chicken Frankie', 'Mutton Frankie', 'Paneer Frankie', 'Egg Frankie'],
    category: 'Mumbai Street Food',
    rating: 4.6,
    priceRange: '₹50-140',
    openHours: '6:00 PM - 1:00 AM',
    address: 'Borivali West, Mumbai',
    description: 'Rolled frankies with spicy fillings',
    image: '🌮'
  },
  {
    id: 15,
    name: 'Thane Misal House',
    city: 'Mumbai',
    coordinates: [72.9781, 19.2183],
    specialties: ['Kolhapuri Misal', 'Puneri Misal', 'Nashik Misal', 'Tarri Poha'],
    category: 'Mumbai Street Food',
    rating: 4.8,
    priceRange: '₹30-90',
    openHours: '7:00 AM - 11:00 AM, 4:00 PM - 9:00 PM',
    address: 'Thane Station Road, Mumbai',
    description: 'Authentic spicy misal varieties',
    image: '🌶️'
  },
  {
    id: 16,
    name: 'Malad Ragda Pattice',
    city: 'Mumbai',
    coordinates: [72.8484, 19.1868],
    specialties: ['Ragda Pattice', 'Aloo Tikki', 'Samosa Chaat', 'Dahi Vada'],
    category: 'Mumbai Street Food',
    rating: 4.5,
    priceRange: '₹25-75',
    openHours: '5:00 PM - 11:00 PM',
    address: 'Malad West, Mumbai',
    description: 'Crispy pattice with spicy ragda',
    image: '🥔'
  },
  {
    id: 17,
    name: 'Ghatkopar Pani Puri Plaza',
    city: 'Mumbai',
    coordinates: [72.9081, 19.0863],
    specialties: ['Pani Puri', 'Masala Puri', 'Dahi Puri', 'Sukha Puri'],
    category: 'Mumbai Street Food',
    rating: 4.7,
    priceRange: '₹20-60',
    openHours: '4:00 PM - 11:00 PM',
    address: 'Ghatkopar East, Mumbai',
    description: 'Variety of puris with different flavored waters',
    image: '💧'
  },
  {
    id: 3,
    name: 'Bangalore Dosa Cart',
    city: 'Bangalore',
    coordinates: [77.5946, 12.9716],
    specialties: ['Masala Dosa', 'Rava Dosa', 'Set Dosa', 'Filter Coffee'],
    category: 'South Indian',
    rating: 4.9,
    priceRange: '₹25-100',
    openHours: '6:00 AM - 2:00 PM',
    address: 'Brigade Road, Bangalore',
    description: 'Crispy dosas and authentic South Indian breakfast',
    image: '🥞'
  },
  {
    id: 4,
    name: 'Chennai Idli Sambar',
    city: 'Chennai',
    coordinates: [80.2707, 13.0827],
    specialties: ['Idli Sambar', 'Medu Vada', 'Uttapam', 'Coconut Chutney'],
    category: 'South Indian',
    rating: 4.6,
    priceRange: '₹20-70',
    openHours: '6:00 AM - 11:00 AM',
    address: 'T. Nagar, Chennai',
    description: 'Traditional Tamil breakfast specialties',
    image: '🍽️'
  },
  {
    id: 5,
    name: 'Kolkata Kathi Roll',
    city: 'Kolkata',
    coordinates: [88.3639, 22.5726],
    specialties: ['Chicken Kathi Roll', 'Mutton Roll', 'Egg Roll', 'Phuchka'],
    category: 'Bengali Street Food',
    rating: 4.8,
    priceRange: '₹30-120',
    openHours: '5:00 PM - 12:00 AM',
    address: 'Park Street, Kolkata',
    description: 'Famous Kolkata rolls and Bengali street snacks',
    image: '🌯'
  },
  {
    id: 6,
    name: 'Hyderabad Biryani Hub',
    city: 'Hyderabad',
    coordinates: [78.4867, 17.3850],
    specialties: ['Chicken Biryani', 'Mutton Biryani', 'Haleem', 'Kebabs'],
    category: 'Hyderabadi Cuisine',
    rating: 4.9,
    priceRange: '₹80-200',
    openHours: '12:00 PM - 11:00 PM',
    address: 'Charminar, Hyderabad',
    description: 'Authentic Hyderabadi biryani and kebabs',
    image: '🍛'
  },
  {
    id: 7,
    name: 'Pune Misal Pav',
    city: 'Pune',
    coordinates: [73.8567, 18.5204],
    specialties: ['Puneri Misal', 'Pav Bhaji', 'Poha', 'Sabudana Vada'],
    category: 'Maharashtrian Food',
    rating: 4.7,
    priceRange: '₹25-90',
    openHours: '7:00 AM - 10:00 PM',
    address: 'FC Road, Pune',
    description: 'Spicy Puneri misal and Maharashtrian snacks',
    image: '🌶️'
  },
  {
    id: 8,
    name: 'Ahmedabad Dhokla Stall',
    city: 'Ahmedabad',
    coordinates: [72.5714, 23.0225],
    specialties: ['Khaman Dhokla', 'Khandvi', 'Fafda Jalebi', 'Thepla'],
    category: 'Gujarati Snacks',
    rating: 4.8,
    priceRange: '₹20-80',
    openHours: '8:00 AM - 8:00 PM',
    address: 'Law Garden, Ahmedabad',
    description: 'Fresh Gujarati snacks and sweets',
    image: '🧈'
  },
  // Additional Delhi Street Food Vendors
  {
    id: 18,
    name: 'Karol Bagh Paranthe Wali Gali',
    city: 'Delhi',
    coordinates: [77.1925, 28.6519],
    specialties: ['Aloo Paratha', 'Gobi Paratha', 'Paneer Paratha', 'Lassi'],
    category: 'Delhi Street Food',
    rating: 4.9,
    priceRange: '₹40-120',
    openHours: '8:00 AM - 11:00 PM',
    address: 'Paranthe Wali Gali, Chandni Chowk',
    description: 'Famous paratha lane with 100+ year old tradition',
    image: '🫓'
  },
  {
    id: 19,
    name: 'Connaught Place Momos',
    city: 'Delhi',
    coordinates: [77.2167, 28.6315],
    specialties: ['Chicken Momos', 'Veg Momos', 'Fried Momos', 'Chutney'],
    category: 'Delhi Street Food',
    rating: 4.6,
    priceRange: '₹30-100',
    openHours: '12:00 PM - 11:00 PM',
    address: 'Connaught Place, New Delhi',
    description: 'Steamed and fried momos with spicy chutney',
    image: '🥟'
  },
  {
    id: 20,
    name: 'Lajpat Nagar Chhole Kulche',
    city: 'Delhi',
    coordinates: [77.2436, 28.5677],
    specialties: ['Chole Kulche', 'Bhature', 'Lassi', 'Pickle'],
    category: 'Delhi Street Food',
    rating: 4.7,
    priceRange: '₹35-90',
    openHours: '9:00 AM - 9:00 PM',
    address: 'Lajpat Nagar Central Market',
    description: 'Spicy chole with soft kulche bread',
    image: '🍞'
  },
  // Bangalore Street Food Vendors
  {
    id: 21,
    name: 'Malleshwaram Benne Dosa',
    city: 'Bangalore',
    coordinates: [77.5667, 12.9899],
    specialties: ['Benne Dosa', 'Kesari Bath', 'Vada', 'Coffee'],
    category: 'Bangalore Street Food',
    rating: 4.8,
    priceRange: '₹30-80',
    openHours: '7:00 AM - 11:00 AM',
    address: 'Malleshwaram 8th Cross',
    description: 'Buttery dosa with authentic taste',
    image: '🧈'
  },
  {
    id: 22,
    name: 'Brigade Road Chaat',
    city: 'Bangalore',
    coordinates: [77.6081, 12.9716],
    specialties: ['Masala Puri', 'Bhel Puri', 'Dahi Puri', 'Sugarcane Juice'],
    category: 'Bangalore Street Food',
    rating: 4.5,
    priceRange: '₹25-70',
    openHours: '4:00 PM - 11:00 PM',
    address: 'Brigade Road, Bangalore',
    description: 'North Indian chaat in South Indian style',
    image: '🥗'
  },
  // Chennai Street Food Vendors
  {
    id: 23,
    name: 'Marina Beach Sundal',
    city: 'Chennai',
    coordinates: [80.2785, 13.0475],
    specialties: ['Sundal', 'Bajji', 'Bonda', 'Tender Coconut'],
    category: 'Chennai Street Food',
    rating: 4.4,
    priceRange: '₹15-50',
    openHours: '5:00 PM - 10:00 PM',
    address: 'Marina Beach, Chennai',
    description: 'Beachside snacks with sea breeze',
    image: '🥥'
  },
  {
    id: 24,
    name: 'T.Nagar Kothu Parotta',
    city: 'Chennai',
    coordinates: [80.2340, 13.0418],
    specialties: ['Kothu Parotta', 'Chicken 65', 'Mutton Rolls', 'Lime Juice'],
    category: 'Chennai Street Food',
    rating: 4.7,
    priceRange: '₹40-150',
    openHours: '7:00 PM - 1:00 AM',
    address: 'T.Nagar, Chennai',
    description: 'Chopped parotta with spicy curry',
    image: '🍖'
  },
  // Kolkata Street Food Vendors
  {
    id: 25,
    name: 'College Street Coffee House',
    city: 'Kolkata',
    coordinates: [88.3732, 22.5726],
    specialties: ['Fish Fry', 'Cutlet', 'Coffee', 'Cigarette'],
    category: 'Kolkata Street Food',
    rating: 4.6,
    priceRange: '₹20-80',
    openHours: '8:00 AM - 11:00 PM',
    address: 'College Street, Kolkata',
    description: 'Intellectual adda with street food',
    image: '☕'
  },
  {
    id: 26,
    name: 'New Market Jhalmuri',
    city: 'Kolkata',
    coordinates: [88.3476, 22.5626],
    specialties: ['Jhalmuri', 'Ghugni', 'Aloo Kabli', 'Phuchka'],
    category: 'Kolkata Street Food',
    rating: 4.5,
    priceRange: '₹15-60',
    openHours: '4:00 PM - 10:00 PM',
    address: 'New Market, Kolkata',
    description: 'Spicy puffed rice mixture',
    image: '🌾'
  },
  // Jaipur Street Food Vendors
  {
    id: 27,
    name: 'Jaipur Pyaaz Kachori',
    city: 'Jaipur',
    coordinates: [75.7873, 26.9124],
    specialties: ['Pyaaz Kachori', 'Samosa', 'Mirchi Bada', 'Lassi'],
    category: 'Rajasthani Street Food',
    rating: 4.8,
    priceRange: '₹20-70',
    openHours: '8:00 AM - 8:00 PM',
    address: 'Johari Bazaar, Jaipur',
    description: 'Crispy kachori with onion filling',
    image: '🧅'
  },
  {
    id: 28,
    name: 'Pink City Dal Baati',
    city: 'Jaipur',
    coordinates: [75.8267, 26.9124],
    specialties: ['Dal Baati Churma', 'Gatte ki Sabzi', 'Ker Sangri', 'Buttermilk'],
    category: 'Rajasthani Street Food',
    rating: 4.9,
    priceRange: '₹60-150',
    openHours: '11:00 AM - 10:00 PM',
    address: 'MI Road, Jaipur',
    description: 'Traditional Rajasthani thali experience',
    image: '🍛'
  },
  // Lucknow Street Food Vendors
  {
    id: 29,
    name: 'Lucknow Tunday Kababi',
    city: 'Lucknow',
    coordinates: [80.9462, 26.8467],
    specialties: ['Galouti Kebab', 'Shami Kebab', 'Biryani', 'Roomali Roti'],
    category: 'Lucknowi Street Food',
    rating: 4.9,
    priceRange: '₹80-250',
    openHours: '12:00 PM - 11:00 PM',
    address: 'Chowk, Lucknow',
    description: 'Melt-in-mouth kebabs since 1905',
    image: '🍖'
  },
  {
    id: 30,
    name: 'Hazratganj Basket Chaat',
    city: 'Lucknow',
    coordinates: [80.9429, 26.8560],
    specialties: ['Basket Chaat', 'Dahi Bhalla', 'Aloo Tikki', 'Kulfi'],
    category: 'Lucknowi Street Food',
    rating: 4.6,
    priceRange: '₹30-100',
    openHours: '5:00 PM - 11:00 PM',
    address: 'Hazratganj, Lucknow',
    description: 'Unique basket-shaped chaat presentation',
    image: '🧺'
  },
  // Amritsar Street Food Vendors
  {
    id: 31,
    name: 'Amritsar Kulcha Land',
    city: 'Amritsar',
    coordinates: [74.8723, 31.6340],
    specialties: ['Amritsari Kulcha', 'Chole', 'Lassi', 'Butter'],
    category: 'Punjabi Street Food',
    rating: 4.8,
    priceRange: '₹40-120',
    openHours: '8:00 AM - 10:00 PM',
    address: 'Hall Bazaar, Amritsar',
    description: 'Stuffed kulcha with spicy chole',
    image: '🫓'
  },
  {
    id: 32,
    name: 'Golden Temple Langar',
    city: 'Amritsar',
    coordinates: [74.8765, 31.6200],
    specialties: ['Langar', 'Roti', 'Dal', 'Kheer'],
    category: 'Punjabi Street Food',
    rating: 5.0,
    priceRange: 'Free',
    openHours: '24/7',
    address: 'Golden Temple, Amritsar',
    description: 'Free community kitchen serving thousands daily',
    image: '🙏'
  },
  // Indore Street Food Vendors
  {
    id: 33,
    name: 'Indore Poha Jalebi',
    city: 'Indore',
    coordinates: [75.8577, 22.7196],
    specialties: ['Poha Jalebi', 'Samosa', 'Kachori', 'Tea'],
    category: 'MP Street Food',
    rating: 4.7,
    priceRange: '₹20-60',
    openHours: '7:00 AM - 11:00 AM',
    address: 'Sarafa Bazaar, Indore',
    description: 'Perfect breakfast combination',
    image: '🍯'
  },
  {
    id: 34,
    name: 'Sarafa Night Market',
    city: 'Indore',
    coordinates: [75.8648, 22.7205],
    specialties: ['Bhutte ka Kees', 'Garadu', 'Dahi Vada', 'Rabri'],
    category: 'MP Street Food',
    rating: 4.8,
    priceRange: '₹25-80',
    openHours: '8:00 PM - 2:00 AM',
    address: 'Sarafa Bazaar, Indore',
    description: 'Night food market with unique dishes',
    image: '🌙'
  },
  // Varanasi Street Food Vendors
  {
    id: 35,
    name: 'Varanasi Kachori Sabzi',
    city: 'Varanasi',
    coordinates: [83.0037, 25.3176],
    specialties: ['Kachori Sabzi', 'Chaat', 'Lassi', 'Paan'],
    category: 'UP Street Food',
    rating: 4.6,
    priceRange: '₹15-70',
    openHours: '6:00 AM - 10:00 PM',
    address: 'Vishwanath Gali, Varanasi',
    description: 'Traditional breakfast near Kashi Vishwanath',
    image: '🕉️'
  },
  // Goa Street Food Vendors
  {
    id: 36,
    name: 'Goa Beach Shack',
    city: 'Goa',
    coordinates: [73.7442, 15.2993],
    specialties: ['Fish Curry Rice', 'Prawn Balchao', 'Bebinca', 'Feni'],
    category: 'Goan Street Food',
    rating: 4.5,
    priceRange: '₹80-200',
    openHours: '11:00 AM - 11:00 PM',
    address: 'Baga Beach, Goa',
    description: 'Coastal flavors with sea view',
    image: '🏖️'
  },
  // Agra Street Food Vendors
  {
    id: 37,
    name: 'Agra Petha Store',
    city: 'Agra',
    coordinates: [78.0081, 27.1767],
    specialties: ['Petha', 'Dalmoth', 'Gajak', 'Milk Cake'],
    category: 'UP Street Food',
    rating: 4.4,
    priceRange: '₹50-150',
    openHours: '9:00 AM - 9:00 PM',
    address: 'Sadar Bazaar, Agra',
    description: 'Famous Agra sweets and snacks',
    image: '🍬'
  }
];

const OpenLayersMap = ({ onVendorSelect, selectedVendor }) => {
  const mapRef = useRef();
  const popupRef = useRef();
  const [map, setMap] = useState(null);
  const [vectorLayer, setVectorLayer] = useState(null);
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    if (!mapRef.current) return;

    let initialMap = null;

    // Try to get user's current location first
    const getUserLocation = () => {
      return new Promise((resolve) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve({
                center: fromLonLat([position.coords.longitude, position.coords.latitude]),
                zoom: 12
              });
            },
            () => {
              // Fallback to India center if location access denied
              resolve({
                center: fromLonLat([78.9629, 20.5937]),
                zoom: 5
              });
            },
            { timeout: 5000 }
          );
        } else {
          resolve({
            center: fromLonLat([78.9629, 20.5937]),
            zoom: 5
          });
        }
      });
    };

    // Initialize the map with user location or fallback
    getUserLocation().then((viewConfig) => {
      if (!mapRef.current) return; // Check if component is still mounted

      initialMap = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View(viewConfig),
      });

      // Create vector layer for markers
      const vectorSource = new VectorSource();
      const vectorLayerInstance = new VectorLayer({
        source: vectorSource,
      });

      initialMap.addLayer(vectorLayerInstance);

      // Create popup overlay
      const popupOverlay = new Overlay({
        element: popupRef.current,
        positioning: 'bottom-center',
        stopEvent: false,
        offset: [0, -10],
      });

      initialMap.addOverlay(popupOverlay);

      // Add vendor markers
      streetFoodVendors.forEach((vendor) => {
        const feature = new Feature({
          geometry: new Point(fromLonLat(vendor.coordinates)),
          vendor: vendor,
        });

        // Create a simple colored marker without emojis to avoid btoa encoding issues
        feature.setStyle(
          new Style({
            image: new Icon({
              src: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
                <svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 0C6.716 0 0 6.716 0 15c0 8.284 15 25 15 25s15-16.716 15-25C30 6.716 23.284 0 15 0z" fill="#FF6B35"/>
                  <circle cx="15" cy="15" r="8" fill="white"/>
                  <circle cx="15" cy="15" r="4" fill="#FF6B35"/>
                </svg>
              `)}`,
              scale: 1,
            }),
            text: new Text({
              text: vendor.name,
              offsetY: 25,
              fill: new Fill({ color: '#000' }),
              stroke: new Stroke({ color: '#fff', width: 2 }),
              font: '12px Arial',
            }),
          })
        );

        vectorSource.addFeature(feature);
      });

      // Handle click events
      initialMap.on('click', (event) => {
        const feature = initialMap.forEachFeatureAtPixel(event.pixel, (feature) => feature);
        
        if (feature) {
          const vendor = feature.get('vendor');
          const coordinate = event.coordinate;
          
          // Show popup
          popupOverlay.setPosition(coordinate);
          setPopup(vendor);
          
          // Notify parent component
          if (onVendorSelect) {
            onVendorSelect(vendor);
          }
        } else {
          // Hide popup
          popupOverlay.setPosition(undefined);
          setPopup(null);
        }
      });

      setMap(initialMap);
      setVectorLayer(vectorLayerInstance);
    });

    // Cleanup function
    return () => {
      if (initialMap) {
        initialMap.setTarget(null);
        initialMap = null;
      }
    };
  }, []); // Empty dependency array to prevent re-initialization

  // Function to zoom to a specific vendor
  const zoomToVendor = (vendor) => {
    if (map) {
      map.getView().animate({
        center: fromLonLat(vendor.coordinates),
        zoom: 15,
        duration: 1000,
      });
    }
  };

  // Effect to handle external vendor selection
  useEffect(() => {
    if (selectedVendor && map) {
      zoomToVendor(selectedVendor);
    }
  }, [selectedVendor, map]);

  return (
    <div className="relative">
      <div 
        ref={mapRef} 
        className="w-full h-96 rounded-lg border border-gray-300"
        style={{ height: '500px' }}
      />
      
      {/* Popup */}
      <div
        ref={popupRef}
        className={`absolute bg-white rounded-lg shadow-lg p-4 max-w-sm border border-gray-200 ${
          popup ? 'block' : 'hidden'
        }`}
        style={{ minWidth: '280px' }}
      >
        {popup && (
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="text-3xl">{popup.image}</div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">{popup.name}</h3>
                <p className="text-sm text-orange-600 font-medium">{popup.category}</p>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600"><T>Rating</T>:</span>
                <span className="font-medium">⭐ {popup.rating}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600"><T>Price Range</T>:</span>
                <span className="font-medium text-green-600">{popup.priceRange}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600"><T>Open Hours</T>:</span>
                <span className="font-medium">{popup.openHours}</span>
              </div>
            </div>
            
            <div className="mt-3">
              <p className="text-sm text-gray-600 mb-2">
                <T>Specialties</T>:
              </p>
              <div className="flex flex-wrap gap-1">
                {popup.specialties.slice(0, 3).map((specialty, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs"
                  >
                    {specialty}
                  </span>
                ))}
                {popup.specialties.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                    +{popup.specialties.length - 3} more
                  </span>
                )}
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500">{popup.description}</p>
              <p className="text-xs text-gray-400 mt-1">📍 {popup.address}</p>
            </div>
            
            <button
              onClick={() => {
                setPopup(null);
                if (map) {
                  map.getOverlays().getArray()[0].setPosition(undefined);
                }
              }}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-2">
        <div className="flex flex-col space-y-2">
          <button
            onClick={() => {
              if (map) {
                map.getView().animate({
                  center: fromLonLat([78.9629, 20.5937]),
                  zoom: 5,
                  duration: 1000,
                });
              }
            }}
            className="px-3 py-2 bg-orange-500 text-white rounded text-sm hover:bg-orange-600 transition-colors"
            title="Reset to India view"
          >
            🇮🇳 <T>India</T>
          </button>
          <button
            onClick={() => {
              if (navigator.geolocation && map) {
                navigator.geolocation.getCurrentPosition((position) => {
                  map.getView().animate({
                    center: fromLonLat([position.coords.longitude, position.coords.latitude]),
                    zoom: 15,
                    duration: 1000,
                  });
                });
              }
            }}
            className="px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
            title="Go to current location"
          >
            📍 <T>My Location</T>
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">
          <T>Street Food Categories</T>
        </h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center space-x-2">
            <span>🥘</span>
            <span><T>Street Snacks</T></span>
          </div>
          <div className="flex items-center space-x-2">
            <span>🍔</span>
            <span><T>Mumbai Street Food</T></span>
          </div>
          <div className="flex items-center space-x-2">
            <span>🥞</span>
            <span><T>South Indian</T></span>
          </div>
          <div className="flex items-center space-x-2">
            <span>🍛</span>
            <span><T>Regional Specialties</T></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { streetFoodVendors };
export default OpenLayersMap;