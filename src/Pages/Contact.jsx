import React, { useState } from 'react'
import Container from '../components/Container'
import SocialIcons from '../components/SocialIcons';

let email = 'yogeshpatade2019@gmail.com';
let phone = '+91 9022185486';



const Contact = () => {

  const [isCopied, setIsCopied] = useState(false);
  const [copiedValueType, setCopiedValueType] = useState(null);

  const copyTextToClipboard = async (text) => {
    // Implementation of copying text to clipboard.
    // Example using the Clipboard API:
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error('Failed to copy: ', err);
      return false;
    }
  };

  const handleCopyClick = async (text, type) => {
    try {
      await copyTextToClipboard(text);
      setIsCopied(true);
      setCopiedValueType(type);
      let timeoutId = setTimeout(() => {
        setIsCopied(false);
        setCopiedValueType(null);
        clearTimeout(timeoutId);
      }, 1500);
    } catch (error) {
      setIsCopied(false);
      setCopiedValueType(null);
      alert('Unable to copy!');
    }
  };

  return (

    <Container>
      <div className="flex flex-col items-center space-y-4">
        <div className="self-center ">
          <div
            className='flex items-center justify-center rounded-xl bg-gray-200 px-5 py-1 dark:bg-[#374151] dark:text-[#D1D5DB]'
          >
            <h2 className="font-medium text-sm">
              Get in touch
            </h2>
          </div>
        </div>
        <p className="max-w-xl text-center text-lg md:text-xl dark:text-[#D1D5DB] ">
          What’s next? Feel free to reach out to me if you are looking for a
          developer, have a query, or simply want to connect.
        </p>
      </div>

      <div className="flex flex-col mt-6 md:mt-12 dark:text-[#D1D5DB]  items-center space-y-6 md:space-y-12">
        <div className="flex flex-col items-center space-y-6 md:space-y-12">
          <div className="flex items-center gap-4 md:gap-5">
            <svg className="h-6 w-6 md:h-8 md:w-8" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
            {/* <Link href={`mailto:${email}`}> */}
            <h2 className="text-lg md:text-4xl font-semibold tracking-[-0.02em] dark:text-[#F9FAFB] text-gray-900">{email}</h2>
            {/* </Link> */}
            <button className='relative'
              onClick={() => handleCopyClick(email, 'email')}


            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
              {isCopied && copiedValueType === 'email' ?
                <span className="absolute dark:bg-[#374151] -top-8 rounded-lg bg-gray-200 px-2 py-1 text-sm">
                  Copied!
                </span>
                : null}
            </button>
          </div>
          <div className="flex items-center gap-4 md:gap-5">

            <svg className="h-6 w-6 md:h-8 md:w-8" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
            {/* <Link href={`tel:${phone.replace(' ', '')}`}> */}
            <h2 className="text-lg md:text-4xl font-semibold tracking-[-0.02em]  dark:text-[#F9FAFB] text-gray-900">{phone}</h2>
            {/* </Link> */}
            <button
              className='relative'
              // size={width && width < 768 ? 'md' : 'lg'}
              onClick={() => handleCopyClick(phone.replace(' ', ''), 'phone')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
              {isCopied && copiedValueType === 'phone' ?


                <span className="absolute -top-8 rounded-lg bg-gray-200 dark:bg-[#374151] px-2 py-1 text-sm">
                  Copied!
                </span> : null
              }
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-center">
            You may also find me on these platforms!
          </p>
          <SocialIcons />
        </div>
      </div>
    </Container>
  )
}

export default Contact
