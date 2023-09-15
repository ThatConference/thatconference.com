import { writable } from 'svelte/store';
import config from '$lib/config.public';

export default writable({ eventId: config.eventId, title: 'THAT' });
