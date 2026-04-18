import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
import { IconProps } from "./types";

const ArrowLeftIcon = (props:IconProps) => (
  <Svg
    viewBox="0 0 24 24"
    fill="none"
    height={props.size || 20}
    width={props.size || 20}
    {...props}
  >
    <G id="SVGRepo_bgCarrier" strokeWidth={0} />
    <G
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <G id="SVGRepo_iconCarrier">
      <Path
        d="M20 12H4M4 12L10 6M4 12L10 18"
        stroke={props.color || "#000000"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);

export default ArrowLeftIcon;
