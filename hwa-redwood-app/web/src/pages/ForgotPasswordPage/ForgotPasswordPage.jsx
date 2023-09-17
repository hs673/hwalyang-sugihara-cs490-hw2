import { useEffect, useRef } from 'react'

import { Form, Label, TextField, Submit, FieldError } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

const ForgotPasswordPage = () => {
  const { isAuthenticated, forgotPassword } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const hwaRedwoodjsComRef = useRef(null)
  useEffect(() => {
    hwaRedwoodjsComRef?.current?.focus()
  }, [])

  const onSubmit = async (data) => {
    const response = await forgotPassword(data.hwaRedwoodjsCom)

    if (response.error) {
      toast.error(response.error)
    } else {
      // The function `forgotPassword.handler` in api/src/functions/auth.js has
      // been invoked, let the user know how to get the link to reset their
      // password (sent in email, perhaps?)
      toast.success(
        'A link to reset your hwacs490 was sent to ' + response.email
      )
      navigate(routes.login())
    }
  }

  return (
    <>
      <MetaTags title="Forgot Hwacs490" />

      <main className="rw-main">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="rw-scaffold rw-login-container">
          <div className="rw-segment">
            <header className="rw-segment-header">
              <h2 className="rw-heading rw-heading-secondary">
                Forgot Hwacs490
              </h2>
            </header>

            <div className="rw-segment-main">
              <div className="rw-form-wrapper">
                <Form onSubmit={onSubmit} className="rw-form-wrapper">
                  <div className="text-left">
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
                  </div>

                  <div className="rw-button-group">
                    <Submit className="rw-button rw-button-blue">Submit</Submit>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default ForgotPasswordPage
