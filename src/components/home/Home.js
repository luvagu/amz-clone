import React from 'react'
import './Home.css'
import Product from '../product/Product'

function Home() {
    return (
        <div className="home">
            <div className="home__container">
                <img className="home__image" src="https://images-eu.ssl-images-amazon.com/images/G/02/AmazonMusic/2020/Marketing/012020_AMHD_Q1/UK-EN_012020_AMUHD_Q1promo_OS_GW_Hero_D_1500x600_1X_CV2A._CB426601584_.jpg" alt="" />

                <div className="home__row">
                    <Product 
                        id='121326545'
                        title='The Unspoken by Ian K. Smith'
                        price={14.99}
                        rating={3}
                        image='https://d188rgcu4zozwl.cloudfront.net/content/B0831GGQS7/resources/945262513'
                    />
                    <Product 
                        id='56456456'
                        title='Echo Dot with The Child stand'
                        price={79.99}
                        rating={2}
                        image='https://images-na.ssl-images-amazon.com/images/G/01/kindle/journeys/M2RjMzI2ZGUt/M2RjMzI2ZGUt-NjkwMjZhZDEt-w379._SY304_CB406624432_.jpg'
                    />
                </div>
                <div className="home__row">
                    <Product 
                        id='565747'
                        title='BedStory Memory Foam and Gel Mattress Topper'
                        price={92}
                        rating={3}
                        image='https://m.media-amazon.com/images/I/51-FuxBJX0L._AC_SY240_.jpg'
                    />
                    <Product 
                        id='89778978'
                        title='Samsung Galaxy Buds Live'
                        price={169}
                        rating={4}
                        image='https://m.media-amazon.com/images/I/71erU4SrO3L._AC_UY218_.jpg'
                    />
                    <Product 
                        id='24345465'
                        title='Samsung Electronics Galaxy Note 20 Ultra 5G Factory Unlocked '
                        price={1099.99}
                        rating={5}
                        image='https://m.media-amazon.com/images/I/813y2+dPUOL._AC_UY218_.jpg'
                    />
                </div>
                <div className="home__row">
                    <Product 
                        id='97807866'
                        title='Samsung 49-Inch CRG9 Curved Gaming Monitor'
                        price={1199.99}
                        rating={5}
                        image='https://images-na.ssl-images-amazon.com/images/I/71tZW1aa%2BPL._AC_SL1500_.jpg'
                    />
                </div>
            </div>
        </div>
    )
}

export default Home
