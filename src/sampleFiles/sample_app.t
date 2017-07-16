import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Hello } from './components/Hello';

ReactDOM.render(
    <Hello compiler='TypeScript' framework='React' author='Amit' />,
    document.getElementById('example')
);
