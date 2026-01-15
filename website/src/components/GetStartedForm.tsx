"use client";
import { Alert, Box, Container, TextField, Typography } from "@mui/material";
import Recaptcha from "components/Recaptcha";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import Form from "shared/components/Form/Form";
import LoadingButton from "shared/components/Form/LoadingButton";
import Select from "shared/components/Form/Select";

const planOptions = [
  "Free Self-Managed (on-prem)",
  "Enterprise Self-Managed (on-prem)",
  "Enterprise SaaS",
  "Please specify (other)",
];

const queryKeys = {
  "free-self-managed": 0,
  "enterprise-self-managed": 1,
  "enterprise-saas": 2,
  other: 3,
};

interface IGetStartedForm {
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  plan: string;
  body: string;
}

const unexpectedErrorMessage =
  "We're sorry but something seems to have gone wrong. Please try again or reach out to us directly at support@locust.cloud";

export const metadata = {
  title: "Get Started",
  description:
    "Get in touch with us! Choose a plan to get started with locust cloud today!",
};

function PlanSelect() {
  const searchParams = useSearchParams();
  const planFromUrl = searchParams.get("plan") as keyof typeof queryKeys | null;
  const selectedPlan =
    planFromUrl && planFromUrl in queryKeys
      ? planOptions[queryKeys[planFromUrl]]
      : planOptions[0];

  return (
    <Select
      defaultValue={selectedPlan}
      label="How do you want to run Locust"
      name="plan"
      options={planOptions}
    />
  );
}

export default function GetStartedForm() {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<boolean>();

  const onSubmit = async ({
    firstName,
    lastName,
    plan,
    body,
    ...inputData
  }: IGetStartedForm) => {
    setIsLoading(true);
    if (!window.grecaptcha) {
      setErrorMessage("Recaptcha verification failed, please try again.");
      return;
    }

    const name = firstName + " " + lastName;
    const message = `From locust.cloud, customer requesting ${plan}, additional details: ${body}`;

    const token = await window.grecaptcha.executeAsync();

    fetch("https://api.locust.cloud/1/customer/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...inputData,
        name,
        message,
        tag: "website_plan_info",
        recaptcha_token: token,
      }),
    })
      .then((response) => {
        if (response.status >= 400) {
          setIsLoading(false);
          setErrorMessage(unexpectedErrorMessage);
        } else {
          setSuccess(true);
          setIsLoading(false);
        }
      })
      .catch(() => {
        setIsLoading(false);
        setErrorMessage(unexpectedErrorMessage);
      });
  };

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Typography sx={{ mb: 4 }} variant="h4" component="h1">
        Start{" "}
        <Typography
          component="span"
          variant="h4"
          sx={{ color: "var(--mui-palette-accent)" }}
        >
          Load Testing
        </Typography>{" "}
        the Easy Way
      </Typography>
      <Typography sx={{ mb: 4 }} variant="h5" component="h2">
        Tell us about your use case
      </Typography>
      <Box
        sx={{
          border: "1px solid",
          borderColor: "primary.main",
          p: { xs: 3, md: 6 },
          borderRadius: 4,
        }}
      >
        {success ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "center",
              height: 400,
            }}
          >
            <Typography sx={{ mb: 2 }} variant="h4" component="h4">
              Thanks for reaching out!
            </Typography>
            <Typography variant="h5" component="h4">
              {"You'll hear back from us soon"}
            </Typography>
          </Box>
        ) : (
          <Form onSubmit={onSubmit}>
            <Suspense
              fallback={
                <Select
                  label="How do you want to run Locust"
                  name="plan"
                  options={planOptions}
                />
              }
            >
              <PlanSelect />
            </Suspense>
            <Box sx={{ display: "flex", width: "100%", columnGap: 4 }}>
              <TextField
                sx={{ flex: 1 }}
                label="First Name"
                name="firstName"
                required
              />
              <TextField
                sx={{ flex: 1 }}
                label="Last Name"
                name="lastName"
                required
              />
            </Box>
            <TextField label="Email" name="email" type="email" required />
            <TextField label="Company" name="company" required />
            <TextField
              label="Any additional details/requirements?"
              name="body"
            />
            {!!errorMessage && <Alert severity="error">{errorMessage}</Alert>}

            <LoadingButton
              isLoading={isLoading}
              type="submit"
              variant="contained"
            >
              Get in Touch
            </LoadingButton>
            <Recaptcha />
          </Form>
        )}
      </Box>
    </Container>
  );
}
