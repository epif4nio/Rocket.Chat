import { Icon, Box } from '@rocket.chat/fuselage';
import React from 'react';

import VerticalBar from '../../../components/VerticalBar';
import { useBackButton } from '../../../contexts/BackButtonContext';
import { useRoute, useRouteParameter } from '../../../contexts/RouterContext';
import { useTranslation } from '../../../contexts/TranslationContext';
import Chat from './chats/Chat';
import ChatInfo from './chats/contextualBar/ChatInfo';
import RoomEditWithData from './chats/contextualBar/RoomEditWithData';

const ChatsContextualBar = ({ chatReload }) => {
	const directoryRoute = useRoute('omnichannel-directory');

	const bar = useRouteParameter('bar') || 'info';
	const id = useRouteParameter('id');

	const t = useTranslation();
	// const { setbackButtonPath } = useBackButton();

	const openInRoom = () => {
		directoryRoute.push({ page: 'chats', id, bar: 'chat' });

		// setbackButtonPath(
		// 	directoryRoute.getPath({
		// 		tab: 'chats',
		// 		bar,
		// 		id,
		// 	}),
		// );
	};

	const handleChatsVerticalBarCloseButtonClick = () => {
		directoryRoute.push({ tab: 'chats' });
	};

	if (bar === 'chat') {
		return <Chat rid={id} />;
	}

	return (
		<VerticalBar className={'contextual-bar'}>
			<VerticalBar.Header>
				{bar === 'info' && (
					<>
						<Box flexShrink={1} flexGrow={1} withTruncatedText mi='x8'>
							<Icon name='info-circled' size='x20' /> {t('Room_Info')}
						</Box>
						<VerticalBar.Action
							title={t('View_full_conversation')}
							name={'new-window'}
							onClick={openInRoom}
						/>
					</>
				)}
				{bar === 'edit' && (
					<Box flexShrink={1} flexGrow={1} withTruncatedText mi='x8'>
						<Icon name='pencil' size='x20' /> {t('edit-room')}
					</Box>
				)}
				<VerticalBar.Close onClick={handleChatsVerticalBarCloseButtonClick} />
			</VerticalBar.Header>
			{bar === 'info' && <ChatInfo id={id} />}
			{bar === 'edit' && (
				<RoomEditWithData
					id={id}
					close={handleChatsVerticalBarCloseButtonClick}
					reload={chatReload}
				/>
			)}
		</VerticalBar>
	);
};

export default ChatsContextualBar;