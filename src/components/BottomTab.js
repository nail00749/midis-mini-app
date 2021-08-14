import { Button, Tabbar, TabbarItem, Text } from '@vkontakte/vkui'
import React from 'react'
import { Icon28MailOutline, Icon28ListOutline, Icon28HomeOutline} from '@vkontakte/icons';


export function BottomTab({change, activePanel}) {
    return(
        <Tabbar>
            <TabbarItem
                selected={activePanel === 'main'}
                onClick={change}
                data-to="main"
                text={'Главная'}
            >
                <Icon28HomeOutline width={50} height={25}/>
            </TabbarItem>
            <TabbarItem
                selected={activePanel === 'schedule'}
                onClick={change}
                data-to="schedule"
                text={'Расписание'}
            >
                <Icon28ListOutline width={50} height={25}/>
            </TabbarItem>
            <TabbarItem
                selected={activePanel === 'chat-bot'}
                onClick={change}
                data-to="chat-bot"
                style={{}}
                text={'Чат бот'}
            >
                <Icon28MailOutline width={50} height={25}/>
            </TabbarItem>
        </Tabbar>
    )
}
