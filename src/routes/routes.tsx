import React, { Suspense, lazy } from 'react'
import {
  Route,
  Switch,
} from "react-router-dom";
import Backdrop from '@mui/material/Backdrop/'
import CircularProgress from '@mui/material/CircularProgress'
import ProtectedRoute from './protectedroute'


// Views
const LoginComponent = lazy(() => import('../views/login/components/Login'));
const DashboardComponent = lazy(() => import('../views/dashboard/components/Dasboard'));


const Routes: React.FC = () => {
  return (
    <Suspense fallback={
        <Backdrop open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
    }>
      <Switch>
        <ProtectedRoute path="/dashboard" component={DashboardComponent}/>
        <Route path="/" component={LoginComponent}/>
      </Switch>
    </Suspense>
  )
}

export default Routes