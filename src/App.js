import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot, Tabbar, TabbarItem, Button } from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Schedule from './panels/Schedule'
import style from './style.css'


const App = () => {
	const [activePanel, setActivePanel] = useState('schedule');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(null);//<ScreenSpinner size='large' />

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			setPopout(null);
		}
		fetchData();
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	return (
		<AdaptivityProvider>
			<AppRoot>
				<View
					className={'background'}
					activePanel={activePanel}
					popout={popout}>
					<Home id='home' fetchedUser={fetchedUser} go={go} />
					<Schedule id='schedule' />
				</View>
				<Tabbar>
					<TabbarItem>
						<Button onClick={go} data-to='schedule'>Schedule</Button>
					</TabbarItem>
				</Tabbar>
			</AppRoot>
		</AdaptivityProvider>
	);
}

export default App;
