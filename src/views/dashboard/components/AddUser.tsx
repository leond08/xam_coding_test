import React from "react";
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { Form, Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { UserInterface } from "../../../models/types/user";
import { Paper, Stack } from "@mui/material";
import { UserContext } from "../../../context/UserContext";
import MESSAGES from "../../../helpers/message"
import { RoundedButton } from "../../../components/RoundedButton";


const AddUser: React.FC = () => {
  let { users, setUser } = React.useContext(UserContext)

  /**
   * Check if username is unique
   * 
   * @param value 
   * @returns
   */
  const isUniqueUsername = (value: string | undefined) => {
    // find username
    let user = users.find(user => user.userName === value)
    if (!user) {
      return true
    }
    return false
  }

  return (
      <Paper 
        elevation={2} 
        sx={{ padding: 5, backgroundColor: "#F5F5F5" }}
      >
        <Formik
          initialValues={{
              branchId: '',
              userName: '',
              password: '',
              firstName: '',
              middleName: '',
              lastName: '',
              position: '',
          }}
          onSubmit={(
            values: UserInterface,
            { setSubmitting, setErrors }: FormikHelpers<UserInterface>
          ) => {
            // add new user
            setUser(values)
            setSubmitting(false)
          }}
          validationSchema={
            Yup.object().shape({
              branchId: Yup.number().typeError(MESSAGES.NOT_NUMBER).required(MESSAGES.REQUIRED_FIELD),
              userName: Yup.string().test('userName', MESSAGES.USERNAME_ALREADY_TAKEN, isUniqueUsername).required(MESSAGES.REQUIRED_FIELD),
              password: Yup.string().required(MESSAGES.REQUIRED_FIELD)
              .min(8, MESSAGES.PASSWORD_LENGTH)
              .matches(
                /[A-Z]/,
                MESSAGES.PASSWORD_UPPERCASE
              )
              .matches(
                /[a-z]/,
                MESSAGES.PASSWORD_LOWERCASE
              )
              .matches(/[0-9]/, MESSAGES.PASSWORD_DIGIT)
              .matches(
                /^[\w]+$/,
                MESSAGES.PASSWORD_ALPHANUM
              ),
              firstName: Yup.string().required(MESSAGES.REQUIRED_FIELD),
              middleName: Yup.string().required(MESSAGES.REQUIRED_FIELD),
              lastName: Yup.string().required(MESSAGES.REQUIRED_FIELD),
              position: Yup.string().required(MESSAGES.REQUIRED_FIELD),
            })
          }
        >
        {({
          errors,
          handleBlur,
          handleChange,
          isSubmitting,
          touched,
          values
        }) => (
          <Form>
            <Box>
              <TextField
                margin="dense"
                fullWidth
                id="branchId"
                label="Branch Id"
                name="branchId"
                value={values.branchId}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.branchId && errors.branchId)}
                helperText={touched.branchId && errors.branchId}
              />
              <TextField
                margin="dense"
                fullWidth
                value={values.userName}
                name="userName"
                label="Username"
                id="username"
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.userName && errors.userName)}
                helperText={touched.userName && errors.userName}
              />
              <TextField
                margin="dense"
                fullWidth
                name="firstName"
                value={values.firstName}
                label="First Name"
                id="firstname"
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.firstName && errors.firstName)}
                helperText={touched.firstName && errors.firstName}
              />
              <TextField
                margin="dense"
                fullWidth
                name="middleName"
                label="Middle Name"
                id="middlename"
                value={values.middleName}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.middleName && errors.middleName)}
                helperText={touched.middleName && errors.middleName}
              />
              <TextField
                margin="dense"
                fullWidth
                name="lastName"
                label="Last Name"
                id="lastname"
                value={values.lastName}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.lastName && errors.lastName)}
                helperText={touched.lastName && errors.lastName}
              />
              <TextField
                margin="dense"
                fullWidth
                name="position"
                value={values.position}
                label="Position"
                id="position"
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.position && errors.position)}
                helperText={touched.position && errors.position}
              />
              <TextField
                margin="dense"
                fullWidth
                name="password"
                label="Password"
                value={values.password}
                id="password"
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />
              <Stack 
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="baseline"
                  spacing={2}
                  sx={{
                      mt: 2
                  }}
              >
                  <RoundedButton
                      type="reset"
                      disabled={isSubmitting}
                      color="inherit"
                      variant="contained"
                      >
                      RESET
                  </RoundedButton>
                  <RoundedButton
                      disabled={isSubmitting}
                      type="submit"
                      variant="contained"
                      >
                      ADD
                  </RoundedButton>
              </Stack>
            </Box>
          </Form>
        )}
        </Formik>
      </Paper>
  )
}

export default AddUser