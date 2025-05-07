/* eslint-disable react/no-unescaped-entities */
"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

type CookiePreferences = {
  essential: boolean
  marketing: boolean
  personalization: boolean
  analytics: boolean
  hasConsented: boolean
}

const defaultPreferences: CookiePreferences = {
  essential: true, // Essential cookies are always required
  marketing: false,
  personalization: false,
  analytics: false,
  hasConsented: false,
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences)

  useEffect(() => {
    // Check if user has already made a choice
    const savedPreferences = localStorage.getItem("cookiePreferences")

    if (savedPreferences) {
      const parsedPreferences = JSON.parse(savedPreferences)
      setPreferences(parsedPreferences)

      // If user has already consented, don't show the banner
      if (parsedPreferences.hasConsented) {
        setShowBanner(false)
      } else {
        setShowBanner(true)
      }
    } else {
      // If no preferences are saved, show the banner
      setShowBanner(true)
    }
  }, [])

  const handleAccept = () => {
    // Accept all cookies
    const newPreferences = {
      ...preferences,
      marketing: true,
      personalization: true,
      analytics: true,
      hasConsented: true,
    }

    setPreferences(newPreferences)
    localStorage.setItem("cookiePreferences", JSON.stringify(newPreferences))

    // Show preferences modal after accepting
    setShowBanner(false)
    setShowPreferences(true)
  }

  const handleDecline = () => {
    // Decline all non-essential cookies
    const newPreferences = {
      ...preferences,
      marketing: false,
      personalization: false,
      analytics: false,
      hasConsented: true,
    }

    setPreferences(newPreferences)
    localStorage.setItem("cookiePreferences", JSON.stringify(newPreferences))

    setShowBanner(false)
  }

  const handlePreferencesClick = () => {
    setShowBanner(false)
    setShowPreferences(true)
  }

  const handleSavePreferences = () => {
    // Save current preferences
    const newPreferences = {
      ...preferences,
      hasConsented: true,
    }

    localStorage.setItem("cookiePreferences", JSON.stringify(newPreferences))
    setShowPreferences(false)
  }

  const handleCancel = () => {
    // If user has never consented before, show the banner again
    if (!preferences.hasConsented) {
      setShowBanner(true)
    }

    setShowPreferences(false)
  }

  const handleTogglePreference = (key: keyof Omit<CookiePreferences, "hasConsented">) => {
    if (key === "essential") return // Essential cookies cannot be toggled

    setPreferences({
      ...preferences,
      [key]: !preferences[key],
    })
  }

  // Cookie consent banner - positioned on the right side
  const consentBanner = (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-gray-800">Cookie Notice</h3>
          <button
            onClick={() => setShowBanner(false)}
            className="p-1 text-gray-500 hover:text-gray-700 -mt-1"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
        <p className="text-sm text-gray-700 mb-4">
          By clicking "Accept", you agree to the storing of cookies on your device to enhance site navigation, analyze
          site usage, and assist in our marketing efforts.{" "}
          <a href="/privacy-policy" className="text-blue-600 underline">
            View our Privacy Policy
          </a>
        </p>
        <div className="flex flex-col space-y-2">
          <button
            onClick={handleAccept}
            className="w-full px-4 py-2 text-sm bg-black text-white rounded-md hover:bg-gray-800"
          >
            Accept
          </button>
          <div className="flex space-x-2">
            <button
              onClick={handlePreferencesClick}
              className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Preferences
            </button>
            <button
              onClick={handleDecline}
              className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  // Preferences modal
  const preferencesModal = (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Manage consent preferences by category</h2>
            <button onClick={handleCancel} className="p-1 text-gray-500 hover:text-gray-700" aria-label="Close">
              <X size={20} />
            </button>
          </div>

          <div className="space-y-6">
            {/* Essential Cookies */}
            <div className="pb-4 border-b border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Essential</h3>
                <div className="bg-gray-200 text-xs px-2 py-1 rounded">Always active</div>
              </div>
              <p className="text-sm text-gray-600">These items are required to enable basic website functionality.</p>
            </div>

            {/* Marketing Cookies */}
            <div className="pb-4 border-b border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Marketing</h3>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={() => handleTogglePreference("marketing")}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <p className="text-sm text-gray-600">
                These items are used to deliver advertising that is more relevant to you and your interests. They may
                also be used to limit the number of times you see an advertisement and measure the effectiveness of
                advertising campaigns. Advertising networks usually place them with the website operator's permission.
              </p>
            </div>

            {/* Personalization Cookies */}
            <div className="pb-4 border-b border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Personalization</h3>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.personalization}
                    onChange={() => handleTogglePreference("personalization")}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <p className="text-sm text-gray-600">
                These items allow the website to remember choices you make (such as your user name, language, or the
                region you are in) and provide enhanced, more personal features. For example, a website may provide you
                with local weather reports or traffic news by storing data about your current location.
              </p>
            </div>

            {/* Analytics Cookies */}
            <div className="pb-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Analytics</h3>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={() => handleTogglePreference("analytics")}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <p className="text-sm text-gray-600">
                These items help the website operator understand how its website performs, how visitors interact with
                the site, and whether there may be technical issues. This storage type usually doesn't collect
                information that identifies a visitor.
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <button onClick={handleCancel} className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              Cancel
            </button>
            <button
              onClick={handleSavePreferences}
              className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800"
            >
              Save preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  // Cookie preferences button (always visible in the corner)
  const preferencesButton = (
    <div className="fixed bottom-4 left-4 z-40">
      <button
        onClick={handlePreferencesClick}
        className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md text-sm hover:shadow-lg transition-shadow"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
            fill="currentColor"
          />
          <path
            d="M6.5 10C7.32843 10 8 9.32843 8 8.5C8 7.67157 7.32843 7 6.5 7C5.67157 7 5 7.67157 5 8.5C5 9.32843 5.67157 10 6.5 10Z"
            fill="currentColor"
          />
          <path
            d="M9.5 15C10.3284 15 11 14.3284 11 13.5C11 12.6716 10.3284 12 9.5 12C8.67157 12 8 12.6716 8 13.5C8 14.3284 8.67157 15 9.5 15Z"
            fill="currentColor"
          />
          <path
            d="M14.5 15C15.3284 15 16 14.3284 16 13.5C16 12.6716 15.3284 12 14.5 12C13.6716 12 13 12.6716 13 13.5C13 14.3284 13.6716 15 14.5 15Z"
            fill="currentColor"
          />
          <path
            d="M17.5 10C18.3284 10 19 9.32843 19 8.5C19 7.67157 18.3284 7 17.5 7C16.6716 7 16 7.67157 16 8.5C16 9.32843 16.6716 10 17.5 10Z"
            fill="currentColor"
          />
        </svg>
        <span>Cookie preferences</span>
      </button>
    </div>
  )

  return (
    <>
      {showBanner && consentBanner}
      {showPreferences && preferencesModal}
      {preferences.hasConsented && preferencesButton}
    </>
  )
}
