// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { createContext, useCallback, useEffect, useRef, useState } from 'react';

import { AppLayoutProps } from '@cloudscape-design/components/app-layout';
import SplitPanel from '@cloudscape-design/components/split-panel';

import { Breadcrumbs, HelpPanelProvider, Notifications } from '../commons';
import { CustomAppLayout } from '../commons/common-components';
import { useLocalStorage } from '../commons/use-local-storage';
import { DashboardMainInfo } from '../dashboard/components/header';
import { DashboardSideNavigation } from '../dashboard/components/side-navigation';
import Palette from './components/palette';
import { Content } from './content';
import { Park, ParkAlert, ParkDashboardContextType, ParkEvent, StoredWidgetPlacement, VisitorStat } from './interfaces';
import { getParks, getParkAlerts, getParkEvents, getVisitorStats } from './park-service';
import { allWidgets, getPaletteWidgets } from './widgets';

const supportedWidgets = new Set(Object.keys(allWidgets));

// Create context for park dashboard
export const ParkDashboardContext = createContext<ParkDashboardContextType>({
  selectedPark: null,
  setSelectedPark: () => {},
  loading: true,
  parks: [],
  alerts: [],
  events: [],
  visitorStats: [],
});

export function App() {
  const appLayoutRef = useRef<AppLayoutProps.Ref>(null);

  const [toolsOpen, setToolsOpen] = useState(false);
  const [splitPanelOpen, setSplitPanelOpen] = useState(false);
  const [splitPanelSize, setSplitPanelSize] = useLocalStorage('NationalParks-SplitPanelSize', 360);
  const [layout, setLayout, resetLayout] =
    useLocalStorage<ReadonlyArray<StoredWidgetPlacement>>('NationalParks-widgets-layout');
  const [toolsContent, setToolsContent] = useState<React.ReactNode>(() => <DashboardMainInfo />);

  // Park data state
  const [parks, setParks] = useState<Park[]>([]);
  const [selectedPark, setSelectedPark] = useState<Park | null>(null);
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState<ParkAlert[]>([]);
  const [events, setEvents] = useState<ParkEvent[]>([]);
  const [visitorStats, setVisitorStats] = useState<VisitorStat[]>([]);

  // some deleted/unavailable widgets might be dangling in localStorage, therefore we need to filter them
  const filteredLayout = layout?.filter(item => supportedWidgets.has(item.id));

  const loadHelpPanelContent = (content: React.ReactNode) => {
    setToolsOpen(true);
    setToolsContent(content);
    appLayoutRef.current?.focusToolsClose();
  };

  // Load parks on component mount
  useEffect(() => {
    const loadParks = async () => {
      try {
        const parksData = await getParks();
        setParks(parksData);
        setLoading(false);

        // Set a default park if available
        if (parksData.length > 0 && !selectedPark) {
          setSelectedPark(parksData[0]);
        }
      } catch (error) {
        console.error('Error loading parks:', error);
        setLoading(false);
      }
    };

    loadParks();
  }, [selectedPark]);

  // Load park-specific data when a park is selected
  useEffect(() => {
    if (!selectedPark) return;

    const loadParkData = async () => {
      try {
        const [alertsData, eventsData, statsData] = await Promise.all([
          getParkAlerts(selectedPark.parkCode),
          getParkEvents(selectedPark.parkCode),
          getVisitorStats(selectedPark.parkCode),
        ]);

        setAlerts(alertsData);
        setEvents(eventsData);
        setVisitorStats(statsData);
      } catch (error) {
        console.error('Error loading park data:', error);
      }
    };

    loadParkData();
  }, [selectedPark]);

  // Create context value
  const contextValue: ParkDashboardContextType = {
    selectedPark,
    setSelectedPark,
    loading,
    parks,
    alerts,
    events,
    visitorStats,
  };

  return (
    <ParkDashboardContext.Provider value={contextValue}>
      <HelpPanelProvider value={loadHelpPanelContent}>
        <CustomAppLayout
          ref={appLayoutRef}
          contentType="dashboard"
          breadcrumbs={<Breadcrumbs items={[{ text: 'National Parks Dashboard', href: '#/' }]} />}
          navigation={<DashboardSideNavigation />}
          toolsOpen={toolsOpen}
          tools={toolsContent}
          onToolsChange={({ detail }) => setToolsOpen(detail.open)}
          notifications={<Notifications />}
          content={
            <Content
              layout={filteredLayout ?? null}
              setLayout={setLayout}
              resetLayout={resetLayout}
              setSplitPanelOpen={setSplitPanelOpen}
            />
          }
          splitPanel={
            <SplitPanel header="Add widgets" closeBehavior="hide" hidePreferencesButton={true}>
              <Palette items={getPaletteWidgets(filteredLayout ?? [])} />
            </SplitPanel>
          }
          splitPanelPreferences={{ position: 'side' }}
          splitPanelOpen={splitPanelOpen}
          onSplitPanelToggle={({ detail }) => setSplitPanelOpen(detail.open)}
          splitPanelSize={splitPanelSize}
          onSplitPanelResize={event => setSplitPanelSize(event.detail.size)}
        />
      </HelpPanelProvider>
    </ParkDashboardContext.Provider>
  );
}
