import Svg, { Path, SvgProps } from "react-native-svg";

export function HashIcon({ size = 20, color = "#64748B", ...props }: SvgProps & { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path d="M4 9h16M4 15h16M10 3L8 21M16 3l-2 18" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function TagIcon({ size = 20, color = "#64748B", ...props }: SvgProps & { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path d="M12 2H2v10l9.29 9.29a3 3 0 004.24 0l5.76-5.76a3 3 0 000-4.24L12 2z" stroke={color} strokeWidth={2} />
      <Path d="M7 7h.01" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function DollarIcon({ size = 20, color = "#64748B", ...props }: SvgProps & { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path d="M12 2v20M17 5H9.5A3.5 3.5 0 006 8.5 3.5 3.5 0 009.5 12H14a3.5 3.5 0 010 7h-5" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function BarIcon({ size = 20, color = "#64748B", ...props }: SvgProps & { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path d="M18 20V10" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Path d="M12 20V4" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Path d="M6 20v-6" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function ImageIcon({ size = 28, color = "#64748B", ...props }: SvgProps & { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z" stroke={color} strokeWidth={2} />
      <Path d="M8.5 10a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" stroke={color} strokeWidth={2} />
      <Path d="M21 15l-5-5L5 21" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
