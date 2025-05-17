import { useCallback, useEffect } from 'react'
import { useGoogleAuthMutation } from '~/services/auth-service'
import { useModalContext } from '~/context/modal-context'
import { useSnackBarContext } from '~/context/snackbar-context'
import useBreakpoints from '~/hooks/use-breakpoints'
import { snackbarVariants } from '~/constants'
import { styles } from '~/containers/guest-home-page/google-button/GoogleButton.styles'

const GoogleButton = ({ role, buttonWidth, type }) => {
  const mediaQuery = useBreakpoints().isLaptopAndAbove ? 'md' : 'xs'
  const { closeModal } = useModalContext()
  const { setAlert } = useSnackBarContext()
  const [googleAuth] = useGoogleAuthMutation()

  const handleCredentialResponse = useCallback(
    async (response) => {
      try {
        const idToken = response.credential

        await googleAuth({
          idToken,
          role // Передаємо роль з пропсів
        }).unwrap()

        closeModal()
      } catch (e) {
        setAlert({
          severity: snackbarVariants.error,
          message: `errors.${e.data.code}`
        })
      }
    },
    [googleAuth, role, closeModal, setAlert]
  )

  useEffect(() => {
    const googleId = window.google.accounts.id

    googleId.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse
    })

    googleId.renderButton(document.getElementById('googleButton'), {
      size: 'large',
      width: buttonWidth[mediaQuery],
      locale: 'en',
      text: `${type}_with`
    })
  }, [handleCredentialResponse, buttonWidth, type, mediaQuery])

  return <div id='googleButton' style={styles.google} />
}

export default GoogleButton
