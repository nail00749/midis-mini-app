import { Text } from '@vkontakte/vkui'

export function Day({}) {
    return(
        <div>
            <Text className="discipline">
                {'День'}
            </Text>
            <div>
                {['discipline1', 'discipline2', 'discipline3'].map((item, index) => (<Text className="" key={index}>{item}</Text>))}
            </div>
        </div>
    )
}
