import { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works | Our Platform",
  description: "Learn how our platform works and how it can benefit you.",
};

export default function HowItWorksPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">How It Works</h1>
      <div className="space-y-4">
        <section>
          <h2 className="text-2xl font-semibold mb-2">1. Sign Up</h2>
          <p>Create your account in just a few simple steps.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-2">
            2. Create Your Profile
          </h2>
          <p>Fill out your profile with relevant information.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-2">3. Submit Reports</h2>
          <p>Easily submit reports through our user-friendly interface.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-2">4. Get Insights</h2>
          <p>Receive valuable insights based on your submitted reports.</p>
        </section>
      </div>
    </div>
  );
}
