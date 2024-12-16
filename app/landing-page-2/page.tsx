import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Revolutionize Your Data Management | Our Platform",
  description:
    "Experience the future of data management and analytics with our cutting-edge platform.",
};

export default function LandingPage2() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Revolutionize Your Data Management
            </h1>
            <p className="text-xl mb-8">
              Harness the power of advanced analytics and streamlined reporting
              with our innovative platform.
            </p>
            <Link href="/auth/signup">
              <Button size="lg" variant="secondary">
                Start Your Free Trial
              </Button>
            </Link>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Why Choose Us?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Intuitive Interface
                </h3>
                <p>
                  Our user-friendly platform ensures a smooth experience for all
                  users, regardless of technical expertise.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Real-time Insights
                </h3>
                <p>
                  Get instant access to critical data insights, enabling faster
                  and more informed decision-making.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Customizable Reports
                </h3>
                <p>
                  Create tailored reports that meet your specific needs and
                  requirements.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Scalable Solution
                </h3>
                <p>
                  Our platform grows with your business, accommodating
                  increasing data volumes and complexity.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-100 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Join Thousands of Satisfied Users
            </h2>
            <p className="text-xl mb-8">
              Experience the difference our platform can make for your
              organization.
            </p>
            <Link href="/auth/signup">
              <Button size="lg">Get Started Today</Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
