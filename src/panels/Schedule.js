import React, { useEffect, useRef, useState } from 'react'
import {
    Button, Div, Panel, PanelHeader, ScreenSpinner, Select, Tabs,
    TabsItem, Text
} from '@vkontakte/vkui'

import API from '../Controllers/API'
import DatePicker from 'react-horizontal-datepicker'
import { Day } from '../components/Day'

const days = {
    0: 'Пн',
    1: 'Вт',
    2: 'Ср',
    3: 'Чт',
    4: 'Пт',
    5: 'Сб',
}


export function Schedule() {

    const [groups, setGroups] = useState(null)

    const [scheduleDay, setScheduleDay] = useState(null)

    const [selectedDay, setSelectedDay] = useState(new Date().getDay()-1)

    const [selectedGroup, setSelectedGroup] = useState(null)

    const [ovenWeek, setOvenWeek] = useState(null)

    const [oddWeek, setOddWeek] = useState(null)


    const [typeWeek, setTypeWeek] = useState('oven')

    const [typeView, setTypeView] = useState('week')


    const myRef = useRef(null)

    useEffect(() => {
        getAllGroups()
    }, [])

    async function getAllGroups() {
        let result = await API.getListGroup()
        let groups = result.map(item => ({label: item, value: item}))
        setGroups(groups)
    }

    async function inputChangeGroup(event) {
        let group = event.target.value
        setSelectedGroup(group)
        let data = {
            group: group
        }
        let result = await API.getGroupSchedule(data)
        setOvenWeek(result[0])
        setOddWeek(result[1])
        console.log(result)
    }

    function inputChangeDay(numberDay) {
        setSelectedDay(numberDay)
        if (ovenWeek && ovenWeek.hasOwnProperty(numberDay)) {
            setScheduleDay(ovenWeek[numberDay])
        }

    }


    return (
        <Panel>
            <Div style={{paddingBottom: 20}}>
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
                        /*<DatePicker
                            getSelectedDay={inputChangeDay}
                            endDate={100}
                            selectDate={Date.now()}
                            labelFormat={'MMMM'}
                            color={'#374e8c'}
                        /> */
                        <div className={'row'}>
                            {Object.keys(days).map((item, index) =>
                                <Button
                                    onClick={e => {
                                        inputChangeDay(item)
                                    }}
                                    style={{margin: 5}}
                                    mode={selectedDay == index ? 'primary' : 'outline'}>{days[item]}
                                </Button>)}
                        </div>

                        : null
                }

                {typeView === 'week' ?
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
                    </div> : null
                }
                {/*----*/}
                <div>
                    {
                        typeView === 'week' ?
                            (typeWeek === 'oven' ?
                                <div className={''}>
                                    {
                                        ovenWeek ?
                                            Object.keys(ovenWeek).map((day) => {
                                                return (
                                                    <Day day={ovenWeek[day]} nameDay={days[day]}/>
                                                )
                                            })
                                            : null
                                    }
                                </div> :
                                <div className={''}>
                                    {
                                        oddWeek ?
                                            Object.keys(oddWeek).map((day) => {
                                                return (
                                                    <Day day={oddWeek[day]} nameDay={days[day]}/>
                                                )
                                            })
                                            : null
                                    }
                                </div>) :
                            (oddWeek &&  selectedDay && scheduleDay ?
                                <Day
                                    day={scheduleDay}
                                /> :
                                    <Text>'Нет пар'</Text>
                            )

                    }
                </div>

            </Div>
        </Panel>
    )
}


