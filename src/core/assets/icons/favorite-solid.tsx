import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
import { IconProps } from "./types";
const FavoriteSolid = (props:IconProps) => (
  <Svg
    fill={props.color ||"#ff0000"}
    height={props.size || "200px"}
    width={props.size || "200px"}
    x="0px"
    y="0px"
    viewBox="0 0 24 24"
    stroke={props.color ||"#ff0000"}
    {...props}
  >
    <G id="SVGRepo_bgCarrier" strokeWidth={0} />
    <G
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <G id="SVGRepo_iconCarrier">
      <G id="Favorite-Filled">
        <Path d="M12,22C9.63,20.17,1,13.12,1,7.31C1,4.38,3.47,2,6.5,2c1.9,0,3.64,0.93,4.65,2.48L12,5.78l0.85-1.3 C13.86,2.93,15.6,2,17.5,2C20.53,2,23,4.38,23,7.31C23,13.15,14.38,20.18,12,22z" />
      </G>
    </G>
  </Svg>
);
export default FavoriteSolid;
