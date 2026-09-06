import React from 'react';

interface BlazerBankLogoProps {
  className?: string;
  size?: number | string;
}

export const BlazerBankLogo: React.FC<BlazerBankLogoProps> = ({
  className = 'w-10 h-10',
}) => {
  return (
    <svg
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Blazer Bank Official Logo"
    >
      <defs>
        <linearGradient id="bbGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#cfad68" />
          <stop offset="35%" stopColor="#b68d44" />
          <stop offset="70%" stopColor="#dfc688" />
          <stop offset="100%" stopColor="#a87f38" />
        </linearGradient>
        <linearGradient id="bbNavy" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0b1325" />
          <stop offset="100%" stopColor="#141e33" />
        </linearGradient>
      </defs>

      {/* Outer Geometric Gold Rings & Intersecting Bezel Facets */}
      <g stroke="url(#bbGold)" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="250" cy="275" r="195" strokeWidth="3.2" />
        <circle cx="250" cy="275" r="183" strokeWidth="1.75" opacity="0.95" />
        <circle cx="250" cy="275" r="201" strokeWidth="0.8" opacity="0.6" />

        {/* Geometric Intersecting Wireframe Arcs */}
        <path d="M 55,275 C 95,140 180,85 250,80" strokeWidth="1.2" opacity="0.85" />
        <path d="M 445,275 C 405,140 320,85 250,80" strokeWidth="1.2" opacity="0.85" />
        <path d="M 55,275 C 95,410 180,465 250,470" strokeWidth="1.2" opacity="0.85" />
        <path d="M 445,275 C 405,410 320,465 250,470" strokeWidth="1.2" opacity="0.85" />
        
        <path d="M 112,137 C 200,95 300,95 388,137" strokeWidth="1" opacity="0.75" />
        <path d="M 112,413 C 200,455 300,455 388,413" strokeWidth="1" opacity="0.75" />
        <path d="M 67,200 C 130,120 370,120 433,200" strokeWidth="0.8" opacity="0.6" />
        <path d="M 67,350 C 130,430 370,430 433,350" strokeWidth="0.8" opacity="0.6" />

        <path d="M 80,210 L 150,110 M 420,210 L 350,110" strokeWidth="0.8" opacity="0.6" />
        <path d="M 80,340 L 150,440 M 420,340 L 350,440" strokeWidth="0.8" opacity="0.6" />
      </g>

      {/* Coat Hanger (Gold) */}
      <g stroke="url(#bbGold)" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 250,140 L 250,120 C 250,90 278,80 275,60 C 272,40 248,38 238,52 C 230,62 237,70 242,70" strokeWidth="4.2" />
        <path d="M 238,140 L 262,140 L 256,155 L 244,155 Z" fill="url(#bbGold)" strokeWidth="1" />
        <path d="M 250,155 L 225,188 L 175,200" strokeWidth="3.5" />
        <path d="M 250,155 L 275,188 L 325,200" strokeWidth="3.5" />
        <path d="M 175,200 Q 250,195 325,200" strokeWidth="2.5" opacity="0.7" />
      </g>

      {/* Midnight Navy Blazer Jacket Contours & Silhouette */}
      <g stroke="url(#bbNavy)" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 225,180 L 172,210 C 160,218 152,238 148,270 L 132,360 C 130,372 128,395 125,410" strokeWidth="4.5" />
        <path d="M 275,180 L 328,210 C 340,218 348,238 352,270 L 368,360 C 370,372 372,395 375,410" strokeWidth="4.5" />
        
        <path d="M 160,335 C 162,370 165,405 168,435" strokeWidth="2" opacity="0.4" />
        <path d="M 340,335 C 338,370 335,405 332,435" strokeWidth="2" opacity="0.4" />
        <path d="M 168,435 C 205,455 295,455 332,435" strokeWidth="3" />
      </g>

      {/* Tailored Notched Lapels & Jacket Structure (Gold Accent Trim) */}
      <g stroke="url(#bbGold)" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 225,180 L 202,235 L 213,240" strokeWidth="3.2" />
        <path d="M 213,240 L 178,252 L 236,390" strokeWidth="3.5" />
        <path d="M 200,240 L 228,370" strokeWidth="1.8" opacity="0.8" />

        <path d="M 275,180 L 298,235 L 287,240" strokeWidth="3.2" />
        <path d="M 287,240 L 322,252 L 264,390" strokeWidth="3.5" />
        <path d="M 300,240 L 272,370" strokeWidth="1.8" opacity="0.8" />

        {/* Chest Welt Pocket */}
        <path d="M 308,288 L 328,286" strokeWidth="2.5" />
        <path d="M 310,298 L 326,296" strokeWidth="1.5" opacity="0.75" />

        {/* Lower Flap Pockets */}
        <path d="M 168,408 C 178,406 200,408 206,420 L 168,435 Z" strokeWidth="2.2" fill="none" />
        <path d="M 332,408 C 322,406 300,408 294,420 L 332,435 Z" strokeWidth="2.2" fill="none" />

        {/* Center Seam & Regal Buttons */}
        <path d="M 250,390 L 250,465" strokeWidth="2.5" />
        <circle cx="250" cy="406" r="4" strokeWidth="2" fill="#ffffff" />
        <circle cx="250" cy="445" r="3.5" strokeWidth="2" fill="#ffffff" />
      </g>

      {/* Center Interlocking BB Monogram (Royal Gold Cipher) */}
      <g fill="url(#bbGold)" stroke="url(#bbGold)" strokeLinejoin="round">
        {/* Left Inverted B */}
        <path d="M 238,245 L 238,298 L 243,298 L 243,245 Z" strokeWidth="0.5" />
        <path d="M 234,245 L 245,245 M 234,298 L 245,298" strokeWidth="2" strokeLinecap="square" />
        <path d="M 238,246 C 215,246 215,270 238,270" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M 238,270 C 213,270 213,297 238,297" strokeWidth="3.2" fill="none" strokeLinecap="round" />
        <path d="M 236,252 C 224,252 224,264 236,264" strokeWidth="1" fill="none" opacity="0.6" />
        <path d="M 236,276 C 223,276 223,291 236,291" strokeWidth="1" fill="none" opacity="0.6" />

        {/* Center Interlocking Knot */}
        <path d="M 232,270 C 243,264 257,264 268,270 C 257,276 243,276 232,270 Z" fill="url(#bbGold)" />

        {/* Right Standard B */}
        <path d="M 262,245 L 262,298 L 257,298 L 257,245 Z" strokeWidth="0.5" />
        <path d="M 255,245 L 266,245 M 255,298 L 266,298" strokeWidth="2" strokeLinecap="square" />
        <path d="M 262,246 C 285,246 285,270 262,270" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M 262,270 C 287,270 287,297 262,297" strokeWidth="3.2" fill="none" strokeLinecap="round" />
        <path d="M 264,252 C 276,252 276,264 264,264" strokeWidth="1" fill="none" opacity="0.6" />
        <path d="M 264,276 C 277,276 277,291 264,291" strokeWidth="1" fill="none" opacity="0.6" />
      </g>
    </svg>
  );
};
