import Header from "@/components/header";
import Footer from "@/components/footer";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="container mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

        <div className="prose max-w-none">
          <p className="text-lg mb-6">Last updated: May 6, 2024</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Introduction</h2>
          <p>
            Copora ("we", "our", or "us") respects your privacy and is committed
            to protecting your personal data. This privacy policy will inform
            you about how we look after your personal data when you visit our
            website and tell you about your privacy rights and how the law
            protects you.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            The Data We Collect About You
          </h2>
          <p>
            Personal data, or personal information, means any information about
            an individual from which that person can be identified. We may
            collect, use, store and transfer different kinds of personal data
            about you which we have grouped together as follows:
          </p>
          <ul className="list-disc pl-6 my-4">
            <li>
              <strong>Identity Data</strong> includes first name, last name,
              username or similar identifier.
            </li>
            <li>
              <strong>Contact Data</strong> includes email address and telephone
              numbers.
            </li>
            <li>
              <strong>Technical Data</strong> includes internet protocol (IP)
              address, your login data, browser type and version, time zone
              setting and location, browser plug-in types and versions,
              operating system and platform, and other technology on the devices
              you use to access this website.
            </li>
            <li>
              <strong>Usage Data</strong> includes information about how you use
              our website and services.
            </li>
            <li>
              <strong>Marketing and Communications Data</strong> includes your
              preferences in receiving marketing from us and our third parties
              and your communication preferences.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            How We Use Your Personal Data
          </h2>
          <p>
            We will only use your personal data when the law allows us to. Most
            commonly, we will use your personal data in the following
            circumstances:
          </p>
          <ul className="list-disc pl-6 my-4">
            <li>
              Where we need to perform the contract we are about to enter into
              or have entered into with you.
            </li>
            <li>
              Where it is necessary for our legitimate interests (or those of a
              third party) and your interests and fundamental rights do not
              override those interests.
            </li>
            <li>Where we need to comply with a legal obligation.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Cookies</h2>
          <p>
            Our website uses cookies to distinguish you from other users of our
            website. This helps us to provide you with a good experience when
            you browse our website and also allows us to improve our site.
          </p>
          <p>
            A cookie is a small file of letters and numbers that we store on
            your browser or the hard drive of your computer if you agree.
            Cookies contain information that is transferred to your computer's
            hard drive.
          </p>
          <p>We use the following cookies:</p>
          <ul className="list-disc pl-6 my-4">
            <li>
              <strong>Essential cookies.</strong> These are cookies that are
              required for the operation of our website. They include, for
              example, cookies that enable you to log into secure areas of our
              website.
            </li>
            <li>
              <strong>Analytical/performance cookies.</strong> They allow us to
              recognize and count the number of visitors and to see how visitors
              move around our website when they are using it. This helps us to
              improve the way our website works, for example, by ensuring that
              users are finding what they are looking for easily.
            </li>
            <li>
              <strong>Functionality cookies.</strong> These are used to
              recognize you when you return to our website. This enables us to
              personalize our content for you and remember your preferences.
            </li>
            <li>
              <strong>Targeting cookies.</strong> These cookies record your
              visit to our website, the pages you have visited and the links you
              have followed. We will use this information to make our website
              and the advertising displayed on it more relevant to your
              interests.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Data Security</h2>
          <p>
            We have put in place appropriate security measures to prevent your
            personal data from being accidentally lost, used or accessed in an
            unauthorized way, altered or disclosed. In addition, we limit access
            to your personal data to those employees, agents, contractors and
            other third parties who have a business need to know.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Your Legal Rights
          </h2>
          <p>
            Under certain circumstances, you have rights under data protection
            laws in relation to your personal data, including:
          </p>
          <ul className="list-disc pl-6 my-4">
            <li>Request access to your personal data</li>
            <li>Request correction of your personal data</li>
            <li>Request erasure of your personal data</li>
            <li>Object to processing of your personal data</li>
            <li>Request restriction of processing your personal data</li>
            <li>Request transfer of your personal data</li>
            <li>Right to withdraw consent</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
          <p>
            If you have any questions about this privacy policy or our privacy
            practices, please contact us at:
          </p>
          <p className="mt-2">
            <strong>Email:</strong> info@copora.com
            <br />
            <strong>Phone:</strong> +44 7742 769816
            <br />
            <strong>Address:</strong> 71-75 Shelton St London WC2H 9JQ United
            Kingdom
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
