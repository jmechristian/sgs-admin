import React from 'react';
import { GridItem } from './GridItem';

const FourColGridWithHeading = ({
  items,
  headline,
  itemTextStyle,
  background,
}) => {
  return (
    <div className='w-full flex flex-col items-center gap-8 cursor-pointer'>
      <div className='text-3xl md:text-5xl px-6 text-center font-canela text-gray-600 font-light pb-2 mb-2'>
        {headline}
      </div>
      <div className='grid grid-cols-2 md:grid-cols-4 w-full max-w-7xl px-6 mx-auto gap-9 overflow-hidden'>
        {items &&
          items.map((it, i) => (
            <div key={it.headline}>
              <GridItem
                image={it.image}
                alt={it.alt}
                headline={it.headline}
                text={itemTextStyle}
                background={background}
                link={it.link}
                job={it.job ? it.job : ''}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default FourColGridWithHeading;
