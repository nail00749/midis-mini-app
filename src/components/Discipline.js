import { Div, Text } from '@vkontakte/vkui'


export function Discipline(props) {
    const {cabinet, num, para, teacher, time} = props.disc
    /*{cabinet: "212", num: 2, para: "Русский язык", teacher: "Кокорин С.А.", time: "12:00"}*/
    return (
        <Div className={'row'} style={{alignItems: 'center', width: '100%'}}>
            <div style={{margin: 10, padding: 10, backgroundColor: '#47BFEE', borderRadius: 10}}>
                <Text>{num + 1}</Text>
            </div>
            <div className={'column'}>
                <Text>{'Дисциплина: ' + para}</Text>
                <Text>{'Преподаватель: ' + teacher}</Text>
                <div>
                    <Text>{'Время начала: ' + time}</Text>
                    <Text>{'Кабинет: ' + cabinet}</Text>
                </div>
            </div>
        </Div>
    )
}
