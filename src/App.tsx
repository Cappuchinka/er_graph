import React from 'react';
import CytoscapeComponent from './components/CytoscapeComponent';
import { JSON } from './mockData/mockData.ts';
import { useFormatter } from './utils/useFormatter.ts';
import { LAYOUT, STYLE } from './utils/coreSettings.ts';

const App: React.FC = () => {
    const { JSONToElementFormatter } = useFormatter();
    const elements2 = JSONToElementFormatter(JSON);

    return (
        <div>
            <h1>Пример Cytoscape в React с TypeScript</h1>
            <CytoscapeComponent
                elements={elements2}
                style={STYLE}
                layout={LAYOUT}
            />
        </div>
    );
};

export default App;