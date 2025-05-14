// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useContext } from 'react';

import Header from '@cloudscape-design/components/header';
import KeyValuePairs from '@cloudscape-design/components/key-value-pairs';
import Link from '@cloudscape-design/components/link';

import { ParkDashboardContext } from '../../app';
import { WidgetConfig } from '../interfaces';

function ParkOverviewHeader() {
  const { selectedPark } = useContext(ParkDashboardContext);

  return <Header variant="h2">Park overview {selectedPark ? `- ${selectedPark.fullName}` : ''}</Header>;
}

function ParkOverviewWidget() {
  const { selectedPark } = useContext(ParkDashboardContext);

  if (!selectedPark) {
    return <div>Please select a park to view information</div>;
  }

  // Extract state abbreviations and create a readable list
  const states = selectedPark.states.split(',').join(', ');

  // Get contact information
  const phoneNumber =
    selectedPark.contacts.phoneNumbers.length > 0 ? selectedPark.contacts.phoneNumbers[0].phoneNumber : 'Not available';

  // Format phone number if available
  const formattedPhone =
    phoneNumber !== 'Not available'
      ? `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`
      : phoneNumber;

  // Get operating hours
  const operatingHours =
    selectedPark.operatingHours.length > 0
      ? selectedPark.operatingHours[0].description
      : 'Hours information not available';

  // Get an address
  const address = selectedPark.addresses.find(addr => addr.type === 'Physical' || addr.type === 'Mailing');
  const formattedAddress = address
    ? `${address.line1}${address.line2 ? ', ' + address.line2 : ''}, ${address.city}, ${address.stateCode} ${address.postalCode}`
    : 'Address not available';

  return (
    <KeyValuePairs
      columns={2}
      items={[
        {
          label: 'Location',
          value: states,
        },
        {
          label: 'Contact',
          value: formattedPhone,
        },
        {
          label: 'Hours',
          value: operatingHours,
        },
        {
          label: 'Address',
          value: formattedAddress,
        },
        {
          label: 'Official Website',
          value: (
            <Link href={selectedPark.url} external>
              Visit website
            </Link>
          ),
        },
        {
          label: 'Directions',
          value: (
            <Link href={selectedPark.directionsUrl} external>
              Get directions
            </Link>
          ),
        },
      ]}
    />
  );
}

export const parkOverview: WidgetConfig = {
  definition: { defaultRowSpan: 2, defaultColumnSpan: 2 },
  data: {
    icon: 'list',
    title: 'Park overview',
    description: 'Basic information about the selected park',
    header: ParkOverviewHeader,
    content: ParkOverviewWidget,
  },
};
