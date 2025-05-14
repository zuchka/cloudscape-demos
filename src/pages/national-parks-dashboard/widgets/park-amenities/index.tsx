// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useContext } from 'react';

import Box from '@cloudscape-design/components/box';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Header from '@cloudscape-design/components/header';

import { ParkDashboardContext } from '../../app';
import { WidgetConfig } from '../interfaces';

function ParkAmenitiesHeader() {
  const { selectedPark } = useContext(ParkDashboardContext);

  return <Header variant="h2">Park amenities {selectedPark ? `- ${selectedPark.fullName}` : ''}</Header>;
}

function formatCost(cost: string) {
  // Format cost as USD
  const numericCost = parseFloat(cost);
  if (isNaN(numericCost)) {
    return 'Free';
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(numericCost);
}

function ParkAmenitiesWidget() {
  const { selectedPark } = useContext(ParkDashboardContext);

  if (!selectedPark) {
    return <div>Please select a park to view information</div>;
  }

  const activities = selectedPark.activities.map(activity => activity.name).sort();

  // Group activities into columns
  const activitiesPerColumn = Math.ceil(activities.length / 3);
  const column1 = activities.slice(0, activitiesPerColumn);
  const column2 = activities.slice(activitiesPerColumn, activitiesPerColumn * 2);
  const column3 = activities.slice(activitiesPerColumn * 2);

  return (
    <div>
      <Box variant="h3" padding={{ bottom: 's' }}>
        Activities and Features
      </Box>

      <ColumnLayout columns={3} variant="text-grid">
        <div>
          {column1.map((activity, index) => (
            <div key={index} style={{ marginBottom: '8px' }}>
              • {activity}
            </div>
          ))}
        </div>
        <div>
          {column2.map((activity, index) => (
            <div key={index} style={{ marginBottom: '8px' }}>
              • {activity}
            </div>
          ))}
        </div>
        <div>
          {column3.map((activity, index) => (
            <div key={index} style={{ marginBottom: '8px' }}>
              • {activity}
            </div>
          ))}
        </div>
      </ColumnLayout>

      {selectedPark.entranceFees.length > 0 && (
        <>
          <Box variant="h3" padding={{ top: 'l', bottom: 's' }}>
            Entrance Fees
          </Box>
          {selectedPark.entranceFees.map((fee, index) => (
            <div key={index} style={{ marginBottom: '16px' }}>
              <Box variant="strong">
                {fee.title} - {formatCost(fee.cost)}
              </Box>
              <Box variant="p">{fee.description}</Box>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export const parkAmenities: WidgetConfig = {
  definition: { defaultRowSpan: 3, defaultColumnSpan: 2 },
  data: {
    icon: 'list',
    title: 'Park amenities',
    description: 'Activities, features, and fees for the selected park',
    header: ParkAmenitiesHeader,
    content: ParkAmenitiesWidget,
  },
};
