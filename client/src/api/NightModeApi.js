import React,{ useState } from 'react'

const NightModeApi = () => {

    const [night, setNight] = useState(false)

    return {
        nightMode: [night, setNight] 
    }
}

export default NightModeApi
