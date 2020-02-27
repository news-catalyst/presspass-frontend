import React from "react";
import { Organization } from "../store/organizations/types";
import { Link } from "react-router-dom";

interface OrganizationCardProps {
  organization: Organization;
}

const OrganizationCard: React.FC<OrganizationCardProps> = (props: OrganizationCardProps) => {
  let organization = props.organization;
  return (
    <Link className="box" to={"/organizations/" + organization.uuid}>
      <h5 className="title is-size-5">{organization.name}</h5>
      <div className="field is-grouped is-grouped-multiline">
        <div className="control">
          <div className="tags has-addons">
            <span className="tag is-dark">Organization ID</span>
            <span className="tag is-primary">{organization.uuid}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OrganizationCard;