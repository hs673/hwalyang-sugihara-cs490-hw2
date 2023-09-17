import { useRef } from 'react'
import { useEffect } from 'react'

import {
  Form,
  Label,
  TextField,
  PasswordField,
  Submit,
  FieldError,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

const LoginPage = () => {
  const { isAuthenticated, logIn } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const hwaRedwoodjsComRef = useRef(null)
  useEffect(() => {
    hwaRedwoodjsComRef.current?.focus()
  }, [])

  const onSubmit = async (data) => {
    const response = await logIn({
      username: data.hwaRedwoodjsCom,
      password: data.hwacs490,
    })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Welcome back!')
    }
  }

  return (
    <>
      <MetaTags title="Login" />

      <main className="rw-main">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="rw-scaffold rw-login-container">
          <div className="rw-segment">
            <header className="rw-segment-header">
              <h2 className="rw-heading rw-heading-secondary">Login</h2>
            </header>

            <div className="rw-segment-main">
              <div className="rw-form-wrapper">
                <Form onSubmit={onSubmit} className="rw-form-wrapper">
                  <Label
                    name="hwaRedwoodjsCom"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    hwa@redwoodjs.com
                  </Label>
                  <TextField
                    name="hwaRedwoodjsCom"
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    ref={hwaRedwoodjsComRef}
                    validation={{
                      required: {
                        value: true,
                        message: 'hwa@redwoodjs.com is required',
                      },
                    }}
                  />

                  <FieldError
                    name="hwaRedwoodjsCom"
                    className="rw-field-error"
                  />

                  <Label
                    name="hwacs490"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    Hwacs490
                  </Label>
                  <PasswordField
                    name="hwacs490"
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    autoComplete="current-password"
                    validation={{
                      required: {
                        value: true,
                        message: 'Hwacs490 is required',
                      },
                    }}
                  />

                  <div className="rw-forgot-link">
                    <Link
                      to={routes.forgotPassword()}
                      className="rw-forgot-link"
                    >
                      Forgot Hwacs490?
                    </Link>
                  </div>

                  <FieldError name="hwacs490" className="rw-field-error" />

                  <div className="rw-button-group">
                    <Submit className="rw-button rw-button-blue">Login</Submit>
                  </div>
                </Form>
              </div>
            </div>
          </div>
          <div className="rw-login-link">
            <span>Don&apos;t have an account?</span>{' '}
            <Link to={routes.signup()} className="rw-link">
              Sign up!
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

export default LoginPage
