import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function FAQ() {
  const faqs = [
    {
      question: "What is Locust Cloud?",
      answer:
        "Locust Cloud is the most flexible and powerful load testing out there. Unlike other load testing platforms that lock you into using a proprietary format, Locust let's you define your load tests in plain Python code.",
    },
    {
      question: "How do I get started?",
      answer:
        "Sign up for an account to get started! After getting access to our dashboard, you can then choose to go the 'code' route by running tests from the CLI, or use the UI to build a test right from the browser!",
    },
    {
      question: "Do I need a credit card?",
      answer:
        "Nope! Locust Cloud offers a free tier with a small amount of free compute every month for hobbyists or for companies wanting to trial the platform before upgrading.",
    },
    {
      question: "What type of services can I test with Locust Cloud?",
      answer:
        "Anything! Locust has gained so much popularity owing to it's flexibility. With Locust Cloud you can load test just about any service you can think about, with many extensions already existing. Additionally, any Python libraries may be imported into your load tests, making the possibilites limitless.",
    },
  ];

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Frequently Asked Questions
      </Typography>

      {faqs.map(({ question, answer }, index) => (
        <Accordion key={`faq-${index}`} sx={{ mb: 1 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`faq-content-${index}`}
            id={`faq-header-${index}`}
          >
            <Typography variant="h6">{question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">{answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
}
