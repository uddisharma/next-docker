import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Welcome to Our Platform",
  description:
    "Discover how our platform can help you manage and analyze your data effectively.",
};

export default function LandingPage1() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Transform Your Data Management
            </h1>
            <p className="text-xl mb-8">
              Streamline your reporting process and gain valuable insights with
              our powerful platform.
            </p>
            <Link href="/auth/signup">
              <Button size="lg" variant="secondary">
                Get Started
              </Button>
            </Link>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Key Features
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">
                  Easy Report Submission
                </h3>
                <p>
                  Submit reports quickly and efficiently through our
                  user-friendly interface.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">
                  Advanced Analytics
                </h3>
                <p>
                  Gain deep insights from your data with our powerful analytics
                  tools.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">
                  Secure Data Storage
                </h3>
                <p>
                  Rest easy knowing your data is protected with state-of-the-art
                  security measures.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-100 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Ready to Get Started?</h2>
            <Link href="/auth/signup">
              <Button size="lg">Sign Up Now</Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
