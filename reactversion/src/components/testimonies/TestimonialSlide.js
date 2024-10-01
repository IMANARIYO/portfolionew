import React from "react";
import { RiStarFill } from "react-icons/ri";
import { quote, testimonialOne, testimonialTwo } from "../../assets";

const TestimonialSlide = ({
  image,
  name,
  title,
  company,
  date,
  head,
  mainTestimony
}) => {
  return (
    <div className='w-full'>
      <div className='flex flex-col justify-between w-full h-auto p-4 lgl:flex-row'>
        <div className='sm:block md:block w-full lgl:w-[35%] h-full bg-gradient-to-r from-[#1e2024] to-[#23272b] p-8 rounded-lg flex flex-col md:flex-row lgl:flex-col gap-8 justify-center md:justify-start lgl:justify-center'>
          <img
            className='object-cover rounded-lg h-72 md:h-32 lgl:h-72'
            src={image}
            alt={name}
          />
          <div className='flex flex-col justify-end w-full'>
            <p className='mb-2 text-xs tracking-wide uppercase text-designColor'>
              { company}
            </p>
            <h3 className='text-2xl font-bold text-white'>
              {name}
            </h3>
            <p className='text-base tracking-wide text-gray-500'>
              {title}
            </p>
          </div>
        </div>

        <div className='w-full lgl:w-[60%] h-full flex flex-col justify-between'>
          <img
            className='w-20 lgl:w-32 sm:hidden md:hidden'
            src={quote}
            alt='quote'
          />

          <div className='w-full h-[70%] py-10 bg-gradient-to-r from-[#1e2024] to-[#23272b] rounded-lg shadow-shadowTwo p-4 lgl:p-8 flex flex-col justify-center gap-4 lgl:gap-8'>
            <div className='flex flex-col justify-between py-6 border-b-2 lgl:items-center border-b-gray-900'>
              <div>
                <h3 className='text-xl font-medium text-white racking-wide lgl:text-2xl'>
                  {head}
                </h3>
                <p className='mt-3 text-base text-gray-400'>
                  {date}
                </p>
              </div>
              <div className='flex gap-1 text-yellow-500'>
                <RiStarFill />
                <RiStarFill />
                <RiStarFill />
                <RiStarFill />
                <RiStarFill />
              </div>
            </div>
            <p className='text-base font-medium leading-6 tracking-wide text-white text-white-400 font-titleFont'>
              {mainTestimony}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestimonialSlide
