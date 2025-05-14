// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import ItemsPalette, { ItemsPaletteProps } from '@cloudscape-design/board-components/items-palette';
import { useCollection } from '@cloudscape-design/collection-hooks';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import TextFilter from '@cloudscape-design/components/text-filter';

import { WidgetDataType } from '../widgets/interfaces';
import { paletteI18nStrings } from '../i18n-strings';
import { PaletteItem } from './palette-item';

function compareStrings(value: string, query: string) {
  return value.toLowerCase().includes(query.toLowerCase());
}

interface PaletteProps {
  items: ReadonlyArray<ItemsPaletteProps.Item<WidgetDataType>>;
}

export default function Palette({ items: allItems }: PaletteProps) {
  const { items, filterProps, collectionProps, filteredItemsCount, actions } = useCollection(allItems, {
    filtering: {
      filteringFunction: (item, filteringText) =>
        compareStrings(item.data.title, filteringText) || compareStrings(item.data.description, filteringText),
      empty: (
        <Box textAlign="center" color="inherit" margin={{ top: 'xxl', bottom: 'xxl' }}>
          <Box padding={{ bottom: 's' }} variant="p" color="inherit">
            <b>No more widgets</b>
          </Box>
          <Box variant="p">All widgets were added to the dashboard already.</Box>
        </Box>
      ),
      noMatch: (
        <Box textAlign="center" color="inherit" margin={{ top: 'xxl', bottom: 'xxl' }}>
          <Box padding={{ bottom: 's' }} variant="p" color="inherit">
            <b>No matches</b>
          </Box>
          <Box variant="p">We can't find a match.</Box>
          <Box padding={{ top: 's' }}>
            <Button onClick={() => actions.setFiltering('')}>Clear filter</Button>
          </Box>
        </Box>
      ),
    },
    sorting: {
      defaultState: {
        sortingColumn: { sortingComparator: (a, b) => (a.data.title > b.data.title ? 1 : -1) },
      },
    },
  });

  return (
    <SpaceBetween size="l">
      <TextFilter
        {...filterProps}
        filteringAriaLabel="Filter widgets"
        filteringPlaceholder="Find widgets"
        filteringClearAriaLabel="Clear"
        countText={`${filteredItemsCount!} matches`}
      />
      {items.length > 0 ? (
        <ItemsPalette
          items={items}
          i18nStrings={paletteI18nStrings}
          renderItem={(item, { showPreview }) => (
            <PaletteItem
              title={item.data.title}
              description={item.data.description}
              iconName={item.data.icon}
              showPreview={showPreview}
            />
          )}
        />
      ) : (
        collectionProps.empty
      )}
    </SpaceBetween>
  );
}
