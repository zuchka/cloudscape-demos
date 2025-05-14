// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useContext, useState } from 'react';

import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Header from '@cloudscape-design/components/header';
import Modal from '@cloudscape-design/components/modal';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { ParkDashboardContext } from '../../app';
import { WidgetConfig } from '../interfaces';

interface ImageViewerProps {
  url: string;
  title: string;
  caption: string;
  credit: string;
  altText: string;
  onClose: () => void;
}

function ImageViewer({ url, title, caption, credit, altText, onClose }: ImageViewerProps) {
  return (
    <Modal
      visible={true}
      onDismiss={onClose}
      header={title}
      size="large"
      footer={
        <Box float="right">
          <Button onClick={onClose} variant="primary">
            Close
          </Button>
        </Box>
      }
    >
      <SpaceBetween size="m">
        <div style={{ textAlign: 'center' }}>
          <img src={url} alt={altText} style={{ maxWidth: '100%', maxHeight: '600px', objectFit: 'contain' }} />
        </div>

        <div>
          <Box variant="p">{caption}</Box>
          <Box variant="small">Photo credit: {credit}</Box>
        </div>
      </SpaceBetween>
    </Modal>
  );
}

function ParkImagesHeader() {
  const { selectedPark } = useContext(ParkDashboardContext);

  return <Header variant="h2">Park images {selectedPark ? `- ${selectedPark.fullName}` : ''}</Header>;
}

function ParkImagesWidget() {
  const { selectedPark } = useContext(ParkDashboardContext);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  if (!selectedPark) {
    return <div>Please select a park to view information</div>;
  }

  if (!selectedPark.images || selectedPark.images.length === 0) {
    return <div>No images available for this park.</div>;
  }

  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '16px',
          padding: '4px',
        }}
      >
        {selectedPark.images.map((image, index) => (
          <div
            key={index}
            style={{ cursor: 'pointer' }}
            onClick={() => setSelectedImage(index)}
            role="button"
            aria-label={`View larger image of ${image.title}`}
          >
            <img
              src={image.url}
              alt={image.altText}
              title={image.title}
              style={{
                width: '100%',
                height: '150px',
                objectFit: 'cover',
                borderRadius: '4px',
              }}
            />
            <Box variant="small" padding={{ top: 'xs' }}>
              {image.title}
            </Box>
          </div>
        ))}
      </div>

      {selectedImage !== null && (
        <ImageViewer
          url={selectedPark.images[selectedImage].url}
          title={selectedPark.images[selectedImage].title}
          caption={selectedPark.images[selectedImage].caption}
          credit={selectedPark.images[selectedImage].credit}
          altText={selectedPark.images[selectedImage].altText}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}

export const parkImages: WidgetConfig = {
  definition: { defaultRowSpan: 3, defaultColumnSpan: 2 },
  data: {
    icon: 'pieChart',
    title: 'Park images',
    description: 'Photo gallery of the selected park',
    header: ParkImagesHeader,
    content: ParkImagesWidget,
  },
};
