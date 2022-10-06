import Head from 'next/head'
import Header from '../components/Header'
import Banner from '../components/Banner'
import ExploreCard from '../components/ExploreCard'
import { fetchData } from '../lib/data'
import LiveCard from '../components/LiveCard'
import BannerCard from '../components/BannerCard'
import Footer from '../components/Footer'
import places from '../utils/explore-data.json'
import placesLive from '../utils/live-data.json'


export default function Home({ exploreData, liveData }) {
  return (
    <>
      <Head>
        <title>Mavi | Airbnb Clone</title>
        <meta name="description" content="Mavi's Airbnb clone created using react.js, next.js and tailwind css" />
      </Head>
      <Header />
      <Banner callOut='Drop your schedule on us. We gat you.' /> {/*Not sure where to go? Perfect */}
      <main className="max-w-7xl m-auto px-6 sm:px-16">
        <section className="pt-12">
          <h2 className="font-display text-4xl font-bold pb-5">Explore Nearby</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {exploreData?.map(places => <ExploreCard key={places.id} {...places} />)}
          </div>
        </section>
        <section className="pt-5">
          <h2 className="font-display text-4xl font-bold py-8">Live Anywhere</h2>
          <div className="flex space-x-3 p-3 -ml-3 overflow-x-scroll scrollbar-hide">
            {liveData?.map((places, idx) => <LiveCard key={idx} {...places} />)}
          </div>
        </section>
        <BannerCard
          img="https://links.papareact.com/4cj"
          title="Mind-blowing Outdoor experiences"
          desc="Wishlists curated by Airbnb"
          btnText="Get Inspired"
        />
      </main>
      <Footer />
    </>
  )
}

export async function getStaticProps() {
  const [exploreData] = await fetchData('https://links.papareact.com/pyp')
  const [liveData] = await fetchData('https://links.papareact.com/zp1')
  return {
    props: {
      exploreData: places || exploreData,
      liveData
    }
  }
}