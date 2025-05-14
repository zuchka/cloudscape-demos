// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import Icon from '@cloudscape-design/components/icon';
import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';

import * as icons from '../../../dashboard/icons';
import * as styles from './styles.module.scss';

interface PaletteItemProps {
  title: string;
  description: string;
  iconName: keyof typeof icons;
  showPreview: boolean;
}

export function PaletteItem({ title, description, iconName, showPreview }: PaletteItemProps) {
  return (
    <div className={styles.root}>
      {showPreview ? (
        <Box textAlign="center" color="inherit" margin={{ top: 'xxl', bottom: 'xxl' }}>
          <Box padding={{ bottom: 's' }} variant="p" color="inherit">
            <b>Add to dashboard</b>
          </Box>
          <Box variant="p">Drag and drop the item on the dashboard</Box>
        </Box>
      ) : (
        <SpaceBetween size="s">
          <div className={styles.icon}>
            <img
              alt=""
              src={typeof icons[iconName] === 'string' ? icons[iconName] : icons[iconName].light}
              className={styles.image}
            />
          </div>
          <div>
            <Box variant="strong">{title}</Box>
            <Box variant="p" padding={{ top: 'xxxs' }}>
              {description}
            </Box>
          </div>
        </SpaceBetween>
      )}
    </div>
  );
}
