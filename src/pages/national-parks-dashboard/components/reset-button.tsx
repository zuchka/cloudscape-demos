// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useState } from 'react';

import Button from '@cloudscape-design/components/button';
import Modal from '@cloudscape-design/components/modal';
import SpaceBetween from '@cloudscape-design/components/space-between';

interface ResetButtonProps {
  onReset: () => void;
  children: React.ReactNode;
}

export function ResetButton({ onReset, children }: ResetButtonProps) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button onClick={() => setVisible(true)} iconName="refresh">
        {children}
      </Button>
      <Modal
        visible={visible}
        onDismiss={() => setVisible(false)}
        header="Reset dashboard layout"
        closeAriaLabel="Close modal"
        footer={
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="link" onClick={() => setVisible(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                onReset();
                setVisible(false);
              }}
            >
              Reset dashboard
            </Button>
          </SpaceBetween>
        }
      >
        Are you sure you want to reset dashboard to the default layout? Your current layout will be discarded.
      </Modal>
    </>
  );
}
