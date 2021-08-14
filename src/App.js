import React, { useState, useEffect } from 'react'
import bridge from '@vkontakte/vk-bridge'
import { View, AdaptivityProvider, AppRoot, Tabbar, TabbarItem, Button } from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'

import { Schedule } from './panels/Schedule'
import { BottomTab } from './components/BottomTab'
import { Main } from './panels/Main'
import { ChatBot } from './panels/ChatBot'

import style from './style.css'


const App = () => {
    const [activePanel, setActivePanel] = useState('schedule')
    const [fetchedUser, setUser] = useState(null)
    const [popout, setPopout] = useState(null)//<ScreenSpinner size='large' />

    useEffect(() => {
        bridge.subscribe(({detail: {type, data}}) => {
            if (type === 'VKWebAppUpdateConfig') {
                const schemeAttribute = document.createAttribute('scheme')
                schemeAttribute.value = data.scheme ? data.scheme : 'client_light'
                document.body.attributes.setNamedItem(schemeAttribute)
            }
        })

        async function fetchData() {
            const user = await bridge.send('VKWebAppGetUserInfo')
            setUser(user)
            setPopout(null)
        }

        fetchData()
    }, [])

    const go = e => {
        bridge.send("VKWebAppTapticImpactOccurred", {"style": "heavy"});
        setActivePanel(e.currentTarget.dataset.to)
    }

    return (
        <AdaptivityProvider>
            <AppRoot>
                <View
                    activePanel={activePanel}
                    popout={popout}
                >
                    <Main id='main'/>
                    <Schedule id="schedule"/>
                    <ChatBot id='chat-bot'/>
                </View>
                <BottomTab change={go} activePanel={activePanel}/>
            </AppRoot>
        </AdaptivityProvider>
    )
}

export default App
