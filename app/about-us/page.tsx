import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Our Platform",
  description: "Learn more about our company and our mission.",
};

export default function AboutUsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About Us</h1>
      <div className="space-y-4">
        <p>
          We are a dedicated team of professionals committed to providing
          innovative solutions for data collection and analysis. Our platform
          aims to simplify the process of submitting and managing reports,
          making it easier for organizations to gain valuable insights from
          their data.
        </p>
        <p>
          Founded in 2023, our company has quickly grown to become a leader in
          the field of data management and analytics. We serve clients across
          various industries, helping them make informed decisions based on
          accurate and timely information.
        </p>
        <p>
          Our mission is to empower organizations with the tools they need to
          harness the power of their data, driving growth and innovation in an
          increasingly data-driven world.
        </p>
      </div>
    </div>
  );
}
