"use client";

import Feed from './Feed';
import ChatRoom from './ChatRoom';
import AudioRoom from './AudioRoom';

export default function ComunidadShell({ currentUserId }: { currentUserId?: string }) {
	// Simple 3-column responsive layout: Feed | Chat | Audio
	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
			<div className="lg:col-span-1">
				<Feed currentUserId={currentUserId} />
			</div>

			<div className="lg:col-span-1">
				<ChatRoom roomId="global" currentUserId={currentUserId} />
			</div>

			<div className="lg:col-span-1">
				<AudioRoom roomId="global-audio" currentUserId={currentUserId} />
			</div>
		</div>
	);
}