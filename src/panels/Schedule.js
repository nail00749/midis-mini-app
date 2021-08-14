import React, { useEffect, useRef, useState } from 'react'
import {
    Button, Div, Panel, PanelHeader, ScreenSpinner, Select, Tabs,
    TabsItem, Text
} from '@vkontakte/vkui'

import API from '../Controllers/API'
import DatePicker from 'react-horizontal-datepicker'

const days = {
    0: 'пн',
    1: 'вт',
    2: 'ср',
    3: 'чт',
    4: 'пт',
    5: 'сб',
    6: 'вс',
}


export function Schedule() {

    const [groups, setGroups] = useState(null)

    const [schedule, setSсhedule] = useState(null)

    const [selectedGroup, setSelectedGroup] = useState(null)

    const [ovenWeek, setOvenWeek] = useState(null)

    const [oddWeek, setOddWeek] = useState(null)


    const [typeWeek, setTypeWeek] = useState('oven')

    const [typeView, setTypeView] = useState('week')


    const myRef = useRef(null)

    useEffect(() => {
        getSchedule()
    }, [])

    async function getSchedule() {
        let result = await API.getSchedule()
        let groups = Object.keys(result[0]).map((item, index) => ({label: item, value: item}))
        setGroups(groups)
        setSсhedule(result)
    }

    function inputChangeGroup(event) {
        let group = event.target.value
        setSelectedGroup(group)
        displaySchedule()
    }

    function inputChangeDay(event) {
        let date = new Date(event)
        let day = date.getDay()
    }

    function displaySchedule() {
        if (selectedGroup) {
            console.log()
            let oven = Object.keys(schedule[0][selectedGroup]).map(item => schedule[0][selectedGroup][item].replaceAll('\n', '<br>'))
            let odd = Object.keys(schedule[1][selectedGroup]).map(item => schedule[0][selectedGroup][item].replaceAll('\n', '<br>'))
            console.log(oven)
            setOvenWeek(oven)
            setOddWeek(odd)
        }
    }

    return (
        <Panel>
            <Div>
                <PanelHeader>Расписание</PanelHeader>
                {
                    groups ?
                        <div style={{marginTop: 20}}>
                            <Select
                                placeholder={'Выберите группу'}
                                //searchable={true}
                                options={groups}
                                onInputChange={inputChangeGroup}
                                onChange={inputChangeGroup}
                            />
                        </div>
                        : <ScreenSpinner/>
                }
                <div style={{marginTop: 20, width: '95%'}}>
                    {/*<Select
                        placeholder={'Выберите день'}
                        //searchable={true}
                        options={daysOfWeek}
                        onInputChange={inputChangeDay}
                        onChange={inputChangeDay}
                    />*/}

                </div>

                {/*табы выбора*/}
                <div
                    style={{width: '100%'}}
                >
                    <Tabs
                        mode={'segmented'}
                    >
                        <TabsItem
                            selected={typeView === 'week'}
                            onClick={() => {
                                setTypeView('week')
                            }}
                        >
                            Неделя
                        </TabsItem>
                        <TabsItem
                            selected={typeView === 'day'}
                            onClick={() => {
                                setTypeView('day')
                            }}
                        >
                            День
                        </TabsItem>
                    </Tabs>
                </div>
                {
                    typeView === 'day' ?
                        <DatePicker
                        getSelectedDay={inputChangeDay}
                        endDate={100}
                        selectDate={Date.now()}
                        labelFormat={'MMMM'}
                        color={'#374e8c'}
                    /> : null
                }

                <div
                    style={{width: '100%', marginTop: 10}}
                >
                    <Tabs
                        mode={'segmented'}
                    >
                        <TabsItem
                            selected={typeWeek === 'oven'}
                            onClick={() => {
                                setTypeWeek('oven')
                            }}
                        >
                            Четная
                        </TabsItem>
                        <TabsItem
                            selected={typeWeek === 'odd'}
                            onClick={() => {
                                setTypeWeek('odd')
                            }}
                        >
                            Нечетная
                        </TabsItem>
                    </Tabs>
                </div>
                {/*----*/}

                <div className={''}>
                    {
                        ovenWeek ?
                            Object.keys(ovenWeek).map((item) => {
                                return (
                                    <div>
                                        <Text>{days[item]}</Text>
                                        {
                                            typeWeek === 'oven' ?
                                                <div
                                                    dangerouslySetInnerHTML={{__html: ovenWeek[item]}}
                                                /> :
                                                <div
                                                    dangerouslySetInnerHTML={{__html: oddWeek[item]}}
                                                />
                                        }
                                    </div>
                                )

                            })
                            : null
                    }
                </div>


            </Div>
        </Panel>
    )
}


