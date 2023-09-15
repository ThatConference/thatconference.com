import { debug } from '$lib/config.public';
// import { useMachine } from '@xstate/svelte';
import { useMachine } from '$lib/useMachine';

import create from './cartMachine';

const cartMachine = new useMachine(create(), {
	devTools: debug.xstate
});

export default cartMachine;
