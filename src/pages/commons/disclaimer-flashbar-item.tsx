// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useId } from 'react';

import { FlashbarProps } from '@cloudscape-design/components/flashbar';

export function useDisclaimerFlashbarItem(onDismiss: (id: string) => void): FlashbarProps.MessageDefinition | null {
  // Return null to disable the disclaimer flashbar
  return null;
}
