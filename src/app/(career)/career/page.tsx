import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import React from 'react'
import Image from 'next/image'
import { verifySession } from '@/helpers/verifySession'

const CareerPage = async () => {
    const session = await verifySession();
    const accreditions = [
        {
            logo: '/images/About/UIT.svg'
        },
        {
            logo: '/images/About/SE_Logo.png'
        },
        {
            logo: '/images/About/FPT.png'
        },
        {
            logo: '/images/About/Google.png'
        }
    ]

    const Benefits = [
        {
            title: 'Health & Safety',
            description: 'Provide you with a clean, safe, and healthy environment for your customers and employees. Clean offices improves employee moods, health and overall safety.',
            logo: '/images/Career/Health&Safe.svg'
        },
        {
            title: 'High Morale',
            description: 'Improve employee morale. Employees who work in a clean office are happier and happy employees mean reduced turnover and increased productivity.',
            logo: '/images/Career/HighMorale.svg'
        },
        {
            title: 'Save Money',
            description: 'Reduce costs and increase revenue - Clean offices are less expensive to maintain and outsourcing your cleaners saves on employee',
            logo: '/images/Career/SaveMoney.svg'
        },
        {
            title: 'Full-service Partnership',
            description: "With our service, you'll no longer have to worry about restroom and cleaning equipments, because we manage it all for you and provide our own supplies and equipment",
            logo: '/images/Career/FullService.svg'
        }
    ]
    return (
        <div className="flex min-h-screen flex-col justify-between">
            <div className="relative">

                <div className="absolute top-0 left-0 w-full z-20">
                    <Header isAuth={session.isAuth} />
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <div className='relative'>
                        <Image src='/images/Career/CareerBackground.svg' alt='HeroIllustration' width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} />
                        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                            <div className='font-Averta-Bold text-center text-5xl mt-10'>
                                <p className='leading-normal'>Treat Employees Like</p>
                                <p className='leading-normal'>Your Own Customers</p>
                                <button className="px-16 py-3 mt-[9%] bg-[#1b78f2] rounded-xl text-lg font-Averta-Semibold tracking-normal leading-loose text-center text-white">
                                    Join Our Team
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Accreditations */}
                    <div className='mt-[140px] w-full h-[400px] relative'>
                        <Image
                            src='/images/HomePage/Background_feedback.svg'
                            alt='Logo_Grat'
                            fill
                            className='absolute inset-0 object-cover' />
                        <div className='flex flex-col absolute inset-0 items-center justify-center'>
                            <h2 className='text-white text-4xl font-Averta-Bold z-10'>
                                <p>Our accreditions</p>
                            </h2>
                            <div className='container mx-auto mt-20'>
                                <div className='grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16'>
                                    {accreditions.map((accredition) => (
                                        <div key={accredition.logo} className='flex items-center justify-center'>
                                            <div className='relative w-full h-[40px] md:h-[50px] lg:h-[60px]'>
                                                <Image
                                                    src={accredition.logo}
                                                    alt='ClientLogo'
                                                    fill
                                                    sizes="100vw"
                                                    className='object-contain filter grayscale h[40px]'
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                    {/* Benefits */}
                    <div className='flex flex-col max-w-[1000px] pt-[112px] items-center justify-center'>
                        <div className='font-Averta-Bold text-5xl w-full flex flex-col gap-5'>
                            <p>What can Shield Cleaning do for you?</p>
                        </div>

                    </div>
                    <div className='flex w-full h-fit items-center justify-center mt-28'>
                        <div className='grid grid-cols-2 max-w-[1000px] w-full gap-24'>
                            {Benefits.map(({ title, description, logo }, index) => (
                                <div key={index} className='flex flex-col gap-y-8'>
                                    <Image
                                        src={logo}
                                        alt='benefit'
                                        width={0}
                                        height={0}
                                        sizes='100vw'
                                        style={{ width: '100px', height: '100px' }}
                                    />
                                    <div className='flex flex-col gap-y-2'>
                                        <p className='font-Averta-Bold text-3xl'>{title}</p>
                                        <p className='text-neutral-500'>{description}</p>
                                    </div>
                                </div>
                            ))
                            }
                        </div>
                    </div>
                    {/* Make a request */}
                    <div className='w-full h-[393px] relative mt-28 '>
                        <Image
                            src='/images/Career/Request.svg'
                            alt='Logo_Grat'
                            fill
                            className='absolute inset-0 object-cover' />
                        <div className='flex flex-col absolute inset-0 items-center justify-center'>
                            <p className='font-Averta-Bold text-center text-5xl mb-14'>The Ultimate Cleaning Companion</p>
                            <button className="px-14 py-3 bg-[#1b78f2] rounded-xl text-base font-Averta-Semibold tracking-normal leading-loose text-center text-white">
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
    )
}

export default CareerPage