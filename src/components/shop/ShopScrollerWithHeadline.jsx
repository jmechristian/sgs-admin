import React, { useState } from 'react';
import { motion, useMotionValue, animate, useScroll } from 'framer-motion';
import ShopScrollerItem from './ShopScrollerItem';
import NewScroller from './NewScroller';

const ShopScrollerWithHeadline = ({
  items,
  headline,
  itemTextStyle,
  background,
  bookmark,
  collections,
  collectionId,
  setNewCollection,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState();

  return (
    <div className='relative w-full mx-auto flex flex-col gap-6'>
      <div className='px-6 text-gray-600 font-light'>
        <div className='flex flex-col gap-6 justify-center items-center'>
          <div className='font-canela text-3xl md:text-5xl'>{headline}</div>
          {isEditing ? (
            <form className='flex gap-4 items-center justify-center'>
              <select
                id='location'
                name='location'
                className='block rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6'
                onChange={(e) => setNewCollection(e.target.value)}
                value={collectionId}
              >
                {collections &&
                  collections.map((col) => (
                    <option value={col.id} key={col.id}>
                      {col.title}
                    </option>
                  ))}
              </select>
              <button
                type='submit'
                className='bg-black/90 text-white text-sm font-semibold font-sans py-1.5 px-4 rounded'
              >
                Submit
              </button>
            </form>
          ) : (
            <button
              className='text-sm font-sans font-bold text-white bg-black px-2 py-1 rounded h-full'
              onClick={setIsEditing(true)}
            >
              Change Collection
            </button>
          )}
        </div>
      </div>
      <div className='flex gap-3 max-w-[1440px] mx-auto px-6 w-full overflow-hidden relative'>
        <NewScroller>
          {items &&
            items.map((it, i) => (
              <motion.div
                className='w-[250px] md:w-[300px] h-full snap-x snap-mandatory snap-always touch-manipulation'
                key={it.id}
              >
                <ShopScrollerItem
                  image={it.images ? it.images[0].src : ''}
                  alt={
                    it.featuredImage ? it.featuredImage.node.altText : it.alt
                  }
                  headline={it.title ? it.title : it.headline}
                  text={itemTextStyle}
                  subheadline={it.subheadline}
                  background={background}
                  price={it.variants[0].price.amount}
                  slug={it.slug ? it.slug : '/#'}
                />
              </motion.div>
            ))}
        </NewScroller>
      </div>
    </div>
  );
};

export default ShopScrollerWithHeadline;
