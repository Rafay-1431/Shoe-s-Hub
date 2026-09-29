import React from 'react'
import Hero from '../Components/Hero'
import CategorySection from '../Components/CategorySection'
import FeaturedProducts from '../Components/FeaturedProducts'
import PromoBanner from '../Components/PromoBanner'

function Home() {
  return (
    <>
    <Hero/>
    <CategorySection/>
    <FeaturedProducts/>
    <PromoBanner/>
    </>
  )
}

export default Home