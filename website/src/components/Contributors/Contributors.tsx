import { Box, Typography } from "@mui/material";
import { sanityFetch, urlFor } from "sanity/client";
import { IContributor } from "./contributor.types";
import ContributorCards from "components/Contributors/ContributorCards";

const CONTRIBUTOR_CARDS_QUERY = `*[_type == "contributorCards"][0] {
  "cloudTeam": cloudTeam[]->{
    _id,
    handle,
    name,
    image,
    role
  },
  "openSourceTeam": openSourceTeam[]->{
    _id,
    handle,
    name,
    image,
    role
  }
}`;

export default async function Contributors() {
  const contributorCards = await sanityFetch<{
    cloudTeam: IContributor[];
    openSourceTeam: IContributor[];
  }>(CONTRIBUTOR_CARDS_QUERY);

  const cloudTeamCards = contributorCards.cloudTeam.map(
    ({ image, ...props }) => ({
      ...props,
      imageUrl: urlFor(image)?.width(100).height(100).url(),
    })
  );
  const openSourceTeamCards = contributorCards.openSourceTeam.map(
    ({ image, ...props }) => ({
      ...props,
      imageUrl: urlFor(image)?.width(100).height(100).url(),
    })
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", rowGap: 4 }}>
      <Box>
        <Typography
          fontWeight={500}
          variant="h4"
          sx={{ color: "var(--mui-palette-accent)", mb: 4 }}
        >
          Cloud Team
        </Typography>
        <ContributorCards cards={cloudTeamCards} />
      </Box>

      <Box>
        <Typography
          fontWeight={500}
          sx={{ color: "var(--mui-palette-accent)", mb: 4 }}
          variant="h4"
        >
          Open-source Contributors
        </Typography>
        <ContributorCards
          sx={{ gridTemplateColumns: { md: "repeat(3, 1fr)" } }}
          cards={openSourceTeamCards}
        />
      </Box>
    </Box>
  );
}
