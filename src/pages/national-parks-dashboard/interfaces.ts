// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
export interface StoredWidgetPlacement {
  id: string;
  columnOffset?: Record<number, number>;
  rowSpan?: number;
  columnSpan?: number;
}

export interface Park {
  fullName: string;
  parkCode: string;
  description: string;
  states: string;
  directionsInfo: string;
  directionsUrl: string;
  url: string;
  weatherInfo: string;
  contacts: {
    phoneNumbers: Array<{
      phoneNumber: string;
      description: string;
      extension: string;
      type: string;
    }>;
    emailAddresses: Array<{
      emailAddress: string;
      description: string;
    }>;
  };
  entranceFees: Array<{
    cost: string;
    description: string;
    title: string;
  }>;
  operatingHours: Array<{
    name: string;
    description: string;
    standardHours: {
      sunday: string;
      monday: string;
      tuesday: string;
      wednesday: string;
      thursday: string;
      friday: string;
      saturday: string;
    };
  }>;
  addresses: Array<{
    postalCode: string;
    city: string;
    stateCode: string;
    line1: string;
    line2: string;
    line3: string;
    type: string;
  }>;
  images: Array<{
    credit: string;
    title: string;
    altText: string;
    caption: string;
    url: string;
  }>;
  latLong: string;
  activities: Array<{
    id: string;
    name: string;
  }>;
  topics: Array<{
    id: string;
    name: string;
  }>;
}

export interface ParkAlert {
  title: string;
  description: string;
  url: string;
  parkCode: string;
  category: string;
}

export interface ParkEvent {
  title: string;
  description: string;
  location: string;
  dateStart: string;
  dateEnd: string;
  times: Array<{
    timeStart: string;
    timeEnd: string;
  }>;
  feeInfo: string;
  url: string;
  parkCode: string;
}

export interface VisitorStat {
  year: string;
  visitors: number;
}

export interface ParkDashboardContextType {
  selectedPark: Park | null;
  setSelectedPark: (park: Park | null) => void;
  loading: boolean;
  parks: Park[];
  alerts: ParkAlert[];
  events: ParkEvent[];
  visitorStats: VisitorStat[];
}
