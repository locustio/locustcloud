import { IconTypeMap } from "@mui/material";
import * as MUIcons from "@mui/icons-material";
import PythonLogo from "assets/Python";
import OpenTelemetryLogo from "assets/OpenTelemetry";

type IconProps = IconTypeMap["props"];

interface IDynamicIconProps extends IconProps {
  name: string | undefined;
}

const extraIcons = {
  Python: PythonLogo,
  OpenTelemetry: OpenTelemetryLogo,
};

export default function DynamicIcon({ name, ...props }: IDynamicIconProps) {
  const Icon =
    MUIcons[name as keyof typeof MUIcons] ||
    extraIcons[name as keyof typeof extraIcons];

  if (Icon == null) {
    throw `There is no "${name}" Icon`;
  }

  return <Icon {...props} />;
}
