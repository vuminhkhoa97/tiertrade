'use client';

export interface IconProps {
  className?: string;
  size?: number;
}

// Heart Icons
export const HeartIcon = ({ className, size = 24 }: IconProps) => (
  <svg
    className={className}
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
);

export const HeartIconSolid = ({ className, size = 24 }: IconProps) => (
  <svg
    className={className}
    width={size}
    height={size}
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
  </svg>
);

// Search Icon
export const SearchIcon = ({ className, size = 24 }: IconProps) => (
  <svg
    className={className}
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

// Filter Icon
export const FilterIcon = ({ className, size = 24 }: IconProps) => (
  <svg
    className={className}
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
    />
  </svg>
);

// Chevron Icons
export const ChevronDownIcon = ({ className, size = 24 }: IconProps) => (
  <svg
    className={className}
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

export const ChevronRightIcon = ({ className, size = 24 }: IconProps) => (
  <svg
    className={className}
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);

// Loading Spinner
export const LoadingIcon = ({ className, size = 24 }: IconProps) => (
  <svg
    className={className}
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

// X (Close) Icon
export const XIcon = ({ className, size = 24 }: IconProps) => (
  <svg
    className={className}
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

// Product Category Icons
export const ShirtIcon = ({ className, size = 24 }: IconProps) => (
  <svg
    className={className}
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4l-2 5v11a1 1 0 01-1 1H5a1 1 0 01-1-1V9L2 4h5z"
    />
  </svg>
);

export const HatIcon = ({ className, size = 24 }: IconProps) => (
  <svg
    className={className}
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 2C8.5 2 6 4.5 6 8c0 1 0 2 0 2s-2 1-2 3v1h16v-1c0-2-2-3-2-3s0-1 0-2c0-3.5-2.5-6-6-6z"
    />
  </svg>
);

export const ShoesIcon = ({ className, size = 24 }: IconProps) => (
  <svg
    className={className}
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2 18h20l-2-6H8l-2-4H4l-2 2v8z"
    />
  </svg>
);

export const AccessoryIcon = ({ className, size = 24 }: IconProps) => (
  <svg
    className={className}
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
    />
  </svg>
);

// Pixel-style Product Category Icons
export const PixelShirtIcon = ({ className, size = 24 }: IconProps) => (
  <svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="25" y="25" width="50" height="40" fill="#EDF2F7" />
    <rect x="22" y="28" width="6" height="6" fill="#A0AEC0" />
    <rect x="73" y="28" width="6" height="6" fill="#A0AEC0" />

    <rect x="30" y="22" width="6" height="6" fill="#EDF2F7" />
    <rect x="36" y="22" width="6" height="6" fill="#A0AEC0" />
    <rect x="42" y="22" width="6" height="6" fill="#EDF2F7" />
    <rect x="48" y="22" width="6" height="6" fill="#A0AEC0" />
    <rect x="54" y="22" width="6" height="6" fill="#EDF2F7" />
    <rect x="60" y="22" width="6" height="6" fill="#A0AEC0" />
    <rect x="35" y="25" width="30" height="3" fill="#A0AEC0" />

    <rect x="19" y="31" width="9" height="18" fill="#EDF2F7" />
    <rect x="72" y="31" width="9" height="18" fill="#EDF2F7" />

    <rect x="25" y="65" width="50" height="3" fill="#A0AEC0" />
  </svg>
);

export const PixelHatIcon = ({ className, size = 24 }: IconProps) => (
  <svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="20" y="55" width="60" height="10" fill="#F6AD55" />

    <rect x="25" y="30" width="50" height="30" fill="#F6AD55" />
    <rect x="28" y="25" width="44" height="6" fill="#F6AD55" />
    <rect x="31" y="20" width="38" height="6" fill="#F6AD55" />
    <rect x="34" y="15" width="32" height="6" fill="#F6AD55" />

    <rect x="25" y="45" width="50" height="6" fill="#E2E8F0" />
  </svg>
);

export const PixelShoesIcon = ({ className, size = 24 }: IconProps) => (
  <svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g transform="translate(15, 0)">
      <rect x="10" y="65" width="30" height="6" fill="#A0AEC0" />

      <rect x="10" y="50" width="24" height="15" fill="#38B2AC" />
      <rect x="20" y="45" width="14" height="6" fill="#38B2AC" />

      <rect x="28" y="53" width="3" height="3" fill="white" />
      <rect x="24" y="58" width="3" height="3" fill="white" />
    </g>

    <g transform="translate(50, 0)">
      <rect x="10" y="65" width="30" height="6" fill="#A0AEC0" />

      <rect x="16" y="50" width="24" height="15" fill="#38B2AC" />
      <rect x="16" y="45" width="14" height="6" fill="#38B2AC" />

      <rect x="19" y="53" width="3" height="3" fill="white" />
      <rect x="23" y="58" width="3" height="3" fill="white" />
    </g>
  </svg>
);

export const PixelAccessoryIcon = ({ className, size = 24 }: IconProps) => (
  <svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="45" y="30" width="10" height="10" fill="#ECC94B" />
    <rect x="42" y="33" width="3" height="3" fill="#ECC94B" />
    <rect x="55" y="33" width="3" height="3" fill="#ECC94B" />
    <rect x="45" y="40" width="10" height="10" fill="#A0AEC0" />
    <rect x="30" y="55" width="40" height="15" fill="#A0AEC0" />
    <rect x="35" y="50" width="30" height="6" fill="#A0AEC0" />
    <rect x="35" y="70" width="30" height="6" fill="#A0AEC0" />
    <rect x="45" y="58" width="10" height="6" fill="#EDF2F7" />
    <rect x="70" y="20" width="6" height="6" fill="white" />
    <rect x="67" y="23" width="12" height="6" fill="white" />
    <rect x="70" y="26" width="6" height="6" fill="white" />
  </svg>
);

// Social Media Icons
export const DiscordIcon = ({ className, size = 24 }: IconProps) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

export const EmailIcon = ({ className, size = 24 }: IconProps) => (
  <svg
    className={className}
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

export const TwitterIcon = ({ className, size = 24 }: IconProps) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
