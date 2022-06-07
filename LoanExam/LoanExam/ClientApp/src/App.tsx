import * as React from 'react';
import {Route} from 'react-router';
import {Layout} from './components/Layout';
import {LocalizationProvider} from "@mui/x-date-pickers";
import ruLocale from "date-fns/locale/ru";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";

import './custom.css'
import {CalculateLoan} from './components/CalculateLoan';

export function App() {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
            <Layout>
                <Route exact path='/' component={CalculateLoan}/>
                <Route path='/calculate-loan' component={CalculateLoan}/>
            </Layout>
        </LocalizationProvider>
    )
}