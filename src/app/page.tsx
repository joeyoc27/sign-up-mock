import Image from "next/image";
import PropertyForm from './components/PropertyForm';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="w-full bg-[#102147] shadow-sm py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <Image
              src="/vrbo.png"
              alt="VRBO Logo"
              width={120}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* Left Section - Form */}
        <div className="w-1/2 px-12 py-8">
          <h1 className="text-4xl font-medium mb-4">Tell us about your place</h1>
          <p className="text-xl mb-8">With a few details, we can show you an estimate of how much you could earn with Vrbo.</p>
          <PropertyForm />
        </div>

        {/* Right Section - House Image */}
        <div className="w-1/2 relative overflow-hidden">
          <Image
            src="/house.jpg"
            alt="Beautiful vacation home"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </div>
    </main>
  );
}
