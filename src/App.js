import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import React from 'react'
import Home from './components/Home'
import Film from './components/Film'
import helperEvents from './utils/events_helper'

function App() {
  const [width, height] = helperEvents.useWindowSize()

  return (
    <div className="App">
      {/* TODO remove */}
      <p>
        Window size: {width} x {height}
      </p>

      <Router>
        <div>
          <Link to="/">home</Link>
        </div>

        <Switch>
          <Route path="/:type/:id">
            <Film />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
