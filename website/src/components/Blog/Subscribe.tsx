"use client";
import { Alert, TextField, Typography, Button, Box } from "@mui/material";
import Modal from "components/Modal";
import { useState } from "react";
import Form from "components/Form/Form";
import LoadingButton from "components/Form/LoadingButton";

const unexpectedErrorMessage =
  "We're sorry but something seems to have gone wrong. Please try again.";

export default function Subscribe() {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<boolean>();

  const onSubmit = (inputData: { email: string }) => {
    setIsLoading(true);

    if (errorMessage) {
      setErrorMessage("");
    }

    fetch("https://api.locust.cloud/1/customer/newsletter-signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputData),
    })
      .then((response) => {
        if (response.status >= 400) {
          setIsLoading(false);
          setErrorMessage(unexpectedErrorMessage);
        }
        return response.json();
      })
      .then((jsonResponse) => {
        if (jsonResponse.duplicate) {
          setErrorMessage(
            "This email is already signed up for our newsletter!"
          );
        } else {
          setSuccess(true);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setErrorMessage(unexpectedErrorMessage);
      });
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{ maxWidth: 400 }}
        onClick={() => setIsOpen(true)}
      >
        Subscribe to the Locust newsletter
      </Button>
      <Modal onClose={() => setIsOpen(false)} open={isOpen}>
        {success ? (
          <Box>
            <Typography sx={{ mb: 3, mt: 1 }} variant="h6">
              {
                "Success! You're all signed up and ready to receive Locust content straight to your inbox!"
              }
            </Typography>
          </Box>
        ) : (
          <>
            <Typography>Enjoying this content?</Typography>
            <Typography>
              Subscribe to our newsletter to receive performance testing tips!
            </Typography>
            <Form onSubmit={onSubmit}>
              <TextField label="Email" name="email" type="email" required />
              {!!errorMessage && <Alert severity="error">{errorMessage}</Alert>}
              <LoadingButton
                isLoading={isLoading}
                type="submit"
                variant="contained"
              >
                Subscribe
              </LoadingButton>
            </Form>
          </>
        )}
      </Modal>
    </>
  );
}
