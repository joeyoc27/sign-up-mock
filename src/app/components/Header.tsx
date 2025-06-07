import Image from 'next/image';
import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/vrbo-logo.svg"
            alt="Vrbo"
            width={92}
            height={32}
            priority
          />
        </Link>
      </div>
    </header>
  );
} 