import React from 'react';
import { presetGpnDefault, Theme } from '@consta/uikit/Theme';
import ERDiagramPage from './page/ERDiagramPage.tsx';

const App: React.FC = () => {
    return (
        <Theme preset={presetGpnDefault}>
            <ERDiagramPage/>
        </Theme>
    );
};

export default App;