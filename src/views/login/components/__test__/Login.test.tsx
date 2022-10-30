import React from 'react'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import LoginComponent from '../Login'
import { unmountComponentAtNode } from 'react-dom';
import AuthService from '../../../../services/AuthService';
import { MemoryRouter } from 'react-router-dom';
import Routes from '../../../../routes/routes';

const MockLogin = () => {
  return (
    <MemoryRouter initialEntries={['/dashboard']}>
      <Routes/>
    </MemoryRouter>
  )
}

describe('LoginComponent', () => {

  it('should render "Login" label', () => {
    render(<LoginComponent />)
    const loginElement = screen.getAllByText(/Login/i);
    expect(loginElement.length).toEqual(2)
  })

  it('should render branch id input, username input, password input and login button elements', () => {
    render(<LoginComponent />)
    const usernameInput = screen.getByRole("textbox", { name: /username/i });
    const branchIdInput = screen.getByRole("textbox", { name: /branch id/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", { name: /Login/i})

    expect(usernameInput).toBeInTheDocument()
    expect(branchIdInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(loginButton).toBeInTheDocument()
  })

  it('should render "This field is required." error if form was submitted without values', async () => {
    render(<LoginComponent />)
    const loginButton = screen.getByRole("button", { name: /Login/i})
    fireEvent.click(loginButton)

    const errorElement = await screen.findAllByText(/This field is required./i)
    
    expect(errorElement.length).toEqual(3)
  })

  it('should render "Must be a number." error in branchId', async () => {
    render(<LoginComponent />)
    
    const branchIdInput = screen.getByRole("textbox", { name: /branch id/i });
    const loginButton = screen.getByRole("button", { name: /Login/i})
    fireEvent.change(branchIdInput, { target: { value: "abcd" }})
    fireEvent.click(loginButton)

    const errorElement = await screen.findByText(/Must be a number./i)
    
    expect(errorElement).toBeInTheDocument()
  })

  it('should render "Error: Branch Id is incorrect"', async () => {
    render(<LoginComponent />)
    const usernameInput = screen.getByRole("textbox", { name: /username/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const branchIdInput = screen.getByRole("textbox", { name: /branch id/i });
    const loginButton = screen.getByRole("button", { name: /Login/i})
    fireEvent.change(branchIdInput, { target: { value: 1 }})
    fireEvent.change(passwordInput, { target: { value: 'test' }})
    fireEvent.change(usernameInput, { target: { value: 'test' }})
    fireEvent.click(loginButton)

    const errorElement = await screen.findByText(/Error: Branch Id is incorrect./i)
    
    expect(errorElement).toBeInTheDocument()
  })

  it('should render "Error: Username is incorrect"', async () => {
    render(<LoginComponent />)
    const usernameInput = screen.getByRole("textbox", { name: /username/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const branchIdInput = screen.getByRole("textbox", { name: /branch id/i });
    const loginButton = screen.getByRole("button", { name: /Login/i})
    fireEvent.change(branchIdInput, { target: { value: 10003 }})
    fireEvent.change(passwordInput, { target: { value: 'test' }})
    fireEvent.change(usernameInput, { target: { value: 'test' }})
    fireEvent.click(loginButton)

    const errorElement = await screen.findByText(/Error: Username is incorrect./i)
    
    expect(errorElement).toBeInTheDocument()
  })

  it('should render "Error: Password is incorrect"', async () => {
    render(<LoginComponent />)
    const usernameInput = screen.getByRole("textbox", { name: /username/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const branchIdInput = screen.getByRole("textbox", { name: /branch id/i });
    const loginButton = screen.getByRole("button", { name: /Login/i})
    fireEvent.change(branchIdInput, { target: { value: 10003 }})
    fireEvent.change(passwordInput, { target: { value: 'test' }})
    fireEvent.change(usernameInput, { target: { value: 'testuser03' }})
    fireEvent.click(loginButton)

    const errorElement = await screen.findByText(/Error: Password is incorrrect./i)
    
    expect(errorElement).toBeInTheDocument()
  })

  it('should log in user', () => {
    let cred = {
      branchId: 10003,
      username: "testuser03",
      password: "pa55w0rd003",
      loginError: '',
    }

    let response = AuthService.driver('session').login(cred) // initiate login

    expect(response).toEqual(true)

  })

  it('should access dashboard if logged-in', async () => {
    render(<MockLogin/>)

    await waitFor(async () => {
      const userNameHeading = screen.getByRole("heading")
      const logoutButton = screen.getByRole("button", { name: /Logout/i})
      expect(logoutButton).toBeInTheDocument()
      expect(userNameHeading).toHaveTextContent("testuser03")
    })

  })

})
