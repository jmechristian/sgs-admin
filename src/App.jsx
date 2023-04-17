import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { shopifyClient, parseShopifyResponse } from '../lib/shopify';

const supabaseUrl = 'https://pqmjfwmbitodwtpedlle.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  const [collection, setCollection] = useState(null);
  const [collectionTitle, setCollectionTitle] = useState(null);
  const [bundles, setBundles] = useState(null);
  const [bundlesTitle, setBundlesTitle] = useState(null);
  const [picks, setPicks] = useState(null);
  const [picksTitle, setPicksTitle] = useState(null);
  const [allCollections, setAllCollections] = useState(null);

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
  }, []);

  useEffect(() => {
    if (collection) {
      const getCollectionTitle = async () => {
        const collectionTitle = await shopifyClient.collection.fetch(
          collection
        );
        const collTitle = parseShopifyResponse(collectionTitle);
        setCollectionTitle(collTitle.title);
      };
      getCollectionTitle();
    }

    if (bundles) {
      const getBundleTitle = async () => {
        const collectionTitle = await shopifyClient.collection.fetch(bundles);
        const collTitle = parseShopifyResponse(collectionTitle);
        setBundlesTitle(collTitle.title);
      };
      getBundleTitle();
    }

    if (picks) {
      const getPicksTitle = async () => {
        const collectionTitle = await shopifyClient.collection.fetch(picks);
        const collTitle = parseShopifyResponse(collectionTitle);
        setPicksTitle(collTitle.title);
      };
      getPicksTitle();
    }
  }, [collection, bundles, picks]);

  return (
    <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-3xl py-36'>
        <div className='flex flex-col divide-y'>
          <div className='flex justify-between items-center'>
            <div className='flex flex-col gap-1 py-6'>
              <div className='text-gray font-bold text-2xl'>
                Shop the Collection
              </div>
              <div>{collectionTitle && collectionTitle}</div>
            </div>
            <div className='bg-indigo-600 text-white font-semibold text-lg h-min px-4 py-2 rounded-lg'>
              Change
            </div>
          </div>
          <div className='flex justify-between items-center'>
            <div className='flex flex-col gap-1 py-6'>
              <div className='text-gray font-bold text-2xl'>Shop Bundles</div>
              <div>{bundlesTitle && bundlesTitle}</div>
            </div>
            <div className='bg-indigo-600 text-white font-semibold text-lg h-min px-4 py-2 rounded-lg'>
              Change
            </div>
          </div>
          <div className='flex justify-between items-center'>
            <div className='flex flex-col gap-1 py-6'>
              <div className='text-gray font-bold text-2xl'>Shop Picks</div>
              <div>{picksTitle && picksTitle}</div>
            </div>
            <div className='bg-indigo-600 text-white font-semibold text-lg h-min px-4 py-2 rounded-lg'>
              Change
            </div>
          </div>
          <div className='py-12 flex gap-2'>
            <div className='font-semibold'>Total Collection Count:</div>
            <div>{allCollections && allCollections.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
