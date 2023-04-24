import React, { useEffect, useState } from 'react';
import { shopifyClient, parseShopifyResponse } from '../../lib/shopify';
import { createClient } from '@supabase/supabase-js';
import Hero from './shop/Hero';
import FourColGridWithHeading from './shop/FourColGridWithHeading';
import ShopScrollerWithHeadline from './shop/ShopScrollerWithHeadline';
import VideoPlayer from './shop/VideoPlayer';
import HeadlineWithSpan from './shop/HeadlineWithSpan';
import EmailSubscription from './shop/EmailSubscription';
import InnerPageSubNav from './shop/InnerPageSubNav';

const supabaseUrl = 'https://pqmjfwmbitodwtpedlle.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const Shop = () => {
  const [collection, setCollection] = useState(
    'gid://shopify/Collection/286718034077'
  );
  const [shopProducts, setShopProducts] = useState(null);
  const [bundleProducts, setBundleProducts] = useState(null);
  const [picksProducts, setPickProducts] = useState(null);
  const [bundles, setBundles] = useState(null);
  const [picks, setPicks] = useState(null);
  const [allCollections, setAllCollections] = useState(null);

  const subNav = [
    {
      name: 'Home',
      link: '#home',
    },
    {
      name: 'Collections',
      link: '#collections',
    },
    {
      name: 'New Arrivals',
      link: '#new',
    },
    {
      name: 'Furniture',
      link: '#design',
    },
    {
      name: 'Rugs',
      link: '#design',
    },
    {
      name: 'Decor',
      link: '#design',
    },
    {
      name: 'Accessories',
      link: '#design',
    },
    {
      name: 'Storage',
      link: '#design',
    },
    // {
    //   name: 'Sale',
    //   link: '#sale',
    // },
    {
      name: "Mel's Picks",
      link: '#melspicks',
    },
  ];

  const sgsDesignItems = [
    {
      image:
        'https://res.cloudinary.com/designadg/image/upload/q_99/v1677720975/SGS/sgs_design_item1_qfx3lk.webp',
      alt: 'FOUNDATIONS & FRAMES',
      headline: 'FOUNDATIONS & FRAMES',
      link: 'https://shopschoolgirlstyle.com/collections/schoolgirl-style-borders',
    },
    {
      image:
        'https://res.cloudinary.com/designadg/image/upload/q_98/v1677720975/SGS/sgs_design_item2_yknmfy.webp',
      alt: 'COORDINATING RUGS',
      headline: 'COORDINATING RUGS',
      link: 'https://shopschoolgirlstyle.com/collections/schoolgirl-style-classroom-area-rugs',
    },
    {
      image:
        'https://res.cloudinary.com/designadg/image/upload/v1677720975/SGS/sgs_design_item3_losi6c.webp',
      alt: 'FINISHING TOUCHES',
      headline: 'FINISHING TOUCHES',
      link: 'https://shopschoolgirlstyle.com/pages/accessories',
    },
    {
      image:
        'https://res.cloudinary.com/designadg/image/upload/v1677720975/SGS/sgs_design_item4_ghqjjr.webp',
      alt: 'STORAGE SOLUTIONS',
      headline: 'STORAGE SOLUTIONS',
      link: 'https://shopschoolgirlstyle.com/pages/classroom-storage',
    },
  ];

  useEffect(() => {
    const getProducts = async () => {
      // const safari = 'gid://shopify/Collection/286718034077';
      // Fetch all the products
      const products = await shopifyClient.collection.fetchWithProducts(
        collection,
        {
          productsFirst: 10,
        }
      );
      setShopProducts(parseShopifyResponse(products));
    };

    const getBundles = async () => {
      const decor = 'gid://shopify/Collection/433233494307';
      // Fetch all the products
      const products = await shopifyClient.collection.fetchWithProducts(decor, {
        productsFirst: 10,
      });
      setBundleProducts(parseShopifyResponse(products));
    };

    const getPicks = async () => {
      const picks = 'gid://shopify/Collection/438218719523';
      // Fetch all the products
      const products = await shopifyClient.collection.fetchWithProducts(picks, {
        productsFirst: 10,
      });
      setPickProducts(parseShopifyResponse(products));
    };

    getProducts();
    getBundles();
    getPicks();
  }, [collection]);

  useEffect(() => {
    async function getData() {
      let { data, error } = await supabase.from('shop_page').select('*');

      if (error) {
        console.warn(error);
      } else if (data) {
        setCollection(data[0].shop_collection);
        setBundles(data[0].shop_bundles);
        setPicks(data[0].shop_picks);
      }
    }

    async function getCollections() {
      await shopifyClient.collection.fetchAll(250).then((collections) => {
        setAllCollections(parseShopifyResponse(collections));
      });
    }

    getData();
    getCollections();
  }, [collection]);

  return (
    <main className='pb-16 relative' id='home'>
      <InnerPageSubNav subNav={subNav} />
      <div className='opacity-25'>
        <Hero
          side='md:bg-gradient-to-l'
          heading='Shop'
          headline='Simply Safari'
          subtext='Explore the wild whimsy of this beloved collection, featuring bold animal prints and a warm, nature-inspired palette.'
          buttonText='Shop Collection'
          buttonColor='bg-gray-900'
          bg='bg-hero-shop-safari'
          textSide='right-10'
          textColor='text-gray-900'
          bodyColor='text-gray-700'
          link='https://shopschoolgirlstyle.com/collections/schoolgirl-style-wild-and-free-classroom-transformation'
        />
      </div>
      <div
        className='flex flex-col pt-16 gap-10 md:gap-16 scroll-mt-24'
        id='collections'
      >
        <ShopScrollerWithHeadline
          items={shopProducts && shopProducts.products}
          itemTextStyle='text-gray-700'
          headline='Shop The Collection'
          bookmark={true}
          collections={allCollections && allCollections}
          collectionId={collection}
          setNewCollection={(val) => setCollection(val)}
        />
        <div className='scroll-mt-24' id='new'>
          <Hero
            side='md:bg-gradient-to-r'
            heading='Shop'
            headline="What's New?"
            subtext='Shop fantastic floral designs, vibrant colors, whimsical patterns, and more inside our seasonal classroom décor!'
            buttonText='Shop The Season'
            buttonColor='bg-neutral-brown'
            bg='bg-hero-shop-new'
            textSide='left-10'
            textColor='text-neutral-brown'
            bodyColor='text-gray-700'
            link='https://shopschoolgirlstyle.com/collections/schoolgirl-style-seasonal-products'
          />
        </div>
        <ShopScrollerWithHeadline
          items={bundleProducts && bundleProducts.products}
          itemTextStyle='uppercase text-gray-700'
          headline='Shop Classroom Decor Bundles'
        />
        <div className='scroll-mt-24' id='furniture design'>
          <Hero
            side='md:bg-gradient-to-l'
            heading='Shop'
            headline='SGS Design'
            subtext='Your one-stop shop for design, furniture, flooring, organizational systems, storage, décor and more!'
            buttonText='Learn More'
            buttonColor='bg-gray-900'
            bg='bg-hero-sgs-design'
            textSide='right-10'
            textColor='text-gray-900'
            bodyColor='text-gray-700'
            link='https://shopschoolgirlstyle.com/pages/sgs-design'
          />
        </div>
        <div className='scroll-mt-24' id='design'>
          <FourColGridWithHeading
            items={sgsDesignItems}
            headline='Shop SGS Design'
            itemTextStyle='uppercase text-gray-500/80 text-base md:text-lg'
            background={true}
          />
        </div>
        <div className='scroll-mt-24' id='melspicks'>
          <Hero
            side='md:bg-gradient-to-r'
            heading='Shop'
            headline="Mel's Picks"
            subtext='From rainbow borders to verdant green décor, Mel’s picks of the week are a true celebration of spring!'
            buttonText='Shop Her Picks'
            buttonColor='bg-neutral-brown'
            bg='bg-hero-shop-picks'
            textSide='left-10'
            textColor='text-neutral-brown'
            bodyColor='text-gray-700'
            link='https://shopschoolgirlstyle.com/collections/mels-picks'
          />
        </div>
        <ShopScrollerWithHeadline
          items={picksProducts && picksProducts.products}
          itemTextStyle='text-gray-700'
          headline='Picks of the Week'
          bookmark={true}
          price
        />
        <div className='flex flex-col'>
          <VideoPlayer
            placeholder={
              'https://res.cloudinary.com/designadg/image/upload/v1677779526/SGS/shop_video_placeholder_go1clz.webp'
            }
            url='https://youtu.be/6Aqu5bC4XEk'
          />
          <div className='bg-gradient-to-b from-khaki space-y-16'>
            <HeadlineWithSpan link='https://shopschoolgirlstyle.com/pages/sgs-lookbook' />
            <EmailSubscription />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Shop;
