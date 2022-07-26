import React from 'react';
import ReactDom from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history'
import App from './App';

// Mount functon to start up the app:
const mount = (ele, { onNavigate, defaultHistory, initialPath, onSignIn }) => {
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath]
    });
    if (onNavigate)
    {
        history.listen(onNavigate);
    }

    ReactDom.render(
        <App history={history} onSignIn={onSignIn} />,
        ele
    );

    return {
        onParentNavigate({ pathname: nextPathname }) {
            const { currentPathname } = history.location;

            if(currentPathname !== nextPathname) {
                history.push(nextPathname);
            }
        }
    };
};

// If we are in development and in isolation, call mount immediately:
if(process.env.NODE_ENV === 'development')
{
    console.log('in dev environment');

    const devRoot = document.querySelector('#_auth-dev-root');

    if(devRoot) {
        mount(devRoot, { defaultHistory: createBrowserHistory() });
    }
}

// Handle case where we are running through container and we should export the mount function:
export { mount }