import React from 'react';
import ReactDom from 'react-dom';
import App from './App';

// Mount functon to start up the app:
const mount = (ele) => {
    ReactDom.render(
        <App />,
        ele
    );
};

// If we are in development and in isolation, call mount immediately:
if(process.env.NODE_ENV === 'development')
{
    console.log('in dev environment');

    const devRoot = document.querySelector('#_marketing-dev-root');

    if(devRoot) {
        mount(devRoot);
    }
}

// Handle case where we are running through container and we should export the mount function:
export { mount }