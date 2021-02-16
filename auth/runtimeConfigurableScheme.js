// This auth plugin will end up in .nuxt/auth/schemes, as will oauth2.js if it's
// also a registered strategy in the module config.

// https://github.com/nuxt-community/auth-module/issues/713

import Oauth2Scheme from './oauth2';

export default class RuntimeConfigurableOauth2Scheme extends Oauth2Scheme {
    constructor($auth, options) {
        const configOptions = {
            options,
            ...$auth.ctx.$config.auth.strategies[options['_name']]
        };
        super($auth, configOptions);
    }
}