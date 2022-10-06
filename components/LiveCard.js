import Image from 'next/image';

export default function LiveCard({ img, title }) {
  return (
    <div className="cursor-pointer hover:scale-[1.05] transition transform duration-300 ease-out">
      <div className="relative w-72 h-72">
        <Image
          src={img}
          layout="fill"
          className="rounded-xl"
        /></div>
      <h3 className="text-xl font-medium mt-3">{title}</h3>
    </div>
  )
}
