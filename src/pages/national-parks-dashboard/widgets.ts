// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { BoardProps } from '@cloudscape-design/board-components/board';

import { StoredWidgetPlacement } from './interfaces';
import { WidgetConfig, WidgetDataType } from './widgets/interfaces';
import { parkOverview } from './widgets/park-overview';
import { parkAlerts } from './widgets/park-alerts';
import { parkEvents } from './widgets/park-events';
import { parkAmenities } from './widgets/park-amenities';
import { parkWeather } from './widgets/park-weather';
import { parkImages } from './widgets/park-images';
import { visitorStats } from './widgets/visitor-stats';

export const allWidgets: Record<string, WidgetConfig> = {
  parkOverview,
  parkAlerts,
  parkEvents,
  parkAmenities,
  parkWeather,
  parkImages,
  visitorStats,
};

const defaultLayout: ReadonlyArray<StoredWidgetPlacement> = [
  { id: 'parkOverview' },
  { id: 'parkAlerts' },
  { id: 'parkEvents' },
  { id: 'parkAmenities' },
  { id: 'parkWeather' },
  { id: 'parkImages' },
  { id: 'visitorStats' },
];

function merge<T extends { id: string }>(
  src: ReadonlyArray<T>,
  overrides: ReadonlyArray<Partial<T> & { id: string }>,
): ReadonlyArray<T> {
  return src.map(item => {
    const match = overrides.find(override => override.id === item.id);
    return match ? { ...item, ...match } : item;
  });
}

export function getDefaultLayout(width: number) {
  if (width >= 2160) {
    // 6-col layout
    return merge(defaultLayout, [
      { id: 'parkOverview', columnOffset: { '6': 0 }, columnSpan: 2 },
      { id: 'parkWeather', columnOffset: { '6': 2 }, columnSpan: 2 },
      { id: 'parkAlerts', columnOffset: { '6': 4 }, columnSpan: 2 },
      { id: 'parkEvents', columnOffset: { '6': 0 }, columnSpan: 2 },
      { id: 'parkAmenities', columnOffset: { '6': 2 }, columnSpan: 2 },
      { id: 'visitorStats', columnOffset: { '6': 4 }, columnSpan: 2 },
      { id: 'parkImages', columnOffset: { '6': 0 }, columnSpan: 6, rowSpan: 3 },
    ]);
  }
  if (width > 1045) {
    // 4-col layout
    return merge(defaultLayout, [
      { id: 'parkOverview', columnOffset: { '4': 0 }, columnSpan: 2 },
      { id: 'parkWeather', columnOffset: { '4': 2 }, columnSpan: 2 },
      { id: 'parkAlerts', columnOffset: { '4': 0 }, columnSpan: 2 },
      { id: 'parkEvents', columnOffset: { '4': 2 }, columnSpan: 2 },
      { id: 'parkAmenities', columnOffset: { '4': 0 }, columnSpan: 2 },
      { id: 'visitorStats', columnOffset: { '4': 2 }, columnSpan: 2 },
      { id: 'parkImages', columnOffset: { '4': 0 }, columnSpan: 4, rowSpan: 3 },
    ]);
  }
  if (width > 708) {
    // 2-col layout
    return merge(defaultLayout, [
      { id: 'parkOverview', columnSpan: 2 },
      { id: 'parkWeather', columnSpan: 2 },
      { id: 'parkAlerts', columnSpan: 2 },
      { id: 'parkEvents', columnSpan: 2 },
      { id: 'parkAmenities', columnSpan: 2 },
      { id: 'visitorStats', columnSpan: 2 },
      { id: 'parkImages', columnSpan: 2 },
    ]);
  }
  // 1-col layout
  return defaultLayout;
}

export function exportLayout(
  items: ReadonlyArray<BoardProps.Item<WidgetDataType>>,
): ReadonlyArray<StoredWidgetPlacement> {
  return items.map(item => ({
    id: item.id,
    columnSpan: item.columnSpan,
    columnOffset: item.columnOffset,
    rowSpan: item.rowSpan,
  }));
}

export function getBoardWidgets(layout: ReadonlyArray<StoredWidgetPlacement>) {
  return layout.map(position => {
    const widget = allWidgets[position.id];
    return {
      ...position,
      ...widget,
      columnSpan: position.columnSpan ?? widget.definition?.defaultColumnSpan ?? 1,
      rowSpan: position.rowSpan ?? widget.definition?.defaultRowSpan ?? 2,
    };
  });
}

export function getPaletteWidgets(layout: ReadonlyArray<StoredWidgetPlacement>) {
  return Object.entries(allWidgets)
    .filter(([id]) => !layout.find(position => position.id === id))
    .map(([id, widget]) => ({ id, ...widget }));
}
