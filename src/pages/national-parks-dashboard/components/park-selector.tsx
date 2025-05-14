// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useContext } from 'react';

import Box from '@cloudscape-design/components/box';
import Select, { SelectProps } from '@cloudscape-design/components/select';

import { ParkDashboardContext } from '../app';

export function ParkSelector() {
  const { parks, selectedPark, setSelectedPark, loading } = useContext(ParkDashboardContext);

  const parkOptions = parks.map(park => ({
    label: park.fullName,
    value: park.parkCode,
    description: `${park.states}`,
  }));

  const handleChange: SelectProps.ChangeDetail['onChange'] = ({ detail }) => {
    if (detail.selectedOption) {
      const selectedParkCode = detail.selectedOption.value || '';
      const park = parks.find(p => p.parkCode === selectedParkCode);
      if (park) {
        setSelectedPark(park);
      }
    }
  };

  return (
    <div className="park-selector">
      <Box margin={{ bottom: 'l' }}>
        <Select
          selectedOption={selectedPark ? { label: selectedPark.fullName, value: selectedPark.parkCode } : null}
          onChange={handleChange}
          options={parkOptions}
          placeholder="Select a national park"
          filteringType="auto"
          statusType={loading ? 'loading' : 'finished'}
          loadingText="Loading parks"
          empty="No parks found"
        />
      </Box>
    </div>
  );
}
