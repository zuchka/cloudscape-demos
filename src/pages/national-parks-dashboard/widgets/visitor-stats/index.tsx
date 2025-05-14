// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useContext } from 'react';

import Box from '@cloudscape-design/components/box';
import Header from '@cloudscape-design/components/header';
import BarChart from '@cloudscape-design/components/bar-chart';

import { ParkDashboardContext } from '../../app';
import { WidgetConfig } from '../interfaces';

function VisitorStatsHeader() {
  const { selectedPark } = useContext(ParkDashboardContext);

  return <Header variant="h2">Visitor statistics {selectedPark ? `- ${selectedPark.fullName}` : ''}</Header>;
}

function VisitorStatsWidget() {
  const { selectedPark, visitorStats } = useContext(ParkDashboardContext);

  if (!selectedPark) {
    return <div>Please select a park to view information</div>;
  }

  if (!visitorStats || visitorStats.length === 0) {
    return <div>No visitor statistics available for this park.</div>;
  }

  const chartData = visitorStats.map(stat => ({
    x: stat.year,
    y: stat.visitors,
  }));

  // Format the Y-axis values with commas for thousands
  const formatValue = (value: number) => new Intl.NumberFormat('en-US').format(value);

  return (
    <div>
      <Box variant="h3" padding={{ bottom: 'm' }}>
        Annual Visitors
      </Box>

      <BarChart
        series={[
          {
            title: 'Annual Visitors',
            type: 'bar',
            data: chartData,
          },
        ]}
        xDomain={visitorStats.map(stat => stat.year)}
        yDomain={[0, Math.max(...visitorStats.map(stat => stat.visitors)) * 1.1]}
        i18nStrings={{
          xTickFormatter: e => e,
          yTickFormatter: formatValue,
        }}
        ariaLabel="Visitor statistics by year"
        height={300}
        hideFilter
        hideLegend
        empty={
          <Box textAlign="center" color="inherit">
            <b>No data available</b>
            <Box variant="p" color="inherit">
              There is no visitor data available for this park.
            </Box>
          </Box>
        }
        noMatch={
          <Box textAlign="center" color="inherit">
            <b>No matching data</b>
            <Box variant="p" color="inherit">
              There is no visitor data that matches the current filter.
            </Box>
          </Box>
        }
      />
    </div>
  );
}

export const visitorStats: WidgetConfig = {
  definition: { defaultRowSpan: 3, defaultColumnSpan: 2 },
  data: {
    icon: 'barChart',
    title: 'Visitor statistics',
    description: 'Yearly visitor numbers to the park',
    header: VisitorStatsHeader,
    content: VisitorStatsWidget,
  },
};
