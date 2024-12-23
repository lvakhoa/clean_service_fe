import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import React from "react";
import Image from "next/image";
import { verifySession } from "@/helpers/verifySession";

const CareerPage = async () => {
  const session = await verifySession();
  const accreditions = [
    {
      logo: "/images/About/UIT.svg",
    },
    {
      logo: "/images/About/SE_Logo.png",
    },
    {
      logo: "/images/About/FPT.png",
    },
    {
      logo: "/images/About/Google.png",
    },
  ];

  const Benefits = [
    {
      title: "Health & Safety",
      description:
        "Provide you with a clean, safe, and healthy environment for your customers and employees. Clean offices improves employee moods, health and overall safety.",
      logo: "/images/Career/Health&Safe.svg",
    },
    {
      title: "High Morale",
      description:
        "Improve employee morale. Employees who work in a clean office are happier and happy employees mean reduced turnover and increased productivity.",
      logo: "/images/Career/HighMorale.svg",
    },
    {
      title: "Save Money",
      description:
        "Reduce costs and increase revenue - Clean offices are less expensive to maintain and outsourcing your cleaners saves on employee",
      logo: "/images/Career/SaveMoney.svg",
    },
    {
      title: "Full-service Partnership",
      description:
        "With our service, you'll no longer have to worry about restroom and cleaning equipments, because we manage it all for you and provide our own supplies and equipment",
      logo: "/images/Career/FullService.svg",
    },
  ];
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <div className="relative">
        <div className="absolute left-0 top-0 z-20 w-full">
          <Header isAuth={session.isAuth} role={session.role} />
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="relative">
            <Image
              src="/images/Career/CareerBackground.svg"
              alt="HeroIllustration"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
              <div className="mt-10 text-center font-Averta-Bold text-5xl">
                <p className="leading-normal">Treat Employees Like</p>
                <p className="leading-normal">Your Own Customers</p>
                {/* <button className="px-16 py-3 mt-[9%] bg-[#1b78f2] rounded-xl text-lg font-Averta-Semibold tracking-normal leading-loose text-center text-white">
                                    Join Our Team
                                </button> */}
              </div>
            </div>
          </div>
          {/* Accreditations */}
          <div className="relative mt-[140px] h-[400px] w-full">
            <Image
              src="/images/HomePage/Background_feedback.svg"
              alt="Logo_Grat"
              fill
              className="absolute inset-0 object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h2 className="z-10 font-Averta-Bold text-4xl text-white">
                <p>Our accreditions</p>
              </h2>
              <div className="container mx-auto mt-20">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-16">
                  {accreditions.map((accredition) => (
                    <div
                      key={accredition.logo}
                      className="flex items-center justify-center"
                    >
                      <div className="relative h-[40px] w-full md:h-[50px] lg:h-[60px]">
                        <Image
                          src={accredition.logo}
                          alt="ClientLogo"
                          fill
                          sizes="100vw"
                          className="h[40px] object-contain grayscale filter"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Benefits */}
          <div className="flex max-w-[1000px] flex-col items-center justify-center pt-[112px]">
            <div className="flex w-full flex-col gap-5 font-Averta-Bold text-5xl">
              <p>What can Shield Cleaning do for you?</p>
            </div>
          </div>
          <div className="mt-28 flex h-fit w-full items-center justify-center">
            <div className="grid w-full max-w-[1000px] grid-cols-2 gap-24">
              {Benefits.map(({ title, description, logo }, index) => (
                <div key={index} className="flex flex-col gap-y-8">
                  <Image
                    src={logo}
                    alt="benefit"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100px", height: "100px" }}
                  />
                  <div className="flex flex-col gap-y-2">
                    <p className="font-Averta-Bold text-3xl">{title}</p>
                    <p className="text-neutral-500">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Make a request */}
          <div className="relative mt-28 h-[393px] w-full">
            <Image
              src="/images/Career/Request.svg"
              alt="Logo_Grat"
              fill
              className="absolute inset-0 object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="mb-14 text-center font-Averta-Bold text-5xl">
                The Ultimate Cleaning Companion
              </p>
              <button className="rounded-xl bg-[#1b78f2] px-14 py-3 text-center font-Averta-Semibold text-base leading-loose tracking-normal text-white">
                Request a Quote
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default CareerPage;
