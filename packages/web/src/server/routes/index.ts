import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'

import { runAsyncWrapper } from '../lib/async-handler'
import {
  redirectIfLoggedIn,
  redirectToCustomSsoFromAuthPages,
  dataPrefetch,
  dehydrate,
  initializeApp,
  privateNetworkGuard,
  releaseChannelRedirect,
  unconfirmedUsersRedirect,
  v1MigrationRedirect,
} from '../middlewares'
import { renderApp } from '../renderer'
import { logout } from './api/logout'
import { otp } from './api/otp'
import { refreshToken } from './api/refresh-token'
import { jwtSsoLogin } from './api/jwtSsoLogin'
import { ssosRedirect } from './ssos-redirect'
import { getVerifyPageData } from './verify-email'

export const router = express.Router()

router.get('/_health', cors(), (req, res) => {
  res.status(200).json({ message: 'Cheers! 🍻', success: true })
})
router.get('/.well-known/is-neo', cors(), (req, res) => {
  res.status(200).send(true)
})

// backward compatibility for our FE project
router.get('/settings/login', (req, res) => {
  const url = req.originalUrl.replace('/settings/login', '/settings/account')
  res.redirect(url)
})

router.get('/api/auth/otp', runAsyncWrapper(otp))
router.get('/api/auth/sso', runAsyncWrapper(jwtSsoLogin))
router.get('/api/auth/logout', runAsyncWrapper(logout))
router.use(
  '/api/auth/refresh-token',
  bodyParser.json(),
  runAsyncWrapper(refreshToken),
)
router.get('/ssos/redirect', runAsyncWrapper(ssosRedirect))

// redirect v1 routes to v2
router.get(
  [
    '/post/:postId',
    '/topic/:topicSlug',
    '/user/:username',
    '/question/:questionId',
  ],
  runAsyncWrapper(v1MigrationRedirect),
)

// If your page is standalone and does need access-token you should define it above this middleware
// This middleware stores the appInitialProps, client and queryClient inside the res.locals.
router.use(runAsyncWrapper(initializeApp))

// Check release channel handling
router.use(runAsyncWrapper(releaseChannelRedirect))

router.get(
  ['/auth/verify', '/auth/verify-email'],
  runAsyncWrapper(getVerifyPageData),
)

// redirect to homepage if visiting the auth pages and the user is logged in
router.get(
  [
    '/auth/login',
    '/auth/signup',
    '/auth/reset-password',
    '/auth/forgot-password',
  ],
  redirectIfLoggedIn,
)

router.use(privateNetworkGuard)
router.use(unconfirmedUsersRedirect)

router.get(
  ['/auth/login', '/auth/signup'],
  runAsyncWrapper(redirectToCustomSsoFromAuthPages),
)

router.use(dataPrefetch)

// Dehydrate the fetched state after calling all of the middlewares and just before rendering
router.use(dehydrate)
router.get(
  '/*',
  runAsyncWrapper(async (req, res) => {
    const { context, html } = await renderApp(req, res)

    if (context?.url) {
      res.redirect(context.url)
    } else {
      res.status(200).send(html)
    }
  }),
)
