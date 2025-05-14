/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Menu } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isClientMenuOpen, setIsClientMenuOpen] = useState(false);
  const [isCandidateMenuOpen, setIsCandidateMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname(); // Get current path

  const clientMenuRef = useRef<HTMLDivElement>(null);
  const candidateMenuRef = useRef<HTMLDivElement>(null);

  // Handle scroll event to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close menus on route changes
  useEffect(() => {
    // Close all menus when the route changes
    setIsClientMenuOpen(false);
    setIsCandidateMenuOpen(false);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Helper function to determine if a link is active
  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <>
      <header
        className={`w-full py-4 px-6 flex items-center justify-between fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-white bg-opacity-95"
        }`}
      >
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/coporaLogoFooter.svg"
              alt="Copora Logo"
              width={150}
              height={50}
              priority
            />
          </Link>
        </div>

        <nav
          className="hidden md:flex items-center space-x-6"
          style={{ fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif" }}
        >
          <Link
            href="/"
            className={
              isActive("/")
                ? "text-[#0AB5B5]"
                : "text-gray-700 hover:text-[#0AB5B5]"
            }
          >
            Home
          </Link>
          <Link
            href="/about"
            className={
              isActive("/about")
                ? "text-[#0AB5B5]"
                : "text-gray-700 hover:text-[#0AB5B5]"
            }
          >
            About Us
          </Link>
          <Link
            href="/career-education"
            className={
              isActive("/career-education")
                ? "text-[#0AB5B5]"
                : "text-gray-700 hover:text-[#0AB5B5]"
            }
          >
            Career Education
          </Link>

          {/* Client Service Dropdown Trigger */}
          <div className="relative" ref={clientMenuRef}>
            <button
              className={`flex items-center ${
                isClientMenuOpen || isActive("/client-service")
                  ? "text-[#0AB5B5]"
                  : "text-gray-700 hover:text-[#0AB5B5]"
              }`}
              onMouseEnter={() => {
                setIsClientMenuOpen(true);
                setIsCandidateMenuOpen(false);
              }}
              onClick={() => {
                setIsClientMenuOpen(!isClientMenuOpen);
                setIsCandidateMenuOpen(false);
              }}
            >
              Client Service
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>

          {/* Candidate Service Dropdown Trigger */}
          <div className="relative" ref={candidateMenuRef}>
            <button
              className={`flex items-center ${
                isCandidateMenuOpen || isActive("/candidate-service")
                  ? "text-[#0AB5B5]"
                  : "text-gray-700 hover:text-[#0AB5B5]"
              }`}
              onMouseEnter={() => {
                setIsCandidateMenuOpen(true);
                setIsClientMenuOpen(false);
              }}
              onClick={() => {
                setIsCandidateMenuOpen(!isCandidateMenuOpen);
                setIsClientMenuOpen(false);
              }}
            >
              Candidate Service
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </nav>

        <div
          className="flex items-center space-x-3"
          style={{ fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif" }}
        >
          <Link
            href="/find-talent"
            className={`hidden md:inline-flex items-center justify-center px-5 py-2 border border-[#0AB5B5] rounded-full ${
              isActive("/find-talent")
                ? "bg-[#0AB5B5] text-white"
                : "text-[#0AB5B5] hover:bg-gray-50"
            }`}
          >
            Find Talent
          </Link>
          <Link
            href="/find-jobs"
            className={`hidden md:inline-flex items-center justify-center px-5 py-2 ${
              isActive("/find-jobs")
                ? "bg-[#099999]"
                : "bg-[#0AB5B5] hover:bg-[#099999]"
            } rounded-full text-white`}
          >
            Find Jobs
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Client Service Mega Menu - Full Width */}
      {isClientMenuOpen && (
        <div
          className="fixed top-[72px] left-0 w-full bg-white shadow-lg z-40 border-t border-gray-100"
          onMouseEnter={() => setIsClientMenuOpen(true)}
          onMouseLeave={() => setIsClientMenuOpen(false)}
        >
          <div className="container mx-auto px-6 py-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div>
                <h3
                  className="text-lg font-bold text-[#0a2540] uppercase mb-4"
                  style={{
                    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
                  }}
                >
                  CLIENT SERVICE
                </h3>
                <p
                  className="text-sm text-gray-600 mb-6"
                  style={{
                    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
                  }}
                >
                  At Copora, we empower your business by providing flexible,
                  cost-effective, and scalable contingent staffing solutions.
                </p>
                <div className="rounded-lg overflow-hidden">
                  <Image
                    src="/images/menu-banner-1.jpg"
                    alt="Client Service"
                    width={300}
                    height={240}
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <Link
                    href="/client-service/permanent-staffing"
                    className={`block ${
                      pathname.startsWith("/client-service/permanent-staffing")
                        ? "text-[#0AB5B5]"
                        : "text-[#0a2540] hover:text-[#0AB5B5]"
                    }`}
                  >
                    <h4
                      className="font-semibold mb-2"
                      style={{
                        fontFamily:
                          "Helvetica Neue, Helvetica, Arial, sans-serif",
                      }}
                    >
                      Permanent Staffing
                    </h4>
                    <p
                      className="text-sm text-gray-600"
                      style={{
                        fontFamily:
                          "Helvetica Neue, Helvetica, Arial, sans-serif",
                      }}
                    >
                      Full-time hiring to build long-term teams.
                    </p>
                  </Link>
                </div>

                <div>
                  <Link
                    href="/client-service/early-stage-professional"
                    className={`block ${
                      pathname.startsWith(
                        "/client-service/early-stage-professional"
                      )
                        ? "text-[#0AB5B5]"
                        : "text-[#0a2540] hover:text-[#0AB5B5]"
                    }`}
                  >
                    <h4
                      className="font-semibold mb-2"
                      style={{
                        fontFamily:
                          "Helvetica Neue, Helvetica, Arial, sans-serif",
                      }}
                    >
                      Early Stage Professional
                    </h4>
                    <p
                      className="text-sm text-gray-600"
                      style={{
                        fontFamily:
                          "Helvetica Neue, Helvetica, Arial, sans-serif",
                      }}
                    >
                      Entry-level talent ready to grow quickly.
                    </p>
                  </Link>
                </div>

                <div>
                  <Link
                    href="/client-service/assessment"
                    className={`block ${
                      pathname.startsWith("/client-service/assessment")
                        ? "text-[#0AB5B5]"
                        : "text-[#0a2540] hover:text-[#0AB5B5]"
                    }`}
                  >
                    <h4
                      className="font-semibold mb-2"
                      style={{
                        fontFamily:
                          "Helvetica Neue, Helvetica, Arial, sans-serif",
                      }}
                    >
                      Assessment
                    </h4>
                    <p
                      className="text-sm text-gray-600"
                      style={{
                        fontFamily:
                          "Helvetica Neue, Helvetica, Arial, sans-serif",
                      }}
                    >
                      Evaluating candidates' skills for job suitability.
                    </p>
                  </Link>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <Link
                    href="/client-service/talent-workforce"
                    className={`block ${
                      pathname.startsWith("/client-service/talent-workforce")
                        ? "text-[#0AB5B5]"
                        : "text-[#0a2540] hover:text-[#0AB5B5]"
                    }`}
                  >
                    <h4
                      className="font-semibold mb-2"
                      style={{
                        fontFamily:
                          "Helvetica Neue, Helvetica, Arial, sans-serif",
                      }}
                    >
                      Talent Workforce
                    </h4>
                    <p
                      className="text-sm text-gray-600"
                      style={{
                        fontFamily:
                          "Helvetica Neue, Helvetica, Arial, sans-serif",
                      }}
                    >
                      Skilled professionals supporting business growth and
                      goals.
                    </p>
                  </Link>
                </div>

                <div>
                  <Link
                    href="/client-service/high-volume-hourly-rating"
                    className={`block ${
                      pathname.startsWith(
                        "/client-service/high-volume-hourly-rating"
                      )
                        ? "text-[#0AB5B5]"
                        : "text-[#0a2540] hover:text-[#0AB5B5]"
                    }`}
                  >
                    <h4
                      className="font-semibold mb-2"
                      style={{
                        fontFamily:
                          "Helvetica Neue, Helvetica, Arial, sans-serif",
                      }}
                    >
                      High Volume Hourly Rating
                    </h4>
                    <p
                      className="text-sm text-gray-600"
                      style={{
                        fontFamily:
                          "Helvetica Neue, Helvetica, Arial, sans-serif",
                      }}
                    >
                      Efficiently managing bulk recruitment for hourly roles.
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Candidate Service Mega Menu - Full Width */}
      {isCandidateMenuOpen && (
        <div
          className="fixed top-[72px] left-0 w-full bg-white shadow-lg z-40 border-t border-gray-100"
          onMouseEnter={() => setIsCandidateMenuOpen(true)}
          onMouseLeave={() => setIsCandidateMenuOpen(false)}
        >
          <div className="container mx-auto px-6 py-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div>
                <h3
                  className="text-lg font-bold text-[#0a2540] uppercase mb-4"
                  style={{
                    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
                  }}
                >
                  CANDIDATE SERVICE
                </h3>
                <p
                  className="text-sm text-gray-600 mb-6"
                  style={{
                    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
                  }}
                >
                  At Copora, we empower your business by providing flexible,
                  cost-effective, & scalable contingent staffing solutions. We
                  understand your unique challenges.
                </p>
                <div className="rounded-lg overflow-hidden">
                  <Image
                    src="/images/menu-banner-2.jpg"
                    alt="Candidate Service"
                    width={300}
                    height={240}
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <Link
                    href="/candidate-service/permanent-workers"
                    className={`block ${
                      pathname.startsWith(
                        "/candidate-service/permanent-workers"
                      )
                        ? "text-[#0AB5B5]"
                        : "text-[#0a2540] hover:text-[#0AB5B5]"
                    }`}
                  >
                    <h4
                      className="font-semibold mb-2"
                      style={{
                        fontFamily:
                          "Helvetica Neue, Helvetica, Arial, sans-serif",
                      }}
                    >
                      Permanent Workers
                    </h4>
                    <p
                      className="text-sm text-gray-600"
                      style={{
                        fontFamily:
                          "Helvetica Neue, Helvetica, Arial, sans-serif",
                      }}
                    >
                      Long-term employees contributing to sustained company
                      growth
                    </p>
                  </Link>
                </div>

                <div>
                  <Link
                    href="/candidate-service/temporary-worker"
                    className={`block ${
                      pathname.startsWith("/candidate-service/temporary-worker")
                        ? "text-[#0AB5B5]"
                        : "text-[#0a2540] hover:text-[#0AB5B5]"
                    }`}
                  >
                    <h4
                      className="font-semibold mb-2"
                      style={{
                        fontFamily:
                          "Helvetica Neue, Helvetica, Arial, sans-serif",
                      }}
                    >
                      Temporary Worker
                    </h4>
                    <p
                      className="text-sm text-gray-600"
                      style={{
                        fontFamily:
                          "Helvetica Neue, Helvetica, Arial, sans-serif",
                      }}
                    >
                      Short-term employee for project-specific or seasonal work.
                    </p>
                  </Link>
                </div>

                <div>
                  <Link
                    href="/candidate-service/temporary-worker-system"
                    className={`block ${
                      pathname.startsWith(
                        "/candidate-service/temporary-worker-system"
                      )
                        ? "text-[#0AB5B5]"
                        : "text-[#0a2540] hover:text-[#0AB5B5]"
                    }`}
                  >
                    <h4
                      className="font-semibold mb-2"
                      style={{
                        fontFamily:
                          "Helvetica Neue, Helvetica, Arial, sans-serif",
                      }}
                    >
                      Temporary Worker System
                    </h4>
                    <p
                      className="text-sm text-gray-600"
                      style={{
                        fontFamily:
                          "Helvetica Neue, Helvetica, Arial, sans-serif",
                      }}
                    >
                      Framework managing and supporting temporary workforce
                      needs.
                    </p>
                  </Link>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-24 h-20 bg-gray-100 rounded">
                    <Image
                      src="/images/office.jpg?key=tech-article"
                      alt="Tech article"
                      width={96}
                      height={80}
                      className="object-cover rounded"
                    />
                  </div>
                  <div>
                    <h4
                      className="font-semibold text-[#0a2540] text-sm"
                      style={{
                        fontFamily:
                          "Helvetica Neue, Helvetica, Arial, sans-serif",
                      }}
                    >
                      Unlocking Tomorrow: The Future of Tech Today
                    </h4>
                    <Link
                      href="/blog/tech-future"
                      className="text-xs text-[#0AB5B5] mt-2 inline-block"
                    >
                      Read more &gt;
                    </Link>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-24 h-20 bg-gray-100 rounded">
                    <Image
                      src="/images/office-meeting.jpg?key=team-planning"
                      alt="Team planning"
                      width={96}
                      height={80}
                      className="object-cover rounded"
                    />
                  </div>
                  <div>
                    <h4
                      className="font-semibold text-[#0a2540] text-sm"
                      style={{
                        fontFamily:
                          "Helvetica Neue, Helvetica, Arial, sans-serif",
                      }}
                    >
                      Building Success: Effective Team Planning for Projects
                    </h4>
                    <Link
                      href="/blog/team-planning"
                      className="text-xs text-[#0AB5B5] mt-2 inline-block"
                    >
                      Read more &gt;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile slide-in menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`fixed inset-y-0 left-0 w-full sm:w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <Link href="/" className="flex items-center">
              <Image
                src="/coporaLogoFooter.svg"
                alt="Copora Logo"
                width={150}
                height={50}
                priority
              />
            </Link>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="py-4 px-4 overflow-y-auto h-full">
            <nav
              className="space-y-4"
              style={{
                fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
              }}
            >
              <Link
                href="/"
                className={`block py-2 px-4 ${
                  isActive("/")
                    ? "text-[#0AB5B5] border-l-4 border-[#0AB5B5]"
                    : "text-gray-700 hover:text-[#0AB5B5] hover:bg-gray-50"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`block py-2 px-4 ${
                  isActive("/about")
                    ? "text-[#0AB5B5] border-l-4 border-[#0AB5B5]"
                    : "text-gray-700 hover:text-[#0AB5B5] hover:bg-gray-50"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/career-education"
                className={`block py-2 px-4 ${
                  isActive("/career-education")
                    ? "text-[#0AB5B5] border-l-4 border-[#0AB5B5]"
                    : "text-gray-700 hover:text-[#0AB5B5] hover:bg-gray-50"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Career Education
              </Link>

              {/* Mobile accordion menus */}
              <div className="border-t border-gray-200 pt-4">
                <details className="group">
                  <summary
                    className={`flex justify-between items-center py-2 px-4 cursor-pointer ${
                      pathname.startsWith("/client-service")
                        ? "text-[#0AB5B5]"
                        : "text-gray-700"
                    }`}
                    style={{
                      fontFamily:
                        "Helvetica Neue, Helvetica, Arial, sans-serif",
                    }}
                  >
                    Client Service
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 transition-transform group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                  <div
                    className="pl-4 pr-2 py-2 space-y-2"
                    style={{
                      fontFamily:
                        "Helvetica Neue, Helvetica, Arial, sans-serif",
                    }}
                  >
                    <Link
                      href="/client-service/permanent-staffing"
                      className={`block py-2 px-4 text-sm hover:bg-gray-50 rounded ${
                        pathname.startsWith(
                          "/client-service/permanent-staffing"
                        )
                          ? "text-[#0AB5B5]"
                          : "text-gray-600 hover:text-[#0AB5B5]"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Permanent Staffing
                    </Link>
                    <Link
                      href="/client-service/talent-workforce"
                      className={`block py-2 px-4 text-sm hover:bg-gray-50 rounded ${
                        pathname.startsWith("/client-service/talent-workforce")
                          ? "text-[#0AB5B5]"
                          : "text-gray-600 hover:text-[#0AB5B5]"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Talent Workforce
                    </Link>
                    <Link
                      href="/client-service/early-stage-professional"
                      className={`block py-2 px-4 text-sm hover:bg-gray-50 rounded ${
                        pathname.startsWith(
                          "/client-service/early-stage-professional"
                        )
                          ? "text-[#0AB5B5]"
                          : "text-gray-600 hover:text-[#0AB5B5]"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Early Stage Professional
                    </Link>
                    <Link
                      href="/client-service/high-volume-hourly-rating"
                      className={`block py-2 px-4 text-sm hover:bg-gray-50 rounded ${
                        pathname.startsWith(
                          "/client-service/high-volume-hourly-rating"
                        )
                          ? "text-[#0AB5B5]"
                          : "text-gray-600 hover:text-[#0AB5B5]"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      High Volume Hourly Rating
                    </Link>
                    <Link
                      href="/client-service/assessment"
                      className={`block py-2 px-4 text-sm hover:bg-gray-50 rounded ${
                        pathname.startsWith("/client-service/assessment")
                          ? "text-[#0AB5B5]"
                          : "text-gray-600 hover:text-[#0AB5B5]"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Assessment
                    </Link>
                  </div>
                </details>

                <details className="group">
                  <summary
                    className={`flex justify-between items-center py-2 px-4 cursor-pointer ${
                      pathname.startsWith("/candidate-service")
                        ? "text-[#0AB5B5]"
                        : "text-gray-700"
                    }`}
                    style={{
                      fontFamily:
                        "Helvetica Neue, Helvetica, Arial, sans-serif",
                    }}
                  >
                    Candidate Service
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 transition-transform group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                  <div
                    className="pl-4 pr-2 py-2 space-y-2"
                    style={{
                      fontFamily:
                        "Helvetica Neue, Helvetica, Arial, sans-serif",
                    }}
                  >
                    <Link
                      href="/candidate-service/permanent-workers"
                      className={`block py-2 px-4 text-sm hover:bg-gray-50 rounded ${
                        pathname.startsWith(
                          "/candidate-service/permanent-workers"
                        )
                          ? "text-[#0AB5B5]"
                          : "text-gray-600 hover:text-[#0AB5B5]"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Permanent Workers
                    </Link>
                    <Link
                      href="/candidate-service/temporary-worker"
                      className={`block py-2 px-4 text-sm hover:bg-gray-50 rounded ${
                        pathname.startsWith(
                          "/candidate-service/temporary-worker"
                        )
                          ? "text-[#0AB5B5]"
                          : "text-gray-600 hover:text-[#0AB5B5]"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Temporary Worker
                    </Link>
                    <Link
                      href="/candidate-service/temporary-worker-system"
                      className={`block py-2 px-4 text-sm hover:bg-gray-50 rounded ${
                        pathname.startsWith(
                          "/candidate-service/temporary-worker-system"
                        )
                          ? "text-[#0AB5B5]"
                          : "text-gray-600 hover:text-[#0AB5B5]"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Temporary Worker System
                    </Link>
                  </div>
                </details>
              </div>
            </nav>

            <div
              className="mt-8 space-y-4"
              style={{
                fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
              }}
            >
              <Link
                href="/find-talent"
                className={`block w-full text-center px-5 py-2 border border-[#0AB5B5] rounded-full ${
                  isActive("/find-talent")
                    ? "bg-[#0AB5B5] text-white"
                    : "text-[#0AB5B5] hover:bg-gray-50"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Find Talent
              </Link>
              <Link
                href="/find-jobs"
                className={`block w-full text-center px-5 py-2 ${
                  isActive("/find-jobs")
                    ? "bg-[#099999]"
                    : "bg-[#0AB5B5] hover:bg-[#099999]"
                } rounded-full text-white`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Find Jobs
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from being hidden under fixed header */}
      <div className="h-[72px]"></div>
    </>
  );
}
