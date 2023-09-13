import { initAuth0 } from './auth';
import { securityConfig } from '$lib/config.public';
import { securityConfig as securityConfigPrivate } from '$lib/config.private';

export default initAuth0({ ...securityConfig(), ...securityConfigPrivate() });
