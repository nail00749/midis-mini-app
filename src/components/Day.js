import { Text } from '@vkontakte/vkui'
import { Discipline } from './Discipline'
import { black } from 'chalk'

export function Day({day, nameDay}) {
    return(
        <div className={'column'} style={{margin: 10, marginBottom: 30}}>
            <Text className={'' +
            ''} style={{alignSelf: 'center', paddingBottom: 10}}>{nameDay}</Text>
            <div className={'frame'}>
                {
                    day.map(item => <Discipline disc={item}/>)
                }
            </div>
        </div>
    )
}
