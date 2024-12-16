import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | Our Platform",
  description: "Read our terms and conditions for using our platform.",
};

export default function TermsAndConditionsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      <div className="space-y-4">
        <p>
          Welcome to Our Platform. By accessing or using our service, you agree
          to be bound by these Terms and Conditions.
        </p>
        <h2 className="text-2xl font-semibold">1. Use of the Service</h2>
        <p>
          You must use our service only for lawful purposes and in accordance
          with these Terms. You agree not to use the service in any way that
          violates any applicable local, state, national, or international law
          or regulation.
        </p>
        <h2 className="text-2xl font-semibold">2. User Accounts</h2>
        <p>
          When you create an account with us, you must provide information that
          is accurate, complete, and current at all times. Failure to do so
          constitutes a breach of the Terms, which may result in immediate
          termination of your account on our service.
        </p>
        <h2 className="text-2xl font-semibold">3. Intellectual Property</h2>
        <p>
          The service and its original content, features, and functionality are
          and will remain the exclusive property of Our Platform and its
          licensors. The service is protected by copyright, trademark, and other
          laws of both the United States and foreign countries.
        </p>
        <h2 className="text-2xl font-semibold">4. Termination</h2>
        <p>
          We may terminate or suspend your account immediately, without prior
          notice or liability, for any reason whatsoever, including without
          limitation if you breach the Terms.
        </p>
        <h2 className="text-2xl font-semibold">5. Limitation of Liability</h2>
        <p>
          In no event shall Our Platform, nor its directors, employees,
          partners, agents, suppliers, or affiliates, be liable for any
          indirect, incidental, special, consequential or punitive damages,
          including without limitation, loss of profits, data, use, goodwill, or
          other intangible losses, resulting from your access to or use of or
          inability to access or use the service.
        </p>
        <h2 className="text-2xl font-semibold">6. Changes</h2>
        <p>
          We reserve the right, at our sole discretion, to modify or replace
          these Terms at any time. What constitutes a material change will be
          determined at our sole discretion.
        </p>
      </div>
    </div>
  );
}
