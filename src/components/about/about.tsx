import { time } from "console";
import Image from "next/image";
import React from "react";

const About = () => {
  const working_hours = [
    {
      day: "Monday - Friday",
      time: "8 AM - 9 PM",
    },
    {
      day: "Saturday",
      time: "8 AM - 6 PM",
    },
    {
      day: "Sunday",
      time: "8 AM - 2 PM",
    },
  ];

  const contact = [
    {
      icon: "/images/About/Address.svg",
      info: "Quarter 6, Linh Trung Ward, Thu Duc City, Ho Chi Minh City",
    },
    {
      icon: "/images/About/Phone.svg",
      info: "(+84) 123 456 789",
    },
    {
      icon: "/images/About/Mail.svg",
      info: "contact@group1.com",
    },
  ];

  const clients = [
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

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        <Image
          src="/images/About/HeroBackground.svg"
          alt="HeroIllustration"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <div className="mt-10 text-center font-Averta-Bold text-5xl">
            <p>About Us</p>
          </div>
        </div>
      </div>
      <p className="mt-20 text-center font-Averta-Bold text-3xl">
        The Shield Cleaning.Co Story
      </p>
      <p className="mt-6 max-w-[900px] text-center font-Averta-Regular">
        Our story began in 2014 when we relized there's no convenient way for us
        to find cleaners in a simple manner. We take our jobs very seriously,
        just ask the 10,000+ recuring customers who keep coming back for our
        professional services. We use a combination of enterprise grade
        technology and technical cleaning methods to ensure that your house,
        office or commercial setting is as good as new, healthy and clean - when
        we're done.
      </p>
      <div className="relative mt-[80px] h-[500px] w-full">
        <div className="absolute inset-0 bg-[#eaeef4] object-cover"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-center font-Averta-Bold text-3xl">Contact Us</p>
          <p className="max-w-[700px] p-6 text-center font-Averta-Regular">
            If you call during our business hours you'll get through to us
            instantly. If you email, we'll usually get back to you within the
            same business day. Our client services team members are eager to
            answer all of your cleaning services questions.
          </p>
          <div className="mt-10 flex w-full max-w-[600px] flex-col">
            <p className="text-start font-Averta-Bold text-2xl">
              Working Hours
            </p>
            <div className="flex flex-row justify-between">
              <div className="mt-4 flex w-full max-w-[250px] flex-col gap-4">
                {working_hours.map((hours) => (
                  <div
                    key={hours.day}
                    className="flex flex-row justify-between"
                  >
                    <p className="font-Averta-Regular">{hours.day}</p>
                    <p className="font-Averta-Bold text-blue-600">
                      {hours.time}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex max-w-[250px] flex-col gap-4">
                {contact.map((info) => (
                  <div key={info.info} className="flex flex-row gap-4">
                    <Image
                      src={info.icon}
                      alt="Icon"
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: "auto", height: "auto" }}
                    />
                    <p className="font-Averta-Regular">{info.info}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col p-32">
        <h2 className="mb-16 text-center font-Averta-Bold text-3xl">
          Our Amazing Clients
        </h2>
        <div className="container mx-auto">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-16">
            {clients.map((client) => (
              <div
                key={client.logo}
                className="flex items-center justify-center"
              >
                <div className="relative h-[40px] w-full md:h-[50px] lg:h-[60px]">
                  <Image
                    src={client.logo}
                    alt="ClientLogo"
                    fill
                    className="object-contain grayscale filter"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="relative h-[494px] w-full">
        <Image
          src="/images/About/Footer.svg"
          alt="Logo_Grat"
          fill
          className="absolute inset-0 object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="mb-9 max-w-[600px] text-center font-Averta-Bold text-5xl">
            Servicing 10K+ Users Across Your City
          </p>
          <button className="rounded-xl bg-[#1b78f2] px-7 py-2 text-center font-Averta-Semibold text-lg leading-loose tracking-normal text-white">
            <a href="/booking">Booking from 80$</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
