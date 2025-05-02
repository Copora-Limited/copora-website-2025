import Link from "next/link";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import WhiteLogo from "./logo/WhiteLogo";

export default function Footer() {
  return (
    <footer className="w-full bg-[#032541] text-white z-20 relative">
      <div className="container mx-auto px-6 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Logo Section */}
          <div>
            <Link href="/" className="inline-block">
              <div
                className="text-white text-2xl font-bold"
                style={{ fontFamily: "var(--font-bold)" }}
              >
                <WhiteLogo />
              </div>
              <p
                className="text-gray-400 text-sm mt-2"
                style={{ fontFamily: "var(--font-regular)" }}
              >
                Empowering businesses with flexible, cost-effective, and
                scalable staffing solutions.
              </p>
            </Link>
          </div>

          {/* Client Services Section */}
          <div className="space-y-4">
            <h3
              className="text-lg font-bold"
              style={{ fontFamily: "var(--font-bold)" }}
            >
              Client Services
            </h3>
            <ul
              className="space-y-3 text-sm"
              style={{ fontFamily: "var(--font-regular)" }}
            >
              <li>
                <Link
                  href="/client-service/permanent-staffing"
                  className="hover:text-[#0AB5B5] transition-colors"
                >
                  Permanent Staffing
                </Link>
              </li>
              <li>
                <Link
                  href="/client-service/high-volume-hourly-rating"
                  className="hover:text-[#0AB5B5] transition-colors"
                >
                  High Volume Hourly Rating
                </Link>
              </li>
              <li>
                <Link
                  href="/client-service/talent-workforce"
                  className="hover:text-[#0AB5B5] transition-colors"
                >
                  Talent Workforce
                </Link>
              </li>
              <li>
                <Link
                  href="/client-service/early-stage-professional"
                  className="hover:text-[#0AB5B5] transition-colors"
                >
                  Early Stage Professional
                </Link>
              </li>
              <li>
                <Link
                  href="/client-service/assessment"
                  className="hover:text-[#0AB5B5] transition-colors"
                >
                  Assessment
                </Link>
              </li>
            </ul>
          </div>

          {/* Candidate Services Section */}
          <div className="space-y-4">
            <h3
              className="text-lg font-bold"
              style={{ fontFamily: "var(--font-bold)" }}
            >
              Candidate Services
            </h3>
            <ul
              className="space-y-3 text-sm"
              style={{ fontFamily: "var(--font-regular)" }}
            >
              <li>
                <Link
                  href="/candidate-service/temporary-worker"
                  className="hover:text-[#0AB5B5] transition-colors"
                >
                  Temporary Worker
                </Link>
              </li>
              <li>
                <Link
                  href="/candidate-service/temporary-worker-system"
                  className="hover:text-[#0AB5B5] transition-colors"
                >
                  Temporary Worker System
                </Link>
              </li>
              <li>
                <Link
                  href="/candidate-service/permanent-workers"
                  className="hover:text-[#0AB5B5] transition-colors"
                >
                  Permanent Workers
                </Link>
              </li>
              <li>
                <Link
                  href="/career-education"
                  className="hover:text-[#0AB5B5] transition-colors"
                >
                  Career Education
                </Link>
              </li>
            </ul>
          </div>

          {/* Others Section */}
          <div className="space-y-4">
            <h3
              className="text-lg font-bold"
              style={{ fontFamily: "var(--font-bold)" }}
            >
              Others
            </h3>
            <ul
              className="space-y-3 text-sm"
              style={{ fontFamily: "var(--font-regular)" }}
            >
              <li>
                <Link
                  href="/blog"
                  className="hover:text-[#0AB5B5] transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/find-jobs"
                  className="hover:text-[#0AB5B5] transition-colors"
                >
                  Find Job
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#0AB5B5] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#0AB5B5] transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-700 pt-8 md:flex-row">
          <p
            className="text-sm text-gray-400"
            style={{ fontFamily: "var(--font-regular)" }}
          >
            © {new Date().getFullYear()} Copora. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/company/coporagroup/"
              className="text-gray-400 hover:text-[#0AB5B5] transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a
              href="https://www.facebook.com/CoporaGlobalRecruitment/"
              className="text-gray-400 hover:text-[#0AB5B5] transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </a>
            <a
              href="https://www.instagram.com/copora_recruitment/"
              className="text-gray-400 hover:text-[#0AB5B5] transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
