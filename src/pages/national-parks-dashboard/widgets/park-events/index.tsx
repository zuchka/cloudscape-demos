// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useContext } from 'react';

import Header from '@cloudscape-design/components/header';
import Link from '@cloudscape-design/components/link';
import Table from '@cloudscape-design/components/table';

import { ParkDashboardContext } from '../../app';
import { WidgetConfig } from '../interfaces';

function ParkEventsHeader() {
  const { selectedPark } = useContext(ParkDashboardContext);

  return <Header variant="h2">Upcoming events {selectedPark ? `- ${selectedPark.fullName}` : ''}</Header>;
}

function formatDateRange(startDate: string, endDate: string) {
  // Format the date range for display
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Check if dates are the same
  if (startDate === endDate) {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(start);
  }

  // Different dates
  return `${new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(start)} - ${new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(end)}`;
}

function formatTimeRange(times: Array<{ timeStart: string; timeEnd: string }>) {
  if (!times || times.length === 0) {
    return 'Time not specified';
  }

  // Just use the first time range for simplicity
  const { timeStart, timeEnd } = times[0];

  // Format time in 12-hour format
  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  return `${formatTime(timeStart)} - ${formatTime(timeEnd)}`;
}

function ParkEventsWidget() {
  const { selectedPark, events } = useContext(ParkDashboardContext);

  if (!selectedPark) {
    return <div>Please select a park to view information</div>;
  }

  return (
    <Table
      columnDefinitions={[
        {
          id: 'title',
          header: 'Event',
          cell: item => (
            <Link href={item.url} external>
              {item.title}
            </Link>
          ),
        },
        {
          id: 'date',
          header: 'Date',
          cell: item => formatDateRange(item.dateStart, item.dateEnd),
          width: 150,
        },
        {
          id: 'time',
          header: 'Time',
          cell: item => formatTimeRange(item.times),
          width: 150,
        },
        {
          id: 'location',
          header: 'Location',
          cell: item => item.location,
          width: 150,
        },
      ]}
      items={events}
      loadingText="Loading events"
      trackBy="title"
      empty={
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <b>No events</b>
          <div>There are no upcoming events for this park.</div>
        </div>
      }
      variant="embedded"
    />
  );
}

export const parkEvents: WidgetConfig = {
  definition: { defaultRowSpan: 3, defaultColumnSpan: 2 },
  data: {
    icon: 'list',
    title: 'Park events',
    description: 'Upcoming events at the selected park',
    header: ParkEventsHeader,
    content: ParkEventsWidget,
  },
};
