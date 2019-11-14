import React from 'react';
import { AppActions } from '../store';

interface EntitlementsListProps {
  actions: AppActions;
}

export const EntitlementsList: React.FC<EntitlementsListProps> = (
  props: EntitlementsListProps
) => {
  return (
    <p>Entitlements List</p>
  )
}
