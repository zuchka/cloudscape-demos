// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useContext } from 'react';

import Box from '@cloudscape-design/components/box';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { ParkDashboardContext } from '../../app';
import { WidgetConfig } from '../interfaces';

function ParkWeatherHeader() {
  const { selectedPark } = useContext(ParkDashboardContext);

  return <Header variant="h2">Weather information {selectedPark ? `- ${selectedPark.fullName}` : ''}</Header>;
}

function ParkWeatherWidget() {
  const { selectedPark } = useContext(ParkDashboardContext);

  if (!selectedPark) {
    return <div>Please select a park to view information</div>;
  }

  return (
    <SpaceBetween size="m">
      <Box variant="p">{selectedPark.weatherInfo || 'No weather information available for this park.'}</Box>

      {selectedPark.latLong && (
        <div>
          <Box variant="h3" padding={{ bottom: 's' }}>
            Park Location
          </Box>
          <Box variant="p">Latitude/Longitude: {selectedPark.latLong}</Box>
        </div>
      )}
    </SpaceBetween>
  );
}

export const parkWeather: WidgetConfig = {
  definition: { defaultRowSpan: 2, defaultColumnSpan: 2 },
  data: {
    icon: 'lineChart',
    title: 'Park weather',
    description: 'Current weather conditions and forecast',
    header: ParkWeatherHeader,
    content: ParkWeatherWidget,
  },
};
