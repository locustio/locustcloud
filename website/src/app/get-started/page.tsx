import GetStartedForm from "components/GetStartedForm";

export const metadata = {
  title: "Get Started",
  description:
    "Get in touch with us! Choose a plan to get started with locust cloud today!",
  openGraph: {
    description:
      "Get in touch with us! Choose a plan to get started with locust cloud today!",
  },
};

export default function GetStartedPage() {
  return <GetStartedForm />;
}
