import Image from "next/image";
import PropertyForm from './components/PropertyForm';
import ProgressBar from './components/ProgressBar';

export default function Home() {
  return (
    <main className="fixed inset-0 flex flex-col">
      {/* Header */}
      <header className="w-full bg-[#102147] shadow-sm py-4 flex-shrink-0">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4">
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
            <div className="md:hidden">
              <ProgressBar currentStep={1} totalSteps={4} className="mx-4" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 relative">
        <div className="absolute inset-0 flex justify-center">
          <div className="flex w-full max-w-[1400px]">
            {/* Left Section - Form */}
            <div className="w-full md:w-1/2 px-4 md:pr-0 md:pl-24 py-6 md:py-12 overflow-y-auto">
              <div className="max-w-md mx-auto">
                <div className="hidden md:block mb-6 md:mb-8">
                  <ProgressBar currentStep={1} totalSteps={4} />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-medium mb-3 md:mb-4">Tell us about your place</h1>
                  <p className="text-lg md:text-xl mb-6 md:mb-8">With a few details, we can show you an estimate of how much you could earn with Vrbo.</p>
                  <PropertyForm />
                </div>
              </div>
            </div>

            {/* Right Section - House Image */}
            <div className="hidden md:block w-1/2 relative overflow-hidden md:pl-0 md:pr-24">
              <Image
                src="/databack.png"
                alt="Beautiful vacation home"
                fill
                className="object-contain object-center"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
