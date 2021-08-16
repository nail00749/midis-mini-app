import { Div, Avatar, Panel, Text, PanelHeader, Group, Button, CellButton, Switch, Cell } from '@vkontakte/vkui'
import { Icon20EducationOutline, Icon24Reply } from '@vkontakte/icons'


import persik from '../img/persik.png'
import bridge from '@vkontakte/vk-bridge'

export function Main() {

    function ShareApp() {
        bridge.send("VKWebAppShare", {"link": "https://vk.com/app6909581#hello"});
    }

    function SwitchStartScreen(e) {
        let checked = e.target.checked
        if(checked) {
            bridge.send("VKWebAppStorageSet", {"key": "scheduleStart", "value": "true"});
        }
        else {
            bridge.send("VKWebAppStorageSet", {"key": "scheduleStart", "value": "false"});
        }
    }

    return (
        <Panel>
            <PanelHeader>Главная</PanelHeader>
            <Div>
                <Group mode={'card'}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <Avatar src={persik}/>
                        <Text style={{marginLeft: 50}}>Nick</Text>
                    </div>
                </Group>
                <Group>
                    <div className={'row'}>
                        <Text weight={800} style={{marginLeft: 10, marginRight: 10}}>{`Учебная группа: ${'PI'}`}</Text>
                        <Icon20EducationOutline/>
                    </div>
                    <CellButton style={{marginTop: 10}} after={<Icon24Reply/>} onClick={ShareApp}>Поделится приложением</CellButton>
                </Group>
                <Group>
                    <Cell after={<Switch onClick={SwitchStartScreen}/>}>Открывать расписание при старте</Cell>

                </Group>
            </Div>
        </Panel>
    )
}


