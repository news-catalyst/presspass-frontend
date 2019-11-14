import React from 'react';
import { AppProps } from '../store';
import { Link } from 'react-router-dom';

interface OrganizationPageProps extends AppProps {
  id: string;
}

export const OrganizationPage = (props: OrganizationPageProps) => {
  return (
    <p>Organization page (id {props.id}) (<Link to={`./${props.id}/manage`}>manage</Link>)</p>
  )
}