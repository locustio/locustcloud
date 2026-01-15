import { ChangeEvent, FocusEvent, useEffect, useState } from "react";
import { Box, Input, Link, Typography } from "@mui/material";

interface IFinalPrice {
  vuh: number;
  price: string | number | undefined;
}

const freeTier = {
  price: "$0 / month",
  name: "Free",
  key: "free",
};

const premiumPlan = {
  price: "$399 / month",
  name: "Premium",
  key: "premium",
};

const namedPlansMap = {
  200: freeTier,
  5000: premiumPlan,
};

const getPrice = (vuh: number | keyof typeof namedPlansMap, rps: number) => {
  if (namedPlansMap[vuh as keyof typeof namedPlansMap]) {
    return namedPlansMap[vuh as keyof typeof namedPlansMap].price;
  }

  if (vuh <= 200 && rps <= 100) {
    return freeTier.price;
  }

  return vuh <= 5000 && rps <= 1000 ? premiumPlan.price : undefined;
};

const calculateQuote = (
  rps: number,
  lengthOfTests: number,
  frequencyOfTests: number
) => {
  const vuh = Math.round(rps * (lengthOfTests / 60) * frequencyOfTests);

  return {
    vuh,
    price: getPrice(vuh, rps),
  };
};

const handleInputBlur = ({ target }: FocusEvent<HTMLInputElement>) => {
  const value = Number(target.value);
  const min = Number(target.min);
  const max = Number(target.max);
  const step = Number(target.step);

  if (value < min) {
    return min;
  }

  if (max && value > max) {
    return max;
  }

  return Math.round(value / step) * step;
};

function NamedPlan({
  rps,
  vuh,
  onPricingRequestClick,
  callback,
}: {
  rps: number;
  vuh: number;
  onPricingRequestClick?: () => void;
  callback?: (key: string) => void;
}) {
  const namedPlan =
    namedPlansMap[vuh as keyof typeof namedPlansMap] ||
    (vuh <= 200 && rps <= 100
      ? freeTier
      : vuh <= 5000 && rps <= 1000
        ? premiumPlan
        : null);

  if (!namedPlan) {
    return (
      <Link onClick={onPricingRequestClick} sx={{ cursor: "pointer" }}>
        Pricing on request
      </Link>
    );
  }

  const { name: planName, key } = namedPlan;

  return callback ? (
    <Link sx={{ cursor: "pointer" }} onClick={() => callback(key)}>
      {planName}
    </Link>
  ) : (
    <Typography>{planName}</Typography>
  );
}

function MultiplicationSymbol() {
  return (
    <Typography
      sx={{
        mt: "auto",
        mb: { md: "auto" },
        lineHeight: { xs: 0.7, md: 0 },
        fontSize: { xs: "16px", md: "24px" },
      }}
      variant="h5"
    >
      X
    </Typography>
  );
}

export default function Calculator({
  title = "Find Your Plan",
  onPricingRequestClick,
  callback,
}: {
  title?: string;
  onPricingRequestClick: () => void;
  callback?: (key: string) => void;
}) {
  const [rps, setRps] = useState<string | number>(100);
  const [lengthOfTest, setLengthOfTest] = useState<string | number>(15);
  const [frequencyOfTests, setFrequencyOfTests] = useState<string | number>(2);
  const [finalCalculations, setFinalCalculations] = useState<IFinalPrice>(
    {} as IFinalPrice
  );

  useEffect(() => {
    const currentRps = Number(rps);
    const currentLengthOfTests = Number(lengthOfTest);
    const currentFrequencyOfTests = Number(frequencyOfTests);
    if (
      currentRps >= 1 &&
      currentRps <= 1000000 &&
      currentLengthOfTests >= 1 &&
      currentFrequencyOfTests >= 1
    ) {
      setFinalCalculations(
        calculateQuote(
          currentRps,
          currentLengthOfTests,
          currentFrequencyOfTests
        )
      );
    }
  }, [rps, lengthOfTest, frequencyOfTests]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        rowGap: 3,
      }}
    >
      <Typography
        id="quote"
        sx={{ textAlign: "center", fontWeight: "bold", mb: 2 }}
        variant="h4"
      >
        {title}
      </Typography>
      <Box
        sx={{
          display: { xs: "block", md: "grid" },
          gridTemplateColumns: { xs: "1fr 18px", md: "3fr 0.8fr" },
          flexDirection: { xs: "column", md: "row" },
          columnGap: 6,
          px: { md: 8 },
          justifyContent: { md: "space-between" },
        }}
      >
        <Box
          sx={{
            display: { xs: "grid", md: "flex" },
            gridTemplateColumns: "1fr 18px",
            gap: 2,
            flexDirection: "row",
            justifyContent: { md: "space-between" },
          }}
        >
          <Box>
            <Typography gutterBottom>Number of Virtual Users</Typography>
            <Input
              inputProps={{
                step: 1,
                min: 1,
                max: 1000000,
                type: "number",
              }}
              onBlur={(event: FocusEvent<HTMLInputElement>) =>
                setRps(handleInputBlur(event))
              }
              onChange={({
                target: { value },
              }: ChangeEvent<HTMLInputElement>) => setRps(value)}
              size="small"
              sx={{ width: "100%" }}
              value={rps}
            />
          </Box>
          <MultiplicationSymbol />

          <Box>
            <Typography gutterBottom>Test Length (minutes)</Typography>
            <Input
              inputProps={{
                step: 1,
                min: 15,
                max: 1000000,
                type: "number",
              }}
              onBlur={(event: FocusEvent<HTMLInputElement>) =>
                setLengthOfTest(handleInputBlur(event))
              }
              onChange={({
                target: { value },
              }: ChangeEvent<HTMLInputElement>) => setLengthOfTest(value)}
              size="small"
              sx={{ width: "100%" }}
              value={lengthOfTest}
            />
          </Box>

          <MultiplicationSymbol />

          <Box>
            <Typography gutterBottom>Tests per Month</Typography>
            <Input
              inputProps={{
                step: 1,
                min: 1,
                max: 1000000,
                type: "number",
              }}
              onBlur={(event: FocusEvent<HTMLInputElement>) =>
                setFrequencyOfTests(handleInputBlur(event))
              }
              onChange={({
                target: { value },
              }: ChangeEvent<HTMLInputElement>) => setFrequencyOfTests(value)}
              size="small"
              sx={{ width: "100%" }}
              value={frequencyOfTests}
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            columnGap: 4,
            flexDirection: { xs: "column", md: "row" },
            mt: { xs: 2, md: 0 },
            rowGap: 1,
            textAlign: "left",
          }}
        >
          <Typography
            sx={{
              mt: "auto",
              mb: { md: "auto" },
              lineHeight: { xs: 0.7, md: 0 },
              fontSize: { xs: "16px", md: "24px" },
            }}
            variant="h5"
          >
            =
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>
              {finalCalculations.vuh} VUh
            </Typography>
            <Box
              sx={{
                display: "flex",
                columnGap: 1,
                flexDirection: { md: "column" },
              }}
            >
              <Typography sx={{ fontWeight: "bold" }}>
                {finalCalculations.price}
              </Typography>
              <NamedPlan
                rps={Number(rps)}
                onPricingRequestClick={onPricingRequestClick}
                vuh={finalCalculations.vuh}
                callback={callback}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
