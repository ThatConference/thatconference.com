import { debug } from '$lib/config.public';
import { useMachine } from '$lib/useMachine';

import create from './machine';

const claimTicketMachine = new useMachine(create(), {
	devTools: debug.xstate
});

export default claimTicketMachine;
