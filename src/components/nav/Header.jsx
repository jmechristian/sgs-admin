import { Fragment, useRef } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Logo from '../Logo';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Header() {
  const variants = {
    show: {
      opacity: 1,
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

  return (
    <Popover className='relative bg-white'>
      <motion.div
        className='flex items-center justify-between p-6 xl:py-9 xl:justify-start xl:space-x-10 max-w-7xl mx-auto'
        variants={variants}
        initial='hide'
        animate='show'
      >
        <motion.div className='flex justify-start items-center lg:w-0 lg:flex-1'>
          <a href='/'>
            <span className='sr-only'>Schoolgirl Style</span>
            <motion.div className='fill-brand-red stroke-brand-red stroke-1 w-48 sm:w-60 md:w-72 lg:w-80 block'>
              <Logo />
            </motion.div>
          </a>
        </motion.div>
        <motion.div className='-my-2 -mr-2 xl:hidden'>
          <Popover.Button className='inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500'>
            <span className='sr-only'>Open menu</span>
            <Bars3Icon className='h-6 w-6 md:h-8 md:w-8' aria-hidden='true' />
          </Popover.Button>
          <Popover.Overlay className='fixed inset-0 bg-black opacity-50 z-[60]' />
        </motion.div>
        <nav className='hidden space-x-7 xl:space-x-8 xl:flex uppercase'>
          <a
            href='/shop'
            className='text-sm font-medium text-gray-500 hover:text-gray-900 font-brown'
          >
            Shop
          </a>
          <a
            href='/watch'
            className='text-sm font-medium text-gray-500 hover:text-gray-900 font-brown'
          >
            Watch
          </a>
          <a
            href='/visit'
            className='text-sm font-medium text-gray-500 hover:text-gray-900 font-brown'
          >
            Visit
          </a>
          <a
            href='/blog'
            className='text-sm font-medium text-gray-500 hover:text-gray-900 font-brown'
          >
            Blog
          </a>
          <a
            href='/giving'
            className='text-sm font-medium text-gray-500 hover:text-gray-900 font-brown'
          >
            Giving Back
          </a>
          <a
            href='/about'
            className='text-sm font-medium text-gray-500 hover:text-gray-900 font-brown'
          >
            About
          </a>
          {/* <div>&#10072;</div>
          <a
            href='/signin'
            className='text-sm font-medium text-gray-500 hover:text-gray-900 font-brown'
          >
            Sign In
          </a>
          <a
            href='/signup'
            className='text-sm font-medium text-gray-500 hover:text-gray-900 font-brown'
          >
            Sign Up
          </a>
          <div>
            <BookmarkIcon className='w-5 h-5 stroke-gray-500' />
          </div>
          <div>
            <MagnifyingGlassIcon className='w-5 h-5 stroke-gray-500' />
          </div> */}
        </nav>
      </motion.div>

      <Transition
        as={Fragment}
        enter='duration-200 ease-out'
        enterFrom='opacity-0 scale-95'
        enterTo='opacity-100 scale-100'
        leave='duration-100 ease-in'
        leaveFrom='opacity-100 scale-100'
        leaveTo='opacity-0 scale-95'
      >
        <Popover.Panel
          focus
          className='absolute inset-x-0 z-[70] top-0 origin-top-right transform p-2 transition xl:hidden'
        >
          <div className='divide-white/40 rounded-lg bg-light-grey shadow-lg ring-1 ring-black ring-opacity-5'>
            <div className='px-5 pt-5 pb-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <Logo />
                </div>
                <div className='-mr-2'>
                  <Popover.Button className='inline-flex items-center justify-center rounded-md bg-white/40 p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500'>
                    <span className='sr-only'>Close menu</span>
                    <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className='py-6 px-5'>
              <div className='grid grid-cols-1 gap-3'>
                <Popover.Button
                  href='/shop'
                  className='font-canela text-5xl text-gray-700'
                >
                  Shop
                </Popover.Button>
                <Popover.Button
                  href='/watch'
                  className='font-canela text-5xl text-gray-700'
                >
                  Watch
                </Popover.Button>
                <Popover.Button
                  href='/visit'
                  className='font-canela text-5xl text-gray-700'
                >
                  Visit
                </Popover.Button>
                <Popover.Button
                  href='/blog'
                  className='font-canela text-5xl text-gray-700'
                >
                  Blog
                </Popover.Button>
                <Popover.Button
                  href='/giving'
                  className='font-canela text-5xl text-gray-700'
                >
                  Giving Back
                </Popover.Button>
                <Popover.Button
                  href='/about'
                  className='font-canela text-5xl text-gray-700'
                >
                  About
                </Popover.Button>
              </div>
              <div className='mt-6'>
                <a
                  href='#'
                  className='flex w-full items-center justify-center rounded-md border border-transparent bg-brand-red px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-warm-brown'
                >
                  Sign up
                </a>
                <p className='mt-6 text-center text-base font-medium text-gray-500'>
                  Existing customer?{' '}
                  <a href='#' className='text-brand-red hover:text-warm-brown'>
                    Sign in
                  </a>
                </p>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
