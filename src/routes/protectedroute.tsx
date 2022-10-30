import React  from "react"
import { Route, Redirect } from "react-router-dom"
import AuthService from "../services/AuthService";
import { CurrentUser } from "../services/types/service";

interface ProtectedRouteProps {
  component: React.ComponentType<any>,
  path: string,
}

const ProtectedRoute = ({ component: Component, path }: ProtectedRouteProps ) => (
  <Route
    path={path}
    render={ props => {
      let currentUser: CurrentUser = AuthService.getCurrentUser()

      if (!currentUser ) {
        // not logged in so redirect to login page
        return (
          <Redirect
            to={{ pathname: "/", state: { from: props.location } }}
          />
        );
      }

      return <Component {...props} />
    }}
  />
)

export default ProtectedRoute;