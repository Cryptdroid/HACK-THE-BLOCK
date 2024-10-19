import React,{useEffect,useState,useRef} from 'react'
import '../style.css'

const Hero = () => {
  const [progressStartValue, setProgressStartValue] = useState(0);
  const circularProgressRef = useRef(null);
  const progressValueRef = useRef(null);
  const progressEndValue = 100;
  const speed = 100;

  useEffect(() => {
    const progress = setInterval(() => {
      setProgressStartValue((prev) => {
        if (prev < progressEndValue) {
          const newValue = prev + 1;
          if (progressValueRef.current) {
            progressValueRef.current.textContent = `${newValue}%`;
          }
          if (circularProgressRef.current) {
            circularProgressRef.current.style.background = `conic-gradient(#7d2ae8 ${newValue * 3.6}deg, #ededed 0deg)`;
          }
          return newValue;
        } else {
          clearInterval(progress);
          return prev;
        }
      });
    }, speed);

    return () => clearInterval(progress);
  }, []);

  return (
    <div className='w-full bg-[#F2E3FF] h-full border-t-2 border-[#F2E3FF]'>
      <div className='w-full h-fit mt-12 px-32 flex'>
        <div className='w-fit h-fit flex shadow-xl drop-shadow-lg'>
          <div className='bg-white rounded-l-xl'>
              <div className='triangle w-[430px] rounded-lg flex bg-gradient-to-r from-[#4D00B4] to-[#6500B4]'>
                <div className='p-2'>
                  <svg width="101" height="101" viewBox="0 0 101 101" fill="none">
                  <path d="M50.5 0L72.4675 12.4512L94.2343 25.25L94.435 50.5L94.2343 75.75L72.4675 88.5488L50.5 101L28.5325 88.5488L6.76572 75.75L6.565 50.5L6.76572 25.25L28.5325 12.4512L50.5 0Z" fill="url(#paint0_radial)"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M31.9907 21.1035C31.1398 29.8012 32.3877 49.2953 44.1863 57.6904V62.2283H47.5895C47.6841 65.8208 46.1147 73.4596 39.081 75.2748H33.9758V76.4093H50.4247V76.4102H66.8747V75.2758H61.7695C54.7358 73.4606 53.1664 65.8218 53.2609 62.2293H56.6642V57.6914C68.4627 49.2962 69.7107 29.8021 68.8598 21.1045H50.4257V21.1035H31.9907Z" fill="url(#paint1_linear)"></path><rect x="30.6435" y="76.125" width="39.1395" height="4.53791" fill="#FF9900"></rect><rect x="34.0467" y="77.8281" width="32.8998" height="1.13448" fill="#FFB801">
                  </rect>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M45.9387 27.9062L56.5915 28.3825L60.9044 37.9673L54.8197 46.7271L44.109 46.0411L39.718 35.656L45.9387 27.9062ZM53.7486 33.4311L46.0282 36.805L52.6287 41.9094L53.7486 33.4311ZM52.8548 31.7405L46.6848 29.0834L45.3888 34.6702L52.8548 31.7405ZM51.2909 43.1937L44.5854 38.4046L44.7476 44.8941L51.2909 43.1937ZM59.8333 37.9461L55.2639 33.3084L54.0578 42.2266L59.8333 37.9461ZM52.8631 44.2369L47.2079 45.7153L53.8583 46.1412L52.8631 44.2369ZM58.9403 40.0503L53.99 43.7387L54.9737 45.6615L58.9403 40.0503ZM56.5988 29.7217L55.6373 31.6959L59.2162 35.3346L56.5988 29.7217ZM55.4008 28.7769L49.1163 28.5218L54.3003 30.7897L55.4008 28.7769ZM45.021 29.6899L40.6191 35.2494L43.5621 35.8729L45.021 29.6899ZM43.3846 36.9635L40.4274 36.3373L43.513 43.6081L43.3846 36.9635Z" fill="white"></path><circle cx="68.932" cy="25.9209" r="1.98534" fill="#FF9900"></circle><circle cx="64.962" cy="48.6123" r="1.98534" fill="#FF9900"></circle><circle cx="36.032" cy="48.6123" r="1.98534" fill="#FF9900"></circle><circle cx="31.4938" cy="25.9209" r="1.98534" fill="#FF9900"></circle><path fill-rule="evenodd" clip-rule="evenodd" d="M76.1302 27.6971C76.664 28.6584 76.9338 29.8677 76.8719 31.3515C76.8084 32.8752 76.2615 34.5491 75.4723 36.2192C74.6782 37.8998 73.6113 39.6336 72.4502 41.2913C70.1288 44.6055 67.3865 47.6779 65.5623 49.5021L64.359 48.2988C66.1273 46.5305 68.8021 43.5334 71.0564 40.315C72.1833 38.7062 73.1939 37.0579 73.9337 35.4922C74.6784 33.9161 75.1217 32.4796 75.1717 31.2806C75.2233 30.0417 74.9943 29.1569 74.6425 28.5234C74.2926 27.8933 73.7913 27.4578 73.2058 27.1616C72.0002 26.5519 70.454 26.5472 69.3818 26.7616L69.0481 25.0929C70.3394 24.8347 72.3101 24.8016 73.9738 25.6431C74.8229 26.0725 75.5944 26.7324 76.1302 27.6971Z" fill="#FF9900"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M24.8698 27.6971C24.336 28.6584 24.0662 29.8677 24.1281 31.3515C24.1916 32.8752 24.7385 34.5491 25.5277 36.2192C26.3218 37.8998 27.3887 39.6336 28.5498 41.2913C30.8712 44.6055 33.6135 47.6779 35.4377 49.5021L36.641 48.2988C34.8727 46.5305 32.1979 43.5334 29.9436 40.315C28.8167 38.7062 27.8061 37.0579 27.0663 35.4922C26.3216 33.9161 25.8783 32.4796 25.8283 31.2806C25.7767 30.0417 26.0057 29.1569 26.3575 28.5234C26.7074 27.8933 27.2087 27.4578 27.7942 27.1616C28.9998 26.5519 30.546 26.5472 31.6182 26.7616L31.9519 25.0929C30.6606 24.8347 28.6899 24.8016 27.0262 25.6431C26.1771 26.0725 25.4056 26.7324 24.8698 27.6971Z" fill="#FF9900"></path><defs><radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(50.5 50.5) rotate(90) scale(50.5)"><stop stop-color="#1E075F"></stop><stop offset="0.756906" stop-color="#1E075F"></stop></radialGradient><linearGradient id="paint1_linear" x1="50.4252" y1="21.1035" x2="50.4252" y2="76.4102" gradientUnits="userSpaceOnUse"><stop stop-color="#FFB800"></stop><stop offset="1" stop-color="#FF9900"></stop></linearGradient></defs>
                  </svg>
                </div>
                <div className='flex flex-col items-center justify-evenly pl-7 pr-36 -space-y-2'>
                  <div className='text-white text-sm'>
                    Coherence
                  </div>
                  <div className='text-4xl pb-4 text-white font-bold'>
                    Rewards
                  </div>
              </div>
            </div>
          </div>
          <div className='bg-[#F5F1FD]'>
            <div className='triangle w-[430px] h-full flex flex-col bg-white items-center justify-center space-y-2 text-[#4004A3]'>
              <div className=''>
                Total
              </div>
              <div className='text-3xl font-bold '>
                0.000 ETH
              </div>
            </div>
          </div>
          <div className='flex w-[410px] flex-col items-center bg-[#F5F1FD] justify-center space-y-2 text-[#4004A3]'>
            <div className=''>
              Total
            </div>
            <div className='text-3xl font-bold '>
              0 PNK
            </div>
          </div>
        </div>
      </div>
      <div className='w-full h-fit mt-12 px-32 flex space-x-10'>
        <div className='w-[400px]'>
          <div className=' text-white bg-gradient-to-r rounded-t-xl from-[#4D00B4] to-[#6401B5] flex'>
            <div className='hexagon'>
              <div className='flex items-center justify-center text-xl font-bold h-full'>
                0
              </div>
            </div>
            <div className='flex items-center space-x-28 font-semibold'>
              <span className='text-xl font-semibold'>
                Courts
              </span>
              <span className='flex space-x-2 items-center'>
                <span>
                  8.12% APY
                </span>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-help"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
                </span>
              </span>
            </div>
          </div>
          <div className='mt-0.5 w-full h-1 bg-[#009AFF]'></div>
            <div className='bg-white text-[#4004A3] p-2 pl-4 mt-0.5 rounded-xl font-bold text-sm'>
              You are not staked in any courts.
            </div>
          </div>
        <div className='w-[400px] '>
          <div className=' text-white bg-gradient-to-r rounded-t-xl from-[#4D00B4] to-[#6401B5] flex'>
            <div className='hexagon'>
              <div className='flex items-center justify-center text-xl font-bold h-full'>
                0
              </div>
            </div>
            <div className='flex items-center space-x-28 font-semibold'>
              <span className='text-xl font-semibold'>
                Cases
              </span>
            </div>
          </div>
          <div className='mt-0.5 w-full h-1 bg-[#009AFF]'></div>
            <div className=' bg-white text-[#4004A3] p-2 px-4 mt-0.5 rounded-t-xl font-bold text-sm flex justify-between'>
              <span>
                Vote Pending
              </span>
              <span>
                0
              </span>
            </div>
            <div className='bg-white text-[#4004A3] p-2 px-4 mt-0.5 font-bold text-sm flex justify-between'>
            <span>
                Active
              </span>
              <span>
                0
              </span>
            </div>
            <div className='bg-white text-[#4004A3] p-2 px-4 mt-0.5 rounded-b-xl font-bold text-sm flex justify-between'>
            <span>
                Closed
              </span>
              <span>
                0
              </span>
            </div>
          </div>
          <div className='w-[400px]'>
          <div className=' text-white bg-gradient-to-r rounded-t-xl from-[#4D00B4] to-[#6401B5] flex'>
            <div className='hexagon'>
              <div className='flex items-center justify-center text-xl font-bold h-full'>
                %
              </div>
            </div>
            <div className='flex items-center space-x-28 font-semibold'>
              <span className='text-xl font-semibold'>
                Voting Performance
              </span>
            </div>
          </div>
          <div className='mt-0.5 w-full h-1 bg-[#009AFF]'></div>
            <div className='bg-white text-[#4004A3] p-10 mt-0.5 rounded-xl font-bold text-sm flex flex-col items-center justify-center'>
              <div class="circular-progress" ref={circularProgressRef}>
                  <span class="progress-value" ref={progressValueRef}>0%</span>
              </div>
              <div className='p-4 text-[#526FC7] text-xl font-normal'>
                Cases Coherent
              </div>
            </div>
          </div>
      </div>
      <div className='mt-12 px-32'>
        <div className=' w-full h-fit'>
          <div className='bg-[#4D00B4] text-white font-bold text-2xl flex items-center space-x-1 rounded-t-lg'>
            <div className='hexagon-2'>
              <span className='flex items-center justify-center h-full'>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-gavel"><path d="m14.5 12.5-8 8a2.119 2.119 0 1 1-3-3l8-8"/><path d="m16 16 6-6"/><path d="m8 8 6-6"/><path d="m9 7 8 8"/><path d="m21 11-8-8"/></svg>
              </span>
            </div>
            <span>
              Ongoing Cases
            </span>
          </div>
          <div className='mt-0.5 w-full h-1 bg-[#009AFF]'></div>
          <div className='bg-white w-full p-2 rounded-xl mt-0.5'>
            You have no ongoing cases
          </div>
        </div>
        <div className=' w-full h-fit mt-12'>
          <div className='bg-[#4D00B4] text-white font-bold text-2xl flex items-center space-x-1 rounded-t-lg'>
            <div className='hexagon-2'>
              <span className='flex items-center justify-center h-full'>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-gavel"><path d="m14.5 12.5-8 8a2.119 2.119 0 1 1-3-3l8-8"/><path d="m16 16 6-6"/><path d="m8 8 6-6"/><path d="m9 7 8 8"/><path d="m21 11-8-8"/></svg>
              </span>
            </div>
            <span>
              Ongoing Cases
            </span>
          </div>
          <div className='mt-0.5 w-full h-1 bg-[#009AFF]'></div>
          <div className='bg-white w-full p-2 rounded-xl mt-0.5'>
            You have no ongoing cases
          </div>
        </div>
      </div>
      <div className='bg-[#4D00B4] mt-12 text-white'>
        <div className='pl-12 text-xl py-3'>
          Find out more about Chirag
        </div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Hero