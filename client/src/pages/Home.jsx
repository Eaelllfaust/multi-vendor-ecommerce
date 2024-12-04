import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Headers from '../components/Headers'
import Banner from '../components/Banner'
import Categorys from '../components/Categorys'
import FeatureProducts from '../components/products/FeatureProducts'
import Products from '../components/products/Products'
import Footer from '../components/Footer'
import { Button } from "../components/ui/button"
import { get_category, get_products } from '../store/reducers/homeReducer'
const Home = () => {
    const dispatch = useDispatch()
    const {products, latest_product, topRated_product, discount_product } = useSelector(state => state.home)
    useEffect(() => {
        dispatch(get_products())
    }, [])
    return (
        <div className='dark w-full '>
            <Headers />
            <Banner />
            <div className='my-4'>
                <Categorys />
                
            </div>

            <div className='py-[45px]'>
                <FeatureProducts products={products} />
            </div>
            <div className='py-10'>
                <div className='w-[85%] flex flex-wrap mx-auto'>
                    <div className="grid w-full grid-cols-3 md-lg:grid-cols-2 md:grid-cols-1 gap-7">
                        <div className='overflow-hidden'>
                            <Products title='Latest Product' products={latest_product} />
                        </div>
                        <div className='overflow-hidden'>
                            <Products title='Top Rated Product' products={topRated_product} />
                        </div>
                        <div className='overflow-hidden'>
                            <Products title='Discount Product' products={discount_product} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home