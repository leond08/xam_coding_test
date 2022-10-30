import React, { useEffect } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FormHelperText from '@mui/material/FormHelperText'
import Container from '@mui/material/Container'
import Alert from '@mui/material/Alert'
import { Form, Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'

import { Login } from '../types/login'
import MESSAGES from "../../../helpers/message"
import AuthService from '../../../services/AuthService'
import { useHistory } from 'react-router-dom'

const LoginComponent : React.FC = () => {
  let history = useHistory()
  let currentUser = AuthService.getCurrentUser()
  
  useEffect(() => {
    if (currentUser) {
      history.replace({
        pathname: "/dashboard"
      })
    }
    // eslint-disable-next-line
  }, [])

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid black',
          padding: 5
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Formik
          initialValues={{
            branchId: '',
            username: '',
            password: '',
            loginError: '',
          }}
          onSubmit={(
            values: Login,
            { setSubmitting, setErrors }: FormikHelpers<Login>
          ) => {
            let response = AuthService.login(values)
            if (response === true) {
              setSubmitting(false)
              history.replace({
                pathname: "/dashboard"
              })
            }
            else {
              setSubmitting(false)
              setErrors({
                loginError: `Error: ${response}`
              })
            }
          }}
          validationSchema={
            Yup.object().shape({
              branchId: Yup.number().typeError(MESSAGES.NOT_NUMBER).required(MESSAGES.REQUIRED_FIELD),
              username: Yup.string().required(MESSAGES.REQUIRED_FIELD),
              password: Yup.string().required(MESSAGES.REQUIRED_FIELD)
            })
          }
        >
        {({
          errors,
          handleBlur,
          handleChange,
          isSubmitting,
          touched,
        }) => (
          <Form>
            <Box>
              <TextField
                margin="normal"
                fullWidth
                id="branchId"
                label="Branch Id"
                name="branchId"
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.branchId && errors.branchId)}
                helperText={touched.branchId && errors.branchId}
              />
              <TextField
                margin="normal"
                fullWidth
                name="username"
                label="Username"
                id="username"
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.username && errors.username)}
                helperText={touched.username && errors.username}
              />
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />
              <Button
                type="submit"
                fullWidth
                disabled={isSubmitting}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              {Boolean(touched.loginError && errors.loginError) && (
                <Alert icon={false} severity="error">
                  <FormHelperText error>
                    {errors.loginError}
                  </FormHelperText>
                </Alert>
              )}
            </Box>
          </Form>
        )}
        </Formik>
      </Box>
    </Container>
  )
}

export default LoginComponent