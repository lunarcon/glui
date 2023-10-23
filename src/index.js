import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { 
  FluentProvider
} from '@fluentui/react-components';

const darkTheme = require('./theme/dark.json');
const lightTheme = require('./theme/light.json');
let isdark = localStorage.getItem("dark") === "true";

const myTheme = isdark ? darkTheme : lightTheme;

const root = ReactDOM.createRoot(document.getElementById('root'));
const body = document.querySelector('body');
body.style.backgroundColor = myTheme.colorNeutralBackground1;
root.render(
	<FluentProvider theme={myTheme}>
	<App/>
	</FluentProvider>
);

reportWebVitals();
