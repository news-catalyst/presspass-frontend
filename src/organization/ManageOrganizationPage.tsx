import React from 'react';
import { AppProps } from '../store';
import { Link } from 'react-router-dom';

interface ManageOrganizationPageProps extends AppProps {
  id: string;
}

export const ManageOrganizationPage = (props: ManageOrganizationPageProps) => {
  return (
    <p>Manage organization page (id {props.id}) (<Link to=".">view</Link>)</p>
  )
}