"use client"

import Image from 'next/image'
import React, { useState } from 'react'
import { UserProfile } from './user-profile'
import { motion, stagger, useAnimate, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scope, animate] = useAnimate()
  
  const navLinks = [
    { title: "Home", icon: "/icons/home.svg" },
    { title: "Analytics", icon: "/icons/analytics.svg" },
    { title: "Revenue", icon: "/icons/revenue.svg" },
    { title: "CRM", icon: "/icons/group.svg" },
    { title: "Apps", icon: "/icons/widgets.svg" }
  ]

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      animate("li", 
        { opacity: 1, x: 0 },
        { delay: stagger(0.1, { startDelay: 0.15 }), 
          duration: 0.4,
          ease: [0.25, 1, 0.5, 1] 
        }
      )
    }
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        damping: 10,
        stiffness: 100,
        delay: 0.1
      }}
      className='fixed top-0 left-0 right-0 z-50 shadow-[0px_2px_4px_0px_rgba(45,59,67,0.06)] rounded-[100px] border-[2px] border-white py-2 md:py-3 mt-3 px-4 md:px-8 bg-white mx-2 md:mx-4'
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Image src={"/mainstack-logo.png"} width={36} height={36} alt="logo" />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link, index) => (
            <motion.div 
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-1 cursor-pointer ${link.title === "Revenue" ? "!px-4.5 !py-3 button-primary " : ""}`}
            >
              <Image src={link.icon} width={20} height={20} alt={link.title} />
              <span className={`text-[16px] ${link.title === "Revenue" ? "text-white" : "text-[#56616B]"} font-semibold`}>
                {link.title}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-4.5">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Image src="/icons/notifications.svg" width={20} height={20} alt="notifications" />
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Image src="/icons/chat.svg" width={20} height={20} alt="chat" />
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-[#EFF1F6] py-1 pr-3 pl-[5px] rounded-[100px] flex items-center gap-2"
          >
            <UserProfile />
            <Image src="/icons/menu.svg" width={24} height={24} alt="chevron-down" />
          </motion.div>
        </div>

        {/* Mobile Icons */}
        <div className="md:hidden flex items-center gap-4">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Image src="/icons/notifications.svg" width={20} height={20} alt="notifications" />
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Image src="/icons/chat.svg" width={20} height={20} alt="chat" />
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-[#EFF1F6] py-1 px-1 rounded-full"
          >
            <UserProfile />
          </motion.div>
          
          <motion.button
            onClick={toggleMenu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full"
            aria-label="Menu"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-[#56616B]" />
            ) : (
              <Menu className="h-6 w-6 text-[#56616B]" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={toggleMenu}
            />
            
            {/* Drawer Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 w-4/5 max-w-sm h-full bg-white z-50 shadow-xl md:hidden overflow-y-auto"
            >
              <div className="h-full flex flex-col">
                {/* Drawer Header */}
                <div className="flex items-center justify-between p-4 border-b">
                  <div className="flex items-center gap-2">
                    <Image 
                      src={"/mainstack-logo.png"} 
                      width={30} 
                      height={30} 
                      alt="logo" 
                    />
                    <span className="text-lg font-bold">Mainstack</span>
                  </div>
                  <button 
                    onClick={toggleMenu} 
                    className="p-2"
                    aria-label="Close menu"
                  >
                    <X className="h-6 w-6 text-[#56616B]" />
                  </button>
                </div>

                {/* Drawer Navigation Links - FIXED VISIBILITY */}
                <div className="flex-1 p-4">
                  <motion.ul 
                    ref={scope}
                    className="space-y-2"
                  >
                    {navLinks.map((link, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-gray-100 ${
                          link.title === "Revenue" ? "bg-gray-50" : ""
                        }`}
                      >
                        <div className={`${
                          link.title === "Revenue" 
                            ? "bg-black/20 p-2 rounded-full" 
                            : ""
                        }`}>
                          <Image 
                            src={link.icon} 
                            width={24} 
                            height={24} 
                            alt={link.title} 
                          />
                        </div>
                        <span className={`text-lg font-medium ${
                          link.title === "Revenue" 
                            ? "text-black/50" 
                            : "text-black"
                        }`}>
                          {link.title}
                        </span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Navbar