import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Our Platform",
  description: "Read our privacy policy to understand how we handle your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <div className="space-y-4">
        <p>
          At Our Platform, we take your privacy seriously. This Privacy Policy
          explains how we collect, use, disclose, and safeguard your information
          when you visit our website or use our service.
        </p>
        <h2 className="text-2xl font-semibold">Information We Collect</h2>
        <p>
          We collect information that you provide directly to us, such as when
          you create an account, submit a report, or contact us for support.
        </p>
        <h2 className="text-2xl font-semibold">How We Use Your Information</h2>
        <p>
          We use the information we collect to provide, maintain, and improve
          our services, to process your requests, and to communicate with you.
        </p>
        <h2 className="text-2xl font-semibold">
          Information Sharing and Disclosure
        </h2>
        <p>
          We do not share your personal information with third parties except as
          described in this policy.
        </p>
        <h2 className="text-2xl font-semibold">Data Security</h2>
        <p>
          We use appropriate technical and organizational measures to protect
          the personal information that we collect and process about you.
        </p>
        <h2 className="text-2xl font-semibold">Your Rights</h2>
        <p>
          You have the right to access, update, or delete your personal
          information at any time.
        </p>
        <h2 className="text-2xl font-semibold">Changes to This Policy</h2>
        <p>
          We may update this privacy policy from time to time. We will notify
          you of any changes by posting the new privacy policy on this page.
        </p>
      </div>
    </div>
  );
}
