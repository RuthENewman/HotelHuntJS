const facilityForm = document.querySelector(".facilities-form");
const resultsSection = document.querySelector('.results');
const wifiInput = document.getElementById('#wifi');

let state = {
  hotels: [],
  filteredHotels: [],
  filters: {
    wifi: false,
    restaurant: false,
    gym: false,
    spa: false,
    carPark: false,
    pool: false,
  }
}

const hotels = [
  {
    "name": "hotelone",
    "starRating": 5,
    "facilities": ["car park", "pool"],
    "image_url": "https://static.laterooms.com/hotelphotos/laterooms/4878/gallery/the-lowry-manchester_220220171517368075.jpg"
  },
  {
    "name": "hoteltwo",
    "starRating": 3,
    "facilities": ["car park", "gym"],
    "image_url": "https://static.laterooms.com/hotelphotos/laterooms/429076/gallery/parkview-residence-manchester_230320161038458796.jpg"
  },
  {
    "name": "hotelthree",
    "starRating": 3,
    "facilities": [],
    "image_url": "https://static.laterooms.com/hotelphotos/laterooms/7332/gallery/the-victoria-hotel-manchester-by-compass-hospitality-chadderton_040420180938186957.jpg"
  },
  {
    "name": "hotelfour",
    "starRating": 2,
    "facilities": ["wifi"],
    "image_url": "https://static.laterooms.com/hotelphotos/laterooms/281008/gallery/travelodge-manchester-salford-quays-salford_060620161519008049.jpg"
  },
  {
    "name": "hotelfive",
    "starRating": 5,
    "facilities": ["car park", "pool", "gym", "wifi", "spa", "restaurant"],
    "image_url": "https://static.laterooms.com/hotelphotos/laterooms/66065/gallery/the-palace-hotel-manchester_290420161126595662.jpg"
  },
  {
    "name": "hotelsix",
    "starRating": 4,
    "facilities": ["car park", "gym", "wifi", "restaurant"],
    "image_url": "https://static.laterooms.com/hotelphotos/laterooms/100312/gallery/macdonald-manchester-hotel-spa-manchester_070620171652389196.jpg"
  },
  {
    "name": "hotelseven",
    "starRating": 4,
    "facilities": ["car park", "gym", "wifi"],
    "image_url": "https://static.laterooms.com/hotelphotos/laterooms/158302/gallery/park-inn-by-radisson-manchester-city-centre-manchester_161220151254168322.jpg"
  },
  {
    "name": "hoteleight",
    "starRating": 3,
    "facilities": ["wifi"],
    "image_url": "https://static.laterooms.com/hotelphotos/laterooms/194194/gallery/new-union-manchester_110520151237145162.jpg"
  },
  {
    "name": "hotelnine",
    "starRating": 4,
    "facilities": ["car park", "pool", "gym", "wifi", "restaurant"],
    "image_url": "https://static.laterooms.com/hotelphotos/laterooms/429856/gallery/la-reserve-aparthotel-manchester_150820171110333031.jpg"
  },
  {
    "name": "hotelten",
    "starRating": 3,
    "facilities": ["car park", "wifi"],
    "image_url": "https://static.laterooms.com/hotelphotos/laterooms/1055/gallery/britannia-hotel-city-centre-manchester-manchester_220120151124171017.jpg"
  }
]

const filterForCarPark = (event) => {
  event.preventDefault();
  if(state.filteredHotels.length > 0) {
    state = {
      filteredHotels: filteredHotels.filter((hotel) => hotel.facilities.includes("car park"))
    }
  } else {
    state = {
      filteredHotels: hotels.filter((hotel) => hotel.facilities.includes("car park"))
    }
  }
  renderFilteredHotels();
}

const toggleFilter = (facility) => {
  state.filters[facility] = !state.filters[facility];
}

const filterAll = (event) => {
  event.preventDefault();
  state.filteredHotels = [];
  for(let facility in state.filters) {
    if (state.filters[facility] === true && facility !== 'carPark') {
      filterByFacility(facility);
    } else if (state.filters[facility] === true && facility == 'carPark') {
      filterByFacility("car park");
    }
  }
  console.log(state.filteredHotels);
}

const filterByFacility = (facility) => {
  if (state.filteredHotels.length > 0) {
    state.filteredHotels = state.filteredHotels.filter((hotel) => hotel.facilities.includes(facility));
  } else {
    state.filteredHotels = hotels.filter((hotel) => hotel.facilities.includes(facility));
  }
  console.log(state.filteredHotels);
  renderFilteredHotels()
}

const initialise = () => {
  fetchHotels()
  renderHotels();
}

const fetchHotels = () => {
  state.hotels = hotels;
}

// render hotels function

const renderHotels = () => {
  hotels.forEach((hotel) => {
    resultsSection.innerHTML += `
    <div class="hotel">
      <div class="hotel__details">
        <h2 class="hotel__details--name">${hotel.name.slice(0,1).toUpperCase()}${hotel.name.slice(1,5)} ${hotel.name.slice(5)}</h2>
        <h3 class="hotel__details--starRating">${hotel.starRating} stars</h3>
      </div>
      <img src=${hotel.image_url} alt=${hotel.name} class="hotel__image"/>
    </div>
  `
  })
}

const renderFilteredHotels = () => {
  resultsSection.innerHTML = '';
  state.filteredHotels.forEach((hotel) => {
    resultsSection.innerHTML += `
    <div class="hotel">
      <div class="hotel__details">
        <h2 class="hotel__details--name">${hotel.name.slice(0,1).toUpperCase()}${hotel.name.slice(1,5)} ${hotel.name.slice(5)}</h2>
        <h3 class="hotel__details--starRating">${hotel.starRating} stars</h3>
      </div>
      <img src=${hotel.image_url} alt=${hotel.name} class="hotel__image"/>
    </div>
  `
  })
}


facilityForm.addEventListener('submit', (event) => filterAll(event))

document.getElementById('wifi').addEventListener('change', () => toggleFilter('wifi'))
document.getElementById('pool').addEventListener('change', () => toggleFilter('pool'))
document.getElementById('carPark').addEventListener('change', () => toggleFilter('car park'))
document.getElementById('restaurant').addEventListener('change', () => toggleFilter('restaurant'))
document.getElementById('gym').addEventListener('change', () => toggleFilter('gym'))
document.getElementById('spa').addEventListener('change', () => toggleFilter('spa'))


initialise();
