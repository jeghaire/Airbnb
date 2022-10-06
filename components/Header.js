import { useState } from 'react'
import Image from 'next/image'
import { SearchIcon, GlobeAltIcon, MenuIcon, UserCircleIcon, UsersIcon } from '@heroicons/react/solid'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { DateRangePicker } from 'react-date-range'
import { useRouter } from 'next/router'

function Header({ placeholder }) {
  const [searchInput, setSearchInput] = useState('')
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [numberOfGuests, setNumberOfGuests] = useState(1)
  const router = useRouter()

  const selectionRange = {
    startDate,
    endDate,
    key: 'selection'
  }

  const handleDateSelected = (ranges) => {
    const { startDate, endDate } = ranges.selection
    setStartDate(startDate)
    setEndDate(endDate)
  }

  const resetInput = () => setSearchInput('')

  const loadSearch = () => {
    resetInput()
    router.push({
      pathname: '/search',
      query: {
        location: searchInput,
        start: startDate.toISOString().slice(0, 10),
        end: endDate.toISOString().slice(0, 10),
        guests: numberOfGuests
      }
    })
  }

  return (
    <header className="sticky top-0 z-10 grid grid-cols-3 bg-white items-center shadow-md px-2 py-2 md:px-8">
      <div onClick={() => router.push('/')} className="flex items-center h-12 m-auto cursor-pointer">
        <Image
          src="/favicon.svg"
          width="28"
          height="28"
          // src="/airbnb-belo.svg"
          // width="90"
          // height="90"
          objectFit="contain"
          objectPosition="left"
        />
      </div>
      <div className="flex items-center md:border-2 md:shadow-sm md:rounded-full p-1 max-w-1/3 slashed-zero">
        <input
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          type="text"
          placeholder={placeholder || "Search, make a booking"}
          className="grow px-2 py-2 truncate border-b md:border-none max-w-full text-xs text-gray-600 placeholder:text-gray-400 outline-none bg-transparent"
        />
        <SearchIcon className="hidden md:inline-flex w-8 h-8 p-2 m-auto bg-[#FF5A5F] text-white rounded-full cursor-pointer" />
      </div>
      <div className="flex space-x-4 items-center justify-center text-gray-500 overflow-hidden">
        <p className="hidden sm:inline text-xs cursor-pointer hover:underline">Become a host</p>
        <GlobeAltIcon className="hidden sm:inline-flex w-6 h-6 cursor-pointer" />
        <div className="flex items-center space-x-2 border-2 p-1.5 rounded-full">
          <MenuIcon className="w-6 h-6 cursor-pointer" />
          <UserCircleIcon className="w-6 h-6 cursor-pointer" />
        </div>
      </div>
      {searchInput && (
        <div className="flex flex-col col-span-3 m-auto mt-3">
          <DateRangePicker
            ranges={[selectionRange]}
            min={new Date()}
            rangeColors={['#FF5A5F']}
            onChange={handleDateSelected}
          />
          <div className="flex items-center border-b py-2 mb-2">
            <h2 className="2xl font-semibold">Number of Guests</h2>
            <UsersIcon className="h-5 w-5 ml-auto" />
            <input type="number" min={1} value={numberOfGuests} onChange={e => setNumberOfGuests(e.target.value)} name="" className="w-12 outline-none pl-2 text-xs text-red-500" />
          </div>
          <div className="flex items-center mb-4">
            <button onClick={resetInput} className="grow text-sm text-gray-500 rounded-lg py-1 mr-4">Cancel</button>
            <button onClick={loadSearch} className="grow text-sm text-[#FF5A5F] rounded-lg py-1 ml-4">Search</button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
