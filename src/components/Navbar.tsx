"use client"

import Image from 'next/image'
import React, { useState } from 'react'
import { UserProfile } from './user-profile'
import { motion, stagger, useAnimate } from 'framer-motion'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { Menu } from 'lucide-react'

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

  const onOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (open) {
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
          
          <Sheet open={isOpen} onOpenChange={onOpenChange}>
            <SheetTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full"
              >
                <Menu className="h-6 w-6 text-[#56616B]" />
              </motion.button>
            </SheetTrigger>
            
            <SheetContent className="w-[80%] max-w-[300px] h-full">
              <div className="flex items-center gap-2 mb-8 mt-4">
                <Image src={"/mainstack-logo.png"} width={30} height={30} alt="logo" />
                <span className="text-lg font-bold">Mainstack</span>
              </div>
              
              <motion.ul 
                ref={scope}
                initial={{ opacity: 0 }}
                className="space-y-4"
              >
                {navLinks.map((link, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-gray-100 ${link.title === "Revenue" ? "bg-gray-50" : ""}`}
                  >
                    <div className={`${link.title === "Revenue" ? "bg-blue-100 p-2 rounded-full" : ""}`}>
                      <Image 
                        src={link.icon} 
                        width={link.title === "Revenue" ? 20 : 24} 
                        height={link.title === "Revenue" ? 20 : 24} 
                        alt={link.title} 
                      />
                    </div>
                    <span className={`text-lg font-medium ${link.title === "Revenue" ? "text-blue-600" : "text-[#56616B]"}`}>
                      {link.title}
                    </span>
                    {link.title === "Revenue" && (
                      <span className="ml-auto px-2 py-1 text-xs font-bold text-white bg-blue-600 rounded-full">
                        New
                      </span>
                    )}
                  </motion.li>
                ))}
                
                <div className="border-t border-gray-200 my-4"></div>
                
                <motion.li
                  initial={{ opacity: 0, x: 20 }}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-all duration-300"
                >
                  <div className="bg-[#EFF1F6] p-2 rounded-full">
                    <Image src="/icons/user.svg" width={20} height={20} alt="Profile" />
                  </div>
                  <span className="text-lg font-medium text-[#56616B]">Settings</span>
                </motion.li>
                
                <motion.li
                  initial={{ opacity: 0, x: 20 }}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-all duration-300"
                >
                  <div className="bg-[#EFF1F6] p-2 rounded-full">
                    <Image src="/icons/chat.svg" width={20} height={20} alt="Support" />
                  </div>
                  <span className="text-lg font-medium text-[#56616B]">Support</span>
                </motion.li>
              </motion.ul>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}

export default Navbar
