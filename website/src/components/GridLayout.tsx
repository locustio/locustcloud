import { Grid, Paper } from "@mui/material";
import PortableText from "components/PortableText";
import { ICmsGridModule } from "types/cmsPage.types";

export interface IGridLayoutProps {
  gridModules: ICmsGridModule[];
}

export default function GridLayout({ gridModules }: IGridLayoutProps) {
  return (
    <Grid container spacing={3}>
      {gridModules.map(({ body, width }, idx) => (
        <Grid size={{ xs: 12, md: width }} key={idx}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              height: "100%",
              borderRadius: 4,
            }}
          >
            {body && <PortableText value={body} />}
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
