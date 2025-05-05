/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
} from "lucide-react";

export default function Contact() {
  const officeLocations = [
    {
      city: "London",
      address: "71-75 Shelton St London WC2H 9JQ United Kingdom",
      phone: "+44 7742 769816",
      email: "info@copora.com",
      hours: "Mon-Fri: 9:00 AM - 5:30 PM",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-secondary to-appBlue text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-xl mb-8">
              We're here to answer your questions and help you find the right
              solutions for your business
            </p>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 120"
            className="w-full h-auto"
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Contact Form and Info */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First Name
                  </label>
                  <Input
                    type="text"
                    id="first-name"
                    placeholder="Enter your first name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Last Name
                  </label>
                  <Input
                    type="text"
                    id="last-name"
                    placeholder="Enter your last name"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Subject
                </label>
                <Input
                  type="text"
                  id="subject"
                  placeholder="Enter the subject"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  rows={4}
                  placeholder="Enter your message"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Our Offices</h2>
            {officeLocations.map((office, index) => (
              <div key={index} className="mb-8">
                <h3 className="text-xl font-semibold mb-2">{office.city}</h3>
                <div className="flex items-center mb-2">
                  <MapPin className="h-5 w-5 mr-2 text-gray-500" />
                  <p className="text-gray-700">{office.address}</p>
                </div>
                <div className="flex items-center mb-2">
                  <Phone className="h-5 w-5 mr-2 text-gray-500" />
                  <p className="text-gray-700">{office.phone}</p>
                </div>
                <div className="flex items-center mb-2">
                  <Mail className="h-5 w-5 mr-2 text-gray-500" />
                  <p className="text-gray-700">{office.email}</p>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-gray-500" />
                  <p className="text-gray-700">{office.hours}</p>
                </div>
              </div>
            ))}

            {/* Social Links */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-2">Connect With Us</h3>
              <div className="flex space-x-4">
                <a
                  href="https://www.linkedin.com/company/coporagroup/"
                  className="text-gray-500 hover:text-primary"
                >
                  <Linkedin className="h-6 w-6" />
                </a>

                <a
                  href="https://www.facebook.com/CoporaGlobalRecruitment/"
                  className="text-gray-500 hover:text-primary"
                >
                  <Facebook className="h-6 w-6" />
                </a>
                <a
                  href="https://www.instagram.com/copora_recruitment/"
                  className="text-gray-500 hover:text-primary"
                >
                  <Instagram className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
