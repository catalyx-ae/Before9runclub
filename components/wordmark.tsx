import Image from "next/image";
import { brand } from "@/content/brand";
import { ArrowIcon } from "./icons";

export function Wordmark({ className = "" }: { className?: string }) {
  return brand.logo ? (
    <Image className={`official-wordmark ${className}`} src={brand.logo} width={140} height={52} alt={brand.name} priority />
  ) : (
    <span className={`wordmark ${className}`} role="img" aria-label={brand.name}>
      <span className="wordmark-text" aria-hidden="true">BEFORE<span>RUN CLUB</span></span>
      <span className="wordmark-nine" aria-hidden="true">9<ArrowIcon diagonal /></span>
    </span>
  );
}
