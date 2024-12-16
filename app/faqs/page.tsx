import { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "FAQs | Our Platform",
  description: "Find answers to frequently asked questions about our platform.",
};

export default function FAQsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is Our Platform?</AccordionTrigger>
          <AccordionContent>
            Our Platform is a comprehensive solution for data collection, report
            submission, and analytics. It helps organizations streamline their
            reporting processes and gain valuable insights from their data.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How do I create an account?</AccordionTrigger>
          <AccordionContent>
            To create an account, click on the "Sign Up" button in the top right
            corner of the homepage. Follow the prompts to enter your information
            and verify your email address.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is my data secure?</AccordionTrigger>
          <AccordionContent>
            Yes, we take data security very seriously. We use industry-standard
            encryption and security measures to protect your data. For more
            information, please refer to our Privacy Policy.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>How can I submit a report?</AccordionTrigger>
          <AccordionContent>
            Once you're logged in, navigate to the "Submit Report" page from
            your dashboard. Fill out the required fields and submit the form.
            You'll receive a confirmation once your report is processed.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>Can I export my data?</AccordionTrigger>
          <AccordionContent>
            Yes, you can export your data in various formats including CSV and
            PDF. Look for the export option in your report dashboard or contact
            our support team for assistance.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
