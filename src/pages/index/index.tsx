// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// This component will redirect from root route (/) to the National Parks Dashboard
export default function RootRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the National Parks Dashboard
    navigate('/national-parks-dashboard', { replace: true });
  }, [navigate]);

  // Return a loading indicator while redirecting
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>Loading National Parks Dashboard...</div>
    </div>
  );
}
