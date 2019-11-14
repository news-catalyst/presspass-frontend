import React from 'react';
import { AppActions } from '../store';

interface EntitlementsListProps {
  actions: AppActions;
}

const EntitlementsList: React.FC<EntitlementsListProps> = (
  props: EntitlementsListProps
) => {
  return (
    <p>Entitlements List</p>
  )
}

export default EntitlementsList;
