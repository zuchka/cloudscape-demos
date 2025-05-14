// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useContext } from 'react';

import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import Link from '@cloudscape-design/components/link';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { ParkDashboardContext } from '../app';

export function ParkBanner() {
  const { selectedPark } = useContext(ParkDashboardContext);

  if (!selectedPark) {
    return null;
  }

  const randomImage = selectedPark.images && selectedPark.images.length > 0 ? selectedPark.images[0] : null;

  return (
    <Container>
      <SpaceBetween size="m">
        <Box variant="h2">{selectedPark.fullName}</Box>

        <div className="park-banner-content">
          <SpaceBetween size="m" direction="horizontal">
            {randomImage && (
              <div className="park-banner-image">
                <img
                  src={randomImage.url}
                  alt={randomImage.altText || selectedPark.fullName}
                  style={{
                    maxWidth: '200px',
                    maxHeight: '150px',
                    objectFit: 'cover',
                    borderRadius: '4px',
                  }}
                />
              </div>
            )}

            <div className="park-banner-info" style={{ flex: 1 }}>
              <SpaceBetween size="s">
                <Box variant="p">{selectedPark.description}</Box>
                <Box variant="small">
                  <strong>States:</strong> {selectedPark.states.split(',').join(', ')}
                </Box>
                <SpaceBetween direction="horizontal" size="s">
                  <Button iconName="external" iconAlign="right" href={selectedPark.url} target="_blank">
                    Visit park website
                  </Button>
                  {selectedPark.directionsUrl && (
                    <Link href={selectedPark.directionsUrl} target="_blank">
                      Get directions
                    </Link>
                  )}
                </SpaceBetween>
              </SpaceBetween>
            </div>
          </SpaceBetween>
        </div>
      </SpaceBetween>
    </Container>
  );
}
