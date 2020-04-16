import React from "react";
import { ArchieState } from '../store/archie/types';

interface ToolbuilderProps {
  archie: ArchieState;
}
const ToolbuilderPitch: React.FC<ToolbuilderProps> = (
  props: ToolbuilderProps
) => {
  return (
    <>
      <p>{props.archie.copy.toolbuilder.description}</p>
      <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSc3f7KZ0MennmLIPHuIGKvPmj3TvQ2p0n3H0jEBt4i_pEn7-Q/viewform?embedded=true" width="640" height="1003">Loading…</iframe>
    </>
  );
};

export default ToolbuilderPitch;
