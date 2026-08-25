import React from "react";

interface SupabaseProps {
  size?: string | number;
}

function Supabase({ size = 32 }: SupabaseProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden>
      <path
        fill="#3ECF8E"
        d="M21.362 9.286h-9.026V22.5c0 .396-.48.59-.764.293L.638 10.397A.857.857 0 0 1 1.255 9h9.026V.5c0-.396.48-.59.764-.293l10.934 12.396a.857.857 0 0 1-.617 1.183z"
      />
    </svg>
  );
}

export default Supabase;
