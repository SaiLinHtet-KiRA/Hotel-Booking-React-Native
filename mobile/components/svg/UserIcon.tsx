import Svg, { Circle, Path, SvgProps } from "react-native-svg";

export default function UserIcon({ size = 28, color = "#000", ...props }: SvgProps & { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Circle cx={12} cy={8} r={4} stroke={color} strokeWidth={2} />
      <Path
        d="M4 21c0-4.418 3.582-8 8-8s8 3.582 8 8"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}
