'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react';

 
export default function NotFound() {
  const router = useRouter();
  const [href, setHref] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHref(window.location.href);
    }
  }, []);

  return (
    <section className='center bg-primary-100 h-screen'>
      <div className='w-[40rem] center flex-col bg-white rounded-lg h-[15rem]'>
        <h1 className='font-bold'>Not Found</h1>
        <p className='text-xl font-semibold text-primary-300'>Could not find requested resource on</p>
        <p className='description line-clamp-1 max-w-full'>{href}</p>
        <button className='btn-primary1 btn_primary_noOutline mt-5 py-1.5 px-5 ' onClick={() => router.back()}>Return Back</button>
      </div>
    </section>
  )
}




// import { headers } from 'next/headers'
  // const headersList = await headers()
  // const path = headersList.get('referer');