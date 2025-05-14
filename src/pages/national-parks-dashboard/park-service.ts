// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { Park, ParkAlert, ParkEvent, VisitorStat } from './interfaces';

// Mock API Key for demo purposes
const API_KEY = '58IiAxB4LHJoUGCtdQfUJjZhkh7r0E0pqsrcUzPd';
const BASE_URL = 'https://developer.nps.gov/api/v1';

export async function getParks(limit = 50): Promise<Park[]> {
  try {
    const response = await fetch(`${BASE_URL}/parks?limit=${limit}`, {
      headers: {
        'X-Api-Key': API_KEY,
      },
    });

    if (!response.ok) {
      // For demo purposes, return mock data if API call fails
      return getMockParks();
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching parks:', error);
    return getMockParks();
  }
}

export async function getParkByCode(parkCode: string): Promise<Park | null> {
  try {
    const response = await fetch(`${BASE_URL}/parks?parkCode=${parkCode}`, {
      headers: {
        'X-Api-Key': API_KEY,
      },
    });

    if (!response.ok) {
      // For demo purposes, return mock data if API call fails
      const mockParks = getMockParks();
      return mockParks.find(park => park.parkCode === parkCode) || mockParks[0];
    }

    const data = await response.json();
    return data.data[0] || null;
  } catch (error) {
    console.error('Error fetching park by code:', error);
    const mockParks = getMockParks();
    return mockParks.find(park => park.parkCode === parkCode) || mockParks[0];
  }
}

export async function getParkAlerts(parkCode: string): Promise<ParkAlert[]> {
  try {
    const response = await fetch(`${BASE_URL}/alerts?parkCode=${parkCode}`, {
      headers: {
        'X-Api-Key': API_KEY,
      },
    });

    if (!response.ok) {
      return getMockAlerts(parkCode);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching park alerts:', error);
    return getMockAlerts(parkCode);
  }
}

export async function getParkEvents(parkCode: string): Promise<ParkEvent[]> {
  try {
    const response = await fetch(`${BASE_URL}/events?parkCode=${parkCode}`, {
      headers: {
        'X-Api-Key': API_KEY,
      },
    });

    if (!response.ok) {
      return getMockEvents(parkCode);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching park events:', error);
    return getMockEvents(parkCode);
  }
}

export async function getVisitorStats(parkCode: string): Promise<VisitorStat[]> {
  // This is a mock function as the NPS API doesn't have visitor stats
  return getMockVisitorStats(parkCode);
}

// Mock data for demo purposes
function getMockParks(): Park[] {
  return [
    {
      fullName: 'Yellowstone National Park',
      parkCode: 'yell',
      description:
        "On March 1, 1872, Yellowstone became the first national park for all to enjoy the unique hydrothermal and geologic features. Within Yellowstone's 2.2 million acres, visitors have unparalleled opportunities to observe wildlife in an intact ecosystem, explore geothermal areas that contain about half the world's active geysers, and view geologic wonders like the Grand Canyon of the Yellowstone River.",
      states: 'ID,MT,WY',
      directionsInfo:
        'Yellowstone National Park covers nearly 3,500 square miles in the northwest corner of Wyoming (3% of the park is in Montana and 1% is in Idaho). Yellowstone has five entrance stations, and several are closed to regular vehicles during winter.',
      directionsUrl: 'https://www.nps.gov/yell/planyourvisit/directions.htm',
      url: 'https://www.nps.gov/yell/index.htm',
      weatherInfo:
        "Yellowstone's weather can vary quite a bit, even in a single day. In the summer, daytime highs can exceed 70°F (25°C), only to drop 20 or more degrees when a thunderstorm rolls through. It can snow during any month of the year, and winter lows frequently drop below 0°F (-18°C), especially at night.",
      contacts: {
        phoneNumbers: [
          {
            phoneNumber: '3073447381',
            description: 'General Information',
            extension: '',
            type: 'Voice',
          },
        ],
        emailAddresses: [
          {
            emailAddress: 'yell_visitor_services@nps.gov',
            description: 'General Information',
          },
        ],
      },
      entranceFees: [
        {
          cost: '35.00',
          description: 'Good for entry of private, non-commercial vehicle and its occupants for 7 days.',
          title: 'Non-commercial Vehicle',
        },
      ],
      operatingHours: [
        {
          name: 'All Park Hours',
          description: 'Park entrances are open 24 hours a day, 7 days a week.',
          standardHours: {
            sunday: 'All Day',
            monday: 'All Day',
            tuesday: 'All Day',
            wednesday: 'All Day',
            thursday: 'All Day',
            friday: 'All Day',
            saturday: 'All Day',
          },
        },
      ],
      addresses: [
        {
          postalCode: '82190',
          city: 'Yellowstone National Park',
          stateCode: 'WY',
          line1: '2 Officers Row',
          line2: 'Yellowstone National Park Headquarters',
          line3: '',
          type: 'Physical',
        },
      ],
      images: [
        {
          credit: 'NPS/Jim Peaco',
          title: 'Grand Prismatic Spring',
          altText: 'Bright blue water with steaming runoff in orange, yellow and brown',
          caption: 'Grand Prismatic Spring is the largest hot spring in the United States.',
          url: 'https://www.nps.gov/common/uploads/structured_data/3C7D2FBB-1DD8-B71B-0BED99731011CFCE.jpg',
        },
      ],
      latLong: '44.59824417,-110.5471695',
      activities: [
        {
          id: '09DF0950-D319-4557-A57E-04CD2F63FF42',
          name: 'Arts and Culture',
        },
        {
          id: 'BCFF8B94-E15D-44CB-9E50-22F132885B15',
          name: 'Hiking',
        },
      ],
      topics: [
        {
          id: '0D00073E-18C3-46E5-8727-2F87B112DDC6',
          name: 'Animals',
        },
        {
          id: '5BE55D7F-BDB6-4E3D-AC35-2D8EBB974417',
          name: 'Trails',
        },
      ],
    },
    {
      fullName: 'Grand Canyon National Park',
      parkCode: 'grca',
      description:
        'Grand Canyon National Park, with its layered bands of colorful rock, exposes millions of years of geologic history. The Grand Canyon is 277 river miles long, up to 18 miles wide, and a mile deep.',
      states: 'AZ',
      directionsInfo:
        'Grand Canyon National Park is located in northern Arizona. The South Rim is open year-round and is located 60 miles north of Williams, Arizona (via route 64 from Interstate 40) and 80 miles north of Flagstaff (via route 180).',
      directionsUrl: 'https://www.nps.gov/grca/planyourvisit/directions.htm',
      url: 'https://www.nps.gov/grca/index.htm',
      weatherInfo:
        'This weather varies with cold winters and mild pleasant summers, moderate humidity, and considerable diurnal temperature changes at the higher elevations.',
      contacts: {
        phoneNumbers: [
          {
            phoneNumber: '9286387888',
            description: 'General Information',
            extension: '',
            type: 'Voice',
          },
        ],
        emailAddresses: [
          {
            emailAddress: 'grca_information@nps.gov',
            description: 'General Information',
          },
        ],
      },
      entranceFees: [
        {
          cost: '35.00',
          description: 'Admits one single, private, non-commercial vehicle and all its passengers.',
          title: 'Vehicle Permit',
        },
      ],
      operatingHours: [
        {
          name: 'South Rim',
          description: 'The South Rim is open 24 hours a day, 365 days a year.',
          standardHours: {
            sunday: 'All Day',
            monday: 'All Day',
            tuesday: 'All Day',
            wednesday: 'All Day',
            thursday: 'All Day',
            friday: 'All Day',
            saturday: 'All Day',
          },
        },
      ],
      addresses: [
        {
          postalCode: '86023',
          city: 'Grand Canyon',
          stateCode: 'AZ',
          line1: 'Grand Canyon National Park',
          line2: '20 South Entrance Road',
          line3: '',
          type: 'Physical',
        },
      ],
      images: [
        {
          credit: 'NPS Photo',
          title: 'Grand Canyon Sunset',
          altText: 'Orange, reds and yellows fill the sky and canyon at sunset at the Grand Canyon',
          caption: 'Sunset from Mather Point',
          url: 'https://www.nps.gov/common/uploads/structured_data/3C7ECACF-1DD8-B71B-0B63F439C6580664.jpg',
        },
      ],
      latLong: '36.0638,-112.1076',
      activities: [
        {
          id: '5F723BAD-7359-48FC-98FA-631592256E35',
          name: 'Auto and ATV',
        },
        {
          id: 'BCFF8B94-E15D-44CB-9E50-22F132885B15',
          name: 'Hiking',
        },
      ],
      topics: [
        {
          id: '0D00073E-18C3-46E5-8727-2F87B112DDC6',
          name: 'Animals',
        },
        {
          id: '5BE55D7F-BDB6-4E3D-AC35-2D8EBB974417',
          name: 'Trails',
        },
      ],
    },
    {
      fullName: 'Yosemite National Park',
      parkCode: 'yose',
      description:
        'Not just a great valley, but a shrine to human foresight, the strength of granite, the power of glaciers, the persistence of life, and the tranquility of the High Sierra. Yosemite National Park, one of the first wilderness parks in the United States, is best known for its waterfalls, but within its nearly 1,200 square miles, you can find deep valleys, grand meadows, ancient giant sequoias, a vast wilderness area, and much more.',
      states: 'CA',
      directionsInfo:
        'You can drive to Yosemite year-round and enter via Highways 41, 140, and 120 from the west. Tioga Pass Entrance (via Highway 120 from the east) is closed from around November through late May or June. Hetch Hetchy is open year-round but may close intermittently due to snow.',
      directionsUrl: 'https://www.nps.gov/yose/planyourvisit/driving.htm',
      url: 'https://www.nps.gov/yose/index.htm',
      weatherInfo:
        'Yosemite National Park covers nearly 1,200 square miles (3,100 square km) in the Sierra Nevada, with elevations ranging from about 2,000 feet (600 m) to 13,000 ft (4,000 m). Yosemite receives 95% of its precipitation between October and May (and over 75% between November and March).',
      contacts: {
        phoneNumbers: [
          {
            phoneNumber: '2093720200',
            description: 'General Information',
            extension: '',
            type: 'Voice',
          },
        ],
        emailAddresses: [
          {
            emailAddress: 'yose_webmaster@nps.gov',
            description: 'General Information',
          },
        ],
      },
      entranceFees: [
        {
          cost: '35.00',
          description: 'This fee is valid for seven days.',
          title: 'Non-commercial car, pickup truck, RV, or van with 15 or fewer passenger seats',
        },
      ],
      operatingHours: [
        {
          name: 'All Park Hours',
          description: 'Yosemite National Park is open 24 hours per day, 365 days per year.',
          standardHours: {
            sunday: 'All Day',
            monday: 'All Day',
            tuesday: 'All Day',
            wednesday: 'All Day',
            thursday: 'All Day',
            friday: 'All Day',
            saturday: 'All Day',
          },
        },
      ],
      addresses: [
        {
          postalCode: '95389',
          city: 'Yosemite National Park',
          stateCode: 'CA',
          line1: 'Yosemite National Park',
          line2: 'P.O. Box 577',
          line3: '',
          type: 'Mailing',
        },
      ],
      images: [
        {
          credit: 'NPS / Cindy Jacoby',
          title: 'Half Dome from Glacier Point',
          altText: 'Glacier Point provides a commanding view of Half Dome, Nevada Fall, and Yosemite Valley.',
          caption: 'Glacier Point provides a commanding view of Half Dome, Nevada Fall, and Yosemite Valley.',
          url: 'https://www.nps.gov/common/uploads/structured_data/3C84C4C0-1DD8-B71B-0B1C7CB883AA8FB5.jpg',
        },
      ],
      latLong: '37.84883288,-119.5571873',
      activities: [
        {
          id: '5F723BAD-7359-48FC-98FA-631592256E35',
          name: 'Auto and ATV',
        },
        {
          id: 'BCFF8B94-E15D-44CB-9E50-22F132885B15',
          name: 'Hiking',
        },
      ],
      topics: [
        {
          id: '0D00073E-18C3-46E5-8727-2F87B112DDC6',
          name: 'Animals',
        },
        {
          id: '5BE55D7F-BDB6-4E3D-AC35-2D8EBB974417',
          name: 'Trails',
        },
      ],
    },
  ];
}

function getMockAlerts(parkCode: string): ParkAlert[] {
  return [
    {
      title: 'Road Closure',
      description: 'Temporary road closure due to storm damage. Please check with park officials for updates.',
      url: 'https://www.nps.gov/yell/planyourvisit/road-closures.htm',
      parkCode: parkCode,
      category: 'Information',
    },
    {
      title: 'Trail Maintenance',
      description: 'Several trails are undergoing maintenance. Expect detours and closures in certain areas.',
      url: 'https://www.nps.gov/yell/planyourvisit/trail-closures.htm',
      parkCode: parkCode,
      category: 'Information',
    },
    {
      title: 'Wildlife Warning',
      description: 'Recent bear activity reported in the park. Please maintain a safe distance from wildlife.',
      url: 'https://www.nps.gov/yell/planyourvisit/safety.htm',
      parkCode: parkCode,
      category: 'Danger',
    },
  ];
}

function getMockEvents(parkCode: string): ParkEvent[] {
  // Helper to get a future date
  const getFutureDate = (daysFromNow: number) => {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    return date.toISOString().split('T')[0];
  };

  return [
    {
      title: 'Ranger-led Hike',
      description: 'Join a park ranger for a guided hike through the scenic trails of the park.',
      location: 'Visitor Center',
      dateStart: getFutureDate(7),
      dateEnd: getFutureDate(7),
      times: [
        {
          timeStart: '09:00',
          timeEnd: '11:00',
        },
      ],
      feeInfo: 'Free with park entrance fee',
      url: 'https://www.nps.gov/yell/planyourvisit/guidedtours.htm',
      parkCode: parkCode,
    },
    {
      title: 'Wildlife Photography Workshop',
      description: 'Learn wildlife photography techniques from professional photographers in the park.',
      location: 'Education Center',
      dateStart: getFutureDate(14),
      dateEnd: getFutureDate(16),
      times: [
        {
          timeStart: '10:00',
          timeEnd: '15:00',
        },
      ],
      feeInfo: '$45 per person, registration required',
      url: 'https://www.nps.gov/yell/planyourvisit/events.htm',
      parkCode: parkCode,
    },
    {
      title: 'Evening Campfire Program',
      description:
        "Gather around the campfire for stories and information about the park's natural and cultural history.",
      location: 'Amphitheater',
      dateStart: getFutureDate(10),
      dateEnd: getFutureDate(10),
      times: [
        {
          timeStart: '20:00',
          timeEnd: '21:30',
        },
      ],
      feeInfo: 'Free with park entrance fee',
      url: 'https://www.nps.gov/yell/planyourvisit/programs.htm',
      parkCode: parkCode,
    },
  ];
}

function getMockVisitorStats(parkCode: string): VisitorStat[] {
  // Different visitor stats for different parks
  const baseNumbers =
    parkCode === 'yell' ? 4000000 : parkCode === 'grca' ? 6000000 : parkCode === 'yose' ? 5000000 : 3000000;

  return [
    { year: '2016', visitors: Math.floor(baseNumbers * 0.85) },
    { year: '2017', visitors: Math.floor(baseNumbers * 0.9) },
    { year: '2018', visitors: Math.floor(baseNumbers * 0.95) },
    { year: '2019', visitors: baseNumbers },
    { year: '2020', visitors: Math.floor(baseNumbers * 0.5) },
    { year: '2021', visitors: Math.floor(baseNumbers * 0.7) },
    { year: '2022', visitors: Math.floor(baseNumbers * 0.9) },
  ];
}
