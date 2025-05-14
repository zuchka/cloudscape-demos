// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useContext } from 'react';

import Header from '@cloudscape-design/components/header';
import Link from '@cloudscape-design/components/link';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import Table from '@cloudscape-design/components/table';

import { ParkDashboardContext } from '../../app';
import { WidgetConfig } from '../interfaces';

function ParkAlertsHeader() {
  const { selectedPark } = useContext(ParkDashboardContext);

  return <Header variant="h2">Current alerts {selectedPark ? `- ${selectedPark.fullName}` : ''}</Header>;
}

function ParkAlertsWidget() {
  const { selectedPark, alerts } = useContext(ParkDashboardContext);

  if (!selectedPark) {
    return <div>Please select a park to view information</div>;
  }

  return (
    <Table
      columnDefinitions={[
        {
          id: 'category',
          header: 'Category',
          cell: item => (
            <StatusIndicator
              type={item.category === 'Danger' ? 'error' : item.category === 'Warning' ? 'warning' : 'info'}
            >
              {item.category}
            </StatusIndicator>
          ),
          width: 120,
        },
        {
          id: 'title',
          header: 'Title',
          cell: item => (
            <Link href={item.url} external>
              {item.title}
            </Link>
          ),
        },
        {
          id: 'description',
          header: 'Description',
          cell: item => item.description,
        },
      ]}
      items={alerts}
      loadingText="Loading alerts"
      trackBy="title"
      empty={
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <b>No alerts</b>
          <div>There are no current alerts for this park.</div>
        </div>
      }
      variant="embedded"
    />
  );
}

export const parkAlerts: WidgetConfig = {
  definition: { defaultRowSpan: 3, defaultColumnSpan: 2 },
  data: {
    icon: 'list',
    title: 'Park alerts',
    description: 'Current alerts and warnings for the selected park',
    header: ParkAlertsHeader,
    content: ParkAlertsWidget,
  },
};
