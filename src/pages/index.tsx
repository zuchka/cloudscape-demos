// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import ContentLayout from '@cloudscape-design/components/content-layout';
import Header from '@cloudscape-design/components/header';
import Grid from '@cloudscape-design/components/grid';
import Box from '@cloudscape-design/components/box';
import Link from '@cloudscape-design/components/link';

const demos = [
  { route: '/cards', title: 'Card View', description: 'Demo of Cloudscape Cards component.' },
  { route: '/chat', title: 'Chat', description: 'Chat UI demo.' },
  { route: '/configurable-dashboard', title: 'Configurable Dashboard', description: 'Dashboard with configurable widgets.' },
  { route: '/dashboard', title: 'Service Dashboard', description: 'Dashboard layout demo.' },
  { route: '/delete-one-click', title: 'One-click Delete', description: 'Delete with a single click.' },
  { route: '/delete-with-additional-confirmation', title: 'Delete with Additional Confirmation', description: 'Delete with extra confirmation step.' },
  { route: '/delete-with-simple-confirmation', title: 'Delete with Simple Confirmation', description: 'Delete with simple confirmation.' },
  { route: '/details', title: 'Details Page', description: 'Resource details page.' },
  { route: '/details-hub', title: 'Details Hub', description: 'Details page as a hub.' },
  { route: '/details-tabs', title: 'Details with Tabs', description: 'Details page with tabs.' },
  { route: '/edit', title: 'Edit Resource', description: 'Edit resource demo.' },
  { route: '/form', title: 'Single Page Create', description: 'Single page form demo.' },
  { route: '/form-unsaved-changes', title: 'Unsaved Changes', description: 'Communicate unsaved changes.' },
  { route: '/form-validation', title: 'Form Validation', description: 'Form validation demo.' },
  { route: '/manage-tags', title: 'Manage Tags', description: 'Tag management demo.' },
  { route: '/non-console', title: 'Top Navigation', description: 'Non-console top navigation.' },
  { route: '/onboarding', title: 'Onboarding', description: 'Hands-on tutorials.' },
  { route: '/product-detail-page', title: 'Product Detail Page', description: 'Product details demo.' },
  { route: '/read-from-s3', title: 'Read from S3', description: 'Read data from Amazon S3.' },
  { route: '/server-side-table', title: 'Server-side Table', description: 'Table view (server-side).' },
  { route: '/server-side-table-property-filter', title: 'Server-side Table Property Filter', description: 'Table property filter (server-side).' },
  { route: '/split-panel-comparison', title: 'Split Panel Comparison', description: 'Split view with details comparison.' },
  { route: '/split-panel-multiple', title: 'Split Panel Multiple', description: 'Split view.' },
  { route: '/table', title: 'Table View', description: 'Demo of Cloudscape Table component.' },
  { route: '/table-date-filter', title: 'Table Date Filter', description: 'Table with date range picker filter.' },
  { route: '/table-editable', title: 'Editable Table', description: 'Table with inline editing.' },
  { route: '/table-expandable', title: 'Expandable Table', description: 'Table with expandable rows.' },
  { route: '/table-property-filter', title: 'Table Property Filter', description: 'Table with property filter.' },
  { route: '/table-saved-filters', title: 'Table Saved Filters', description: 'Table with saved filter sets.' },
  { route: '/table-select-filter', title: 'Table Select Filter', description: 'Table with select filter.' },
  { route: '/wizard', title: 'Wizard', description: 'Multi-step wizard demo.' },
  { route: '/write-to-s3', title: 'Write to S3', description: 'Write data to Amazon S3.' },
];

export default function Home() {
  return (
    <AppLayout
      navigationHide
      toolsHide
      breadcrumbs={[]}
      contentType="default"
      content={
        <ContentLayout header={<Header variant="h1">Cloudscape Design System Demos</Header>}>
          <Box margin={{ bottom: 'l' }}>
            <Header variant="h2">Welcome!</Header>
            <Box variant="p">
              Explore a collection of Cloudscape Design System demo pages. Each demo showcases a different pattern or component. Click a card to view the example.
            </Box>
          </Box>
          <Grid gridDefinition={[{ colspan: { default: 12, xxs: 12, xs: 6, s: 4, m: 3, l: 3, xl: 2 } }]}> 
            {demos.map(demo => (
              <div
                key={demo.route}
                style={{ border: '1px solid #e9ebed', borderRadius: 8, background: '#fff' }}
              >
                <Box padding="s" margin="s" variant="div">
                  <Header variant="h3">
                    <Link href={demo.route}>{demo.title}</Link>
                  </Header>
                  <Box variant="p">{demo.description}</Box>
                </Box>
              </div>
            ))}
          </Grid>
        </ContentLayout>
      }
    />
  );
} 