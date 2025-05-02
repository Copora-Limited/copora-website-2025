import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-[#0AB5B5] mx-auto" />
        <h2
          className="mt-4 text-xl font-semibold text-[#0a2540]"
          style={{ fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif" }}
        >
          Loading talent resources...
        </h2>
        <p
          className="mt-2 text-gray-500"
          style={{ fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif" }}
        >
          Please wait while we prepare the best talent solutions for your
          business.
        </p>
      </div>
    </div>
  );
}
