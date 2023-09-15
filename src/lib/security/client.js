import { initAuth0 } from './auth';
import { securityConfig } from '$lib/config.public';

export default initAuth0({ ...securityConfig() });
