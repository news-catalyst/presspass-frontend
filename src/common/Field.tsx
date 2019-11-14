import React from "react";

export interface FieldProps {
  label?: string;
  help?: string;
  errors?: string[];
  children?: React.ReactNode;
}

const Field: React.FC<FieldProps> = props => {
  return (
    <div className="field">
      <label className="label">{props.label}</label>
      <div className="control">{props.children}</div>
      <p className="help is-danger">{props.errors}</p>
      <p className="help">{props.help}</p>
    </div>
  );
};

export default Field;