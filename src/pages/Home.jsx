import React from 'react'

import {motion , AnimatePresence} from 'framer-motion'
import { useSnapshot } from 'valtio'

import {CustomButton} from '../components'

import {headContainerAnimation , headContentAnimation , headTextAnimation , slideAnimation} from "../config/motion"

import state from "../store"

const Home = () => {

    const snap = useSnapshot(state);

  return (
    <AnimatePresence>
        {snap.intro && (
            <motion.section className="home" {...slideAnimation('left')}>
                <motion.header {...slideAnimation('down')}>
                    <img src="./favicon.png"
                    alt = "logo" className ="w-12 h-12 object-contain" />
                </motion.header>

                <motion.div className="home-content" {...headContainerAnimation}>
                    <motion.div {...headTextAnimation}>
                        <h1 className="head-text">
                             WEAR YOUR <br className="xl:block hidden" /> IMAGINATION.
                        </h1>
                    </motion.div>

                    <motion.div {...headContentAnimation} className="flex flex-col gap-5">
                        <p className='max-w-md font-normal text-gray-600 text-base'>Design your one-of-a-kind shirt with our cutting-edge 3D customization tool. <strong>Express your creativity</strong>{" "}  and craft a style that's uniquely yours.</p>

                        <CustomButton type="filled" title="customize It" handleClick={()=> {state.intro=false}} customStyles='w-fit px-4 py-2.5 font-bold text-sm' />
                    </motion.div>
                </motion.div>
            </motion.section>
        )}
    </AnimatePresence>
  )
}

export default Home