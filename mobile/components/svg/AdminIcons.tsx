import Svg, { Path, Rect, SvgProps } from "react-native-svg";

export function RoomIcon({ size = 22, color = "#059669", ...props }: SvgProps & { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 512 512" fill={color} {...props}>
      <Path d="M440 424V88H352V13.005L88 58.522V424H16v32h86.9L352 490.358V120h56V456h88V424ZM320 453.642 120 426.056V85.478L320 51Z" />
      <Rect width={32} height={64} x={256} y={232} />
    </Svg>
  );
}

export function GearIcon({ size = 22, color = "#059669", ...props }: SvgProps & { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M12 15a3 3 0 100-6 3 3 0 000 6z"
        stroke={color}
        strokeWidth={2}
      />
      <Path
        d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"
        stroke={color}
        strokeWidth={2}
      />
    </Svg>
  );
}

export function ChartIcon({ size = 22, color = "#059669", ...props }: SvgProps & { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path d="M18 20V10" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Path d="M12 20V4" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Path d="M6 20v-6" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function StarIcon({ size = 22, color = "#059669", ...props }: SvgProps & { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.86L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function InfoIcon({ size = 22, color = "#059669", ...props }: SvgProps & { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
        stroke={color}
        strokeWidth={2}
      />
      <Path d="M12 16v-4" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Path d="M12 8h.01" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function UserGroupIcon({ size = 22, color = "#059669", ...props }: SvgProps & { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.5} {...props}>
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
      />
    </Svg>
  );
}

export function LogoutIcon({ size = 22, color = "#059669", ...props }: SvgProps & { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Path d="M16 17l5-5-5-5" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M21 12H9" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function HelpCenterIcon({ size = 22, color = "#059669", ...props }: SvgProps & { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill={color} {...props}>
      <Path d="M16 2C9.4 2 4 7.4 4 14v3c0 2.8 2.2 5 5 5 .6 0 1-.4 1-1v-8c0-.6-.4-1-1-1-1.1 0-2.1.4-2.9 1 .5-5 4.8-9 9.9-9s9.4 3.9 9.9 9c-.8-.6-1.8-1-2.9-1-.6 0-1 .4-1 1v8c0 .6.4 1 1 1 .6 0 1.3-.1 1.8-.4-1.1 2-2.8 3.6-4.9 4.5-.2-1.2-1.2-2.2-2.5-2.2-1.3 0-2.4 1.1-2.4 2.4 0 .7.3 1.4.9 1.9.5.4 1 .6 1.6.6h.4C23.6 28 28 22.9 28 17v-3C28 7.4 22.6 2 16 2z" />
    </Svg>
  );
}
