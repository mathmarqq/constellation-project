import React, { ReactElement } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Board from 'domains/board/pages/Board'
import NotFound from './pages/NotFound/NotFound'

function Routes(): ReactElement {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/board">
                    <Board />
                </Route>
                <Route path="/not-found">
                    <NotFound />
                </Route>
                <Redirect from="/" exact to="/board" />
                <Redirect from="*" to="/not-found" />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
