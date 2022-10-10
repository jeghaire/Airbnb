import Image from 'next/image'

export default function Banner({ callOut }) {
  return (
    <>
      <div className="relative min-h-[600px] objectfit-contain">
        <div className="hidden md:block">
          <Image
            priority
            src="/hero.jpg"
            layout="fill"
            objectFit="cover"
            alt=""
          />
        </div>
        <div className="md:hidden">
          <Image
            priority
            src="/hero-sm.jpg"
            layout="fill"
            objectFit="cover"
            alt=""
          />
        </div>
        <div className="absolute h-full w-full flex flex-col justify-center p-4 sm:px-24 -translate-y-24 md:-translate-y-12">
          <div className="p-4 pl-5 md:p-7 md:pl-8 rounded-lg bg-white/30 backdrop-blur-lg max-w-md lg:max-w-lg m-auto sm:m-0">
            <h1 className="font-display text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-6 md:leading-tight">{callOut}</h1>
            <button className="text-md text-purple-500 max-w-[170px] outline-none font-semibold bg-white px-8 py-3 shadow-md rounded-full my-3 font-bold hover:shadow-xl active:scale-[0.96] active:ring-2 active:ring-offset-2 active:ring-white active:ring-offset-gray-400 transition duration-150 ease-in-out">I&apos;m flexible</button>
          </div>
        </div>
      </div>
    </>
  )
}