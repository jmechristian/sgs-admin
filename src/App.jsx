import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { shopifyClient, parseShopifyResponse } from '../lib/shopify';

const supabaseUrl = 'https://pqmjfwmbitodwtpedlle.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  const [collection, setCollection] = useState(null);
  const [bundles, setBundles] = useState(null);
  const [picks, setPicks] = useState(null);
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
        console.log('data:', data);
      }
    }

    async function getCollections() {
      await shopifyClient.collection.fetchAll().then((collections) => {
        setAllCollections(collections);
      });
    }

    getData();
    getCollections();
  }, []);

  return (
    <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-3xl py-36'>
        <div className='flex flex-col divide-y'>
          <div className='flex justify-between items-center'>
            <div className='flex flex-col gap-1 py-6'>
              <div className='text-gray font-bold text-2xl'>
                Shop the Collection
              </div>
              <div>{collection && collection}</div>
            </div>
            <div className='bg-indigo-600 text-white font-semibold text-lg h-min px-4 py-2 rounded-lg'>
              Change
            </div>
          </div>
          <div className='flex justify-between items-center'>
            <div className='flex flex-col gap-1 py-6'>
              <div className='text-gray font-bold text-2xl'>Shop Bundles</div>
              <div>{bundles && bundles}</div>
            </div>
            <div className='bg-indigo-600 text-white font-semibold text-lg h-min px-4 py-2 rounded-lg'>
              Change
            </div>
          </div>
          <div className='flex justify-between items-center'>
            <div className='flex flex-col gap-1 py-6'>
              <div className='text-gray font-bold text-2xl'>Shop Picks</div>
              <div>{picks && picks}</div>
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
