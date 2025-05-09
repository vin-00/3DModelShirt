import React ,{useEffect , useState} from 'react'
import {useSnapshot} from 'valtio'
import {AnimatePresence , motion} from 'framer-motion'
import config from '../config/config'
import state from '../store'

import {downloadCanvasToImage , reader} from '../config/helpers'
import {EditorTabs , FilterTabs , DecalTypes} from '../config/constants'

import { fadeAnimation , slideAnimation } from '../config/motion'

import {ShapePicker , ColorPicker, CustomButton , Tab , FilePicker} from '../components'

const Customizer = () => {

  const [file , setFile] = useState('')
  const [activeEditorTab , setActiveEditorTab] = useState('')
  const [activeFilterTab , setActiveFilterTab] = useState({logoShirt : true, stylishShirt : false})

  const generateTabContent = ()=>{
    switch (activeEditorTab){
      case "colorpicker":
        return <ColorPicker />
      case "filepicker":
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />
      case "shapepicker":
        return <ShapePicker />
      default:
        return null
    }
  }

  const handleActiveFilterTab = (tabName)=>{
    switch(tabName){
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName]
        break
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName]
        break
      default:
        state.isLogoTexture = true
        state.isFullTexture = false
    }

    setActiveFilterTab((prevState)=>{
      return {
        ...prevState,
        [tabName]: !prevState[tabName]
      }
    })
  }
  
  const handleDecals = (type , result)=>{
    const decalType = DecalTypes[type]
    state[decalType.stateProperty] = result

    if(!activeFilterTab[decalType.filterTab]){
      handleActiveFilterTab(decalType.filterTab)
    }
  }

  const readFile = (type)=>{
    reader(file).then((result)=>{
      handleDecals(type , result);
      setActiveEditorTab('')
    })
  }

  const snap = useSnapshot(state)
  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div className='absolute top-0 left-0 z-10' key='customize' {...slideAnimation('left')}>
            <div className='flex items-center min-h-screen'>
              <div className='editortabs-container tabs'>
                {EditorTabs.map((tab) => (
                  <Tab key={tab.name} tab={tab} handleClick={() =>{
                    setActiveEditorTab((prev)=>{
                      if(prev==tab.name){
                        return  ''
                      }
                      return tab.name
                    })
                  }} />
                ))}

                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div className='absolute z-10 top-5 right-5' {...fadeAnimation}>
            <CustomButton
              type='filled'
              title='Download'
              handleClick={() => downloadCanvasToImage('png')}
              customStyles='w-fit px-4 py-2.5 font-bold text-sm mr-2'
            />
            <CustomButton
              type='filled'
              title='Go Back'
              handleClick={() => state.intro = true}
              customStyles='w-fit px-4 py-2.5 font-bold text-sm'
            />
          </motion.div>

          <motion.div className='filtertabs-container' {...slideAnimation('up')}>
            {FilterTabs.map((tab) => (
              <Tab key={tab.name} tab={tab} isFilterTab isActiveTab={activeFilterTab[tab.name]} handleClick={() => handleActiveFilterTab(tab.name)} />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer