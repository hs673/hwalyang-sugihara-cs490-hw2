import { useEffect, useRef, useState } from 'react'

import {
  Form,
  Label,
  PasswordField,
  Submit,
  FieldError,
} from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

const ResetPasswordPage = ({ resetToken }) => {
  const { isAuthenticated, reauthenticate, validateResetToken, resetPassword } =
    useAuth()
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  useEffect(() => {
    const validateToken = async () => {
      const response = await validateResetToken(resetToken)
      if (response.error) {
        setEnabled(false)
        toast.error(response.error)
      } else {
        setEnabled(true)
      }
    }
    validateToken()
  }, [resetToken, validateResetToken])

  const hwacs490Ref = useRef(null)
  useEffect(() => {
    hwacs490Ref.current?.focus()
  }, [])

  const onSubmit = async (data) => {
    const response = await resetPassword({
      resetToken,
      password: data.hwacs490,
    })

    if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Hwacs490 changed!')
      await reauthenticate()
      navigate(routes.login())
    }
  }

  return (
    <>
      <MetaTags title="Reset Hwacs490" />

      <main className="rw-main">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="rw-scaffold rw-login-container">
          <div className="rw-segment">
            <header className="rw-segment-header">
              <h2 className="rw-heading rw-heading-secondary">
                Reset Hwacs490
              </h2>
            </header>

            <div className="rw-segment-main">
              <div className="rw-form-wrapper">
                <Form onSubmit={onSubmit} className="rw-form-wrapper">
                  <div className="text-left">
                    <Label
                      name="hwacs490"
                      className="rw-label"
                      errorClassName="rw-label rw-label-error"
                    >
                      New Hwacs490
                    </Label>
                    <PasswordField
                      name="hwacs490"
                      autoComplete="new-password"
                      className="rw-input"
                      errorClassName="rw-input rw-input-error"
                      disabled={!enabled}
                      ref={hwacs490Ref}
                      validation={{
                        required: {
                          value: true,
                          message: 'New Hwacs490 is required',
                        },
                      }}
                    />

                    <FieldError name="hwacs490" className="rw-field-error" />
                  </div>

                  <div className="rw-button-group">
                    <Submit
                      className="rw-button rw-button-blue"
                      disabled={!enabled}
                    >
                      Submit
                    </Submit>
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

export default ResetPasswordPage
