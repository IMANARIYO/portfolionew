import ContactLeft from "./ContactLeft";
import Title from "../../layouts/Title";
import axios from "axios";
import { useEffect, useState } from "react";

const Contact = () => {
  const [username, setUsername] = useState('')
  const [telphone, settelphone] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  // ========== Email Validation start here ==============
  const emailValidation = () => {
    return String(email)
      .toLocaleLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/)
  }
  // ========== Email Validation end here ================

  const handleSend = async e => {
    e.preventDefault()
    if (username === '') {
      setErrMsg('Username is required!')
    } else if (telphone === '') {
      setErrMsg('Phone number is required!')
    } else if (email === '') {
      setErrMsg('Please give your Email!')
    } else if (!emailValidation(email)) {
      setErrMsg('Give a valid Email!')
    } else if (subject === '') {
      setErrMsg('Please give your Subject!')
    } else if (message === '') {
      setErrMsg('Message is required!')
    } else {
      try {
        const url = 'https://myportfolioapi-8vku.onrender.com'
        const response = await axios.post(`${url}/contact/createContact`, {
          name: username,
          telphone,
          email,
          subject,
          message
        })

        if (response.status === 201) {
          setSuccessMsg(
            `Thank you dear ${username}, Your Messages has been sent Successfully!`
          )
          setErrMsg('')
          setUsername('')
          settelphone('')
          setEmail('')
          setSubject('')
          setMessage('')
        } else {
          setErrMsg('Something went wrong. Please try again later.')
        }
      } catch (error) {
        setErrMsg('Something went wrong. Please try again later.')
      }
    }
  }

  useEffect(
    () => {
      if (successMsg) {
        const timer = setTimeout(() => {
          setSuccessMsg('')
        }, 3000) // Success message will disappear after 3 seconds

        // Cleanup timeout on component unmount
        return () => clearTimeout(timer)
      }
    },
    [successMsg]
  )

  useEffect(
    () => {
      if (errMsg) {
        const timer = setTimeout(() => {
          setErrMsg('')
        }, 3000) // errMsg message will disappear after 3 seconds

        // Cleanup timeout on component unmount
        return () => clearTimeout(timer)
      }
    },
    [errMsg]
  )

  return (
    <section
      id='contact'
      className='w-full py-20 border-b-[1px] border-b-black'
    >
      <div className='flex items-center justify-center text-center'>
        <Title title='CONTACT' des='Contact With Me' />
      </div>
      <div className='w-full'>
        <div className='flex flex-col items-center justify-center w-full h-auto gap-4 lgl:flex-row'>
          <ContactLeft />
          <div className='w-full lgl:w-[60%] h-full py-10 bg-gradient-to-r from-[#1e2024] to-[#23272b] flex flex-col gap-8 p-4 lgl:p-8 rounded-lg shadow-shadowOne'>
            <form className='flex flex-col w-full gap-4 py-2 lgl:gap-6 lgl:py-5'>
              <div className='flex flex-col w-full gap-10 lgl:flex-row'>
                <div className='flex flex-col w-full gap-4 lgl:w-1/2'>
                  <p className='text-sm tracking-wide text-gray-400 uppercase'>
                    Your name
                  </p>
                  <input
                    onChange={e => setUsername(e.target.value)}
                    value={username}
                    className={`${errMsg === 'Username is required!' &&
                      'outline-designColor'} contactInput`}
                    type='text'
                  />
                </div>
                <div className='flex flex-col w-full gap-4 lgl:w-1/2'>
                  <p className='text-sm tracking-wide text-gray-400 uppercase'>
                    Phone Number
                  </p>
                  <input
                    onChange={e => settelphone(e.target.value)}
                    value={telphone}
                    className={`${errMsg === 'Phone number is required!' &&
                      'outline-designColor'} contactInput`}
                    type='text'
                  />
                </div>
              </div>
              <div className='flex flex-col gap-4'>
                <p className='text-sm tracking-wide text-gray-400 uppercase'>
                  Email
                </p>
                <input
                  onChange={e => setEmail(e.target.value)}
                  value={email}
                  className={`${errMsg === 'Please give your Email!' &&
                    'outline-designColor'} contactInput`}
                  type='email'
                />
              </div>
              <div className='flex flex-col gap-4'>
                <p className='text-sm tracking-wide text-gray-400 uppercase'>
                  Subject
                </p>
                <input
                  onChange={e => setSubject(e.target.value)}
                  value={subject}
                  className={`${errMsg === 'Plese give your Subject!' &&
                    'outline-designColor'} contactInput`}
                  type='text'
                />
              </div>
              <div className='flex flex-col gap-4'>
                <p className='text-sm tracking-wide text-gray-400 uppercase'>
                  Message
                </p>
                <textarea
                  onChange={e => setMessage(e.target.value)}
                  value={message}
                  className={`${errMsg === 'Message is required!' &&
                    'outline-designColor'} contactTextArea`}
                  cols='30'
                  rows='8'
                />
              </div>
              {errMsg &&
                <p className='py-3 bg-gradient-to-r from-[#1e2024] to-[#23272b] shadow-shadowOne text-center text-orange-500 text-base tracking-wide animate-bounce'>
                  {errMsg}
                </p>}
              {successMsg &&
                <p className='py-3 bg-gradient-to-r from-[#1e2024] to-[#23272b] shadow-shadowOne text-center text-green-500 text-base tracking-wide animate-bounce'>
                  {successMsg}
                </p>}
              <div className='w-full'>
                <button
                  onClick={handleSend}
                  className='w-full h-12 bg-[#141518] rounded-lg text-base text-gray-400 tracking-wider uppercase hover:text-white duration-300 hover:border-[1px] hover:border-designColor border-transparent'
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact