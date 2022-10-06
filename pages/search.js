import Head from 'next/head'
import { useRouter } from 'next/router'
import { fetchData } from '../lib/data'
import Header from '../components/Header'
import Footer from '../components/Footer'
import InfoCard from '../components/InfoCard'
import MapFrame from '../components/MapFrame'
import { format } from 'date-fns'

export default function Search({ searchResults }) {
  const router = useRouter()
  const { location, start, end, guests } = router.query
  const fStartDate = format(new Date(start), 'dd MMMM yy')
  const fEndDate = format(new Date(end), 'dd MMMM yy')
  const range = `${fStartDate} - ${fEndDate}`

  return (
    <div>
      <Head>
        <title>Mavi | Airbnb - Search Results</title>
      </Head>

      <Header placeholder={`${location} | ${range} | ${guests} guests`} />

      <main className="flex relative">
        <section className="grow pt-14 px-6">
          <p className="text-sm font-medium">100+ stays - {range} - for {guests > 1 ? `${guests} guests` : 'one'}</p>
          <h1 className="text-3xl font-bold mt-2 mb-6">Stays in {location}</h1>
          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap text-xs">
            <p className="pill">Cancelation Flexibility</p>
            <p className="pill">Type of Place</p>
            <p className="pill">Price</p>
            <p className="pill">Rooms and beds</p>
            <p className="pill">More Filters</p>
          </div>
          <div>
            {/* {searchResults?.map((item, idx) => (
              <InfoCard key={idx} {...item} />
            ))} */}
          </div>
        </section>

        <section className="hidden xl:inline-flex xl:min-w-[500px] h-screen fixed right-0">
          <MapFrame searchResults={searchResults} />
        </section>
      </main>
      <Footer />
    </div>
  )
}

export async function getServerSideProps() {
  const [searchResults] = await fetchData('https://links.papareact.com/isz')
  return {
    props: { searchResults }
  }
}