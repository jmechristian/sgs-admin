import React, { useRef, useState } from 'react';
import { PlayIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence, useInView } from 'framer-motion';

export const PlayerIcon = () => {
  return (
    <div className='w-28 h-28 md:w-40 md:h-40 rounded-full border-white bg-gray/30 backdrop-blur-md shadow-2xl border-8 absolute flex justify-center items-center z-5'>
      <PlayIcon className='w-20 ml-3 md:w-24 md:ml-4 h-full fill-white leading-none inline-flex' />
    </div>
  );
};

const VideoPlayer = ({ placeholder, url }) => {
  const videoRef = useRef();
  const inView = useInView(videoRef);

  const [isPlaying, setPlaying] = useState(true);

  const variants = {
    show: {
      opacity: 0.2,
      transition: {
        delay: 0.2,
        ease: 'easeInOut',
        duration: 0.5,
      },
    },
    hide: {
      opacity: 0,
      transition: {
        delay: 0.2,
        ease: 'easeInOut',
        duration: 0.5,
      },
    },
  };

  const playVideo = () => {
    // if (inView) {
    //   setPlaying(true);
    // } else {
    //   setPlaying(false);
    // }
    console.log(inView);
  };

  return (
    <AnimatePresence>
      <motion.div
        className='w-full h-60 md:h-[600px] max-w-[1440px] mx-auto aspect-video relative'
        ref={videoRef}
        variants={variants}
        initial='hide'
        animate={inView ? 'show' : 'hide'}
        layout
      >
        <img src={placeholder} alt='Thumbnail' />
      </motion.div>
    </AnimatePresence>
  );
};

export default VideoPlayer;
