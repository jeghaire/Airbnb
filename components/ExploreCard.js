import Image from 'next/image';

export default function ExploreCard({ img, location, distance }) {
  return (
    <div className="group flex items-center m-2 mt-5 space-x-4 rounded-xl cursor-pointer hover:shadow-lg hover:border hover:scale-[1.05] transition transform duration-300 ease-out">
      <div className="relative rounded-lg w-16 h-16 scale-[1.05] group-hover:scale-[0.8] shadow-xl group-hover:shadow-sm transition transform duration-300 ease-in-out">
        <Image
          src={img}
          layout="fill"
          className="rounded-lg"
        /></div>
      <div>
        <h2 className="font-medium">{location}</h2>
        <h3 className="text-gray-500 text-sm">{distance}</h3>
      </div>
    </div>
  )
}