"use client";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  Paper,
  Tooltip,
} from "@mui/material";
import Button from "components/Button";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

export interface IPricing {
  _id: string;
  name: string;
  price: number;
  ctaText: string;
  ctaLink: string;
  recommended: boolean;
  features: {
    feature: {
      key: string;
      label: string;
      tooltip?: string;
    };
    value: string;
  }[];
}

interface IPlansTable {
  pricing: IPricing[];
  name: string;
}

export default function PlansTable({ pricing, name }: IPlansTable) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const renderFeatureValue = (value: string) => {
    if (value.includes("true") || value.includes("false")) {
      return value === "true" ? (
        <CheckIcon sx={{ color: "success.main" }} />
      ) : (
        <CloseIcon sx={{ color: "error.main" }} />
      );
    }
    return (
      <Typography sx={{ fontWeight: "medium" }} variant="body2">
        {value}
      </Typography>
    );
  };

  if (isMobile) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {pricing.map(({ _id, name, price, ctaText, ctaLink, features }) => (
          <Paper
            key={`${name}-mobile-plan-${_id}`}
            sx={{ p: 3, position: "relative" }}
          >
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <Typography sx={{ fontWeight: "bold", mb: 1 }} variant="h5">
                {name}
              </Typography>
              {!isNaN(Number(price)) && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "baseline",
                    gap: 0.5,
                    mb: 2,
                  }}
                >
                  <Typography
                    component="p"
                    sx={{ fontWeight: "bold" }}
                    variant="h3"
                  >
                    ${price}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    /month
                  </Typography>
                </Box>
              )}
              {!!price && isNaN(Number(price)) && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "",
                    mb: 2,
                  }}
                >
                  <Typography
                    component="p"
                    sx={{ fontWeight: "bold" }}
                    variant="h4"
                  >
                    {price}
                  </Typography>
                </Box>
              )}
              {ctaText && (
                <Button sx={{ mt: 1 }} href={ctaLink} variant={"contained"}>
                  {ctaText}
                </Button>
              )}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {features.map(({ feature: { key, label }, value }, index) => (
                <Box
                  key={`${name}-${key}-${index}-mobile`}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    columnGap: 4,
                  }}
                >
                  <Typography variant="body2">{label}</Typography>
                  <Box key={`${name}-feature-${key}-${index}`}>
                    {renderFeatureValue(value)}
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        ))}
      </Box>
    );
  }

  return (
    <TableContainer sx={{ overflow: "unset" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ verticalAlign: "bottom" }}>
              <Typography sx={{ fontWeight: "bold" }} variant="h6">
                Features
              </Typography>
            </TableCell>
            {pricing.map(
              ({ name, price, ctaText, ctaLink, recommended }, index) => (
                <TableCell
                  align="center"
                  key={`${name}-plan-header-${index}`}
                  sx={{
                    position: "relative",
                    height: 260,
                    width: `${100 / (pricing.length + 1)}%`,
                    flex: 1,
                    my: 2,
                    borderTop: recommended
                      ? `2px solid ${theme.palette.primary.main}`
                      : undefined,
                    borderRight: recommended
                      ? `2px solid ${theme.palette.primary.main}`
                      : undefined,
                    borderLeft: recommended
                      ? `2px solid ${theme.palette.primary.main}`
                      : undefined,
                  }}
                >
                  {recommended && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: -18,
                        left: 18,
                        bgcolor: "primary.main",
                        color: "white",
                        px: 2,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: "0.875rem",
                        fontWeight: "bold",
                      }}
                    >
                      Recommended
                    </Box>
                  )}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "100%",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        my: 2,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                      variant="h5"
                    >
                      {name}
                    </Typography>

                    {!isNaN(Number(price)) && (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "baseline",
                          gap: 0.5,
                          my: 1,
                        }}
                      >
                        <Typography
                          component="p"
                          sx={{ fontWeight: "bold" }}
                          variant="h4"
                        >
                          ${price}
                        </Typography>
                        <Typography color="text.secondary" variant="body1">
                          /month
                        </Typography>
                      </Box>
                    )}
                    {!!price && isNaN(Number(price)) && (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "",
                          mt: 2,
                        }}
                      >
                        <Typography
                          component="p"
                          sx={{ fontWeight: "bold" }}
                          variant="h5"
                        >
                          {price}
                        </Typography>
                      </Box>
                    )}

                    {ctaText && (
                      <Button
                        sx={{ mt: "auto", bottom: 0 }}
                        href={ctaLink}
                        variant={"contained"}
                      >
                        {ctaText}
                      </Button>
                    )}
                  </Box>
                </TableCell>
              )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {pricing[0].features.map(
            ({ feature: { key, label, tooltip } }, index) => (
              <TableRow key={`${name}-feature-label-${index}`}>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignContent: "center",
                      columnGap: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "medium",
                      }}
                      variant="body1"
                    >
                      {label}
                    </Typography>
                    {tooltip && (
                      <Tooltip
                        title={
                          <Typography variant="subtitle2">{tooltip}</Typography>
                        }
                      >
                        <HelpOutlineIcon
                          sx={{
                            color: "textSecondary",
                            height: 20,
                            my: "auto",
                          }}
                        />
                      </Tooltip>
                    )}
                  </Box>
                </TableCell>
                {pricing.map(({ features, recommended }, indexJ) => (
                  <TableCell
                    align="center"
                    key={`${name}-plan-feature-${index}-${indexJ}`}
                    sx={{
                      borderLeft: recommended
                        ? `2px solid ${theme.palette.primary.main}`
                        : undefined,
                      borderRight: recommended
                        ? `2px solid ${theme.palette.primary.main}`
                        : undefined,
                      borderBottom:
                        recommended && index === features.length - 1
                          ? `2px solid ${theme.palette.primary.main}`
                          : undefined,
                    }}
                  >
                    {features.map(
                      ({ feature, value }, index) =>
                        key === feature.key && (
                          <Box key={`${name}-feature-${key}-${index}`}>
                            {renderFeatureValue(value)}
                          </Box>
                        )
                    )}
                  </TableCell>
                ))}
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
