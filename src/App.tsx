import React from 'react';
import { presetGpnDefault, Theme } from '@consta/uikit/Theme';
import ERDiagramPage from './page/ERDiagramPage.tsx';

const App: React.FC = () => {
    return (
        <Theme
            preset={presetGpnDefault}
            style={{
                width: '100%',
                height: '100%',
                overflow: 'hidden'
            }}
        >
            <ERDiagramPage/>
        </Theme>
    );
};

export default App;