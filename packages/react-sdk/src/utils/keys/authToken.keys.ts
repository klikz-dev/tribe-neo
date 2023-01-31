const AUTH_TOKEN_KEY = 'authToken'
const AUTH_MEMBER_KEY = 'authMember'
const AUTH_MEMBER_SESSIONS_KEY = 'authMemberSessions'
const LOGIN_KEY = 'loginNetwork'
const LOGIN_WITH_SSO_KEY = 'loginWithSso'
const JOIN_NETWORK_KEY = 'joinNetwork'
const JOIN_NETWORK_WITH_TOKEN_KEY = 'joinNetworkWithToken'
const JOIN_NETWORK_WITH_LINK_KEY = 'joinNetworkWithLink'
const VERIFY_MEMBER_KEY = 'verifyMember'
const SSOS_KEY = 'ssos'
const RESEND_VERIFICATION_CODE = 'resendVerificationCode'
const MEMBER_INVITATION_VALIDITY = 'memberInvitationValidity'
const MEMBER_INVITATION_VALIDITY_LINK = 'memberInvitationValidityLink'
const SEND_RESET_PASSWORD_EMAIL_KEY = 'sendResetPasswordEmail'
const SSO_MEMBERSHIP_KEY = 'ssoMembership'
const SSO_URL_KEY = 'ssoUrl'

export const getAuthTokensKey = () => AUTH_TOKEN_KEY
export const getAuthMemberKey = () => AUTH_MEMBER_KEY
export const getAuthMemberSessionsKey = () => AUTH_MEMBER_SESSIONS_KEY
export const getLoginKey = () => LOGIN_KEY
export const getLoginWithSsoKey = () => LOGIN_WITH_SSO_KEY
export const getVerifyMemberKey = () => VERIFY_MEMBER_KEY
export const getJoinNetworkKey = () => JOIN_NETWORK_KEY
export const getJoinNetworkWithTokenKey = () => JOIN_NETWORK_WITH_TOKEN_KEY
export const getJoinNetworkWithLinkKey = () => JOIN_NETWORK_WITH_LINK_KEY
export const getSsosKey = () => SSOS_KEY
export const getResendVerificationCode = () => RESEND_VERIFICATION_CODE
export const getMemberInvitationValidity = token => [
  MEMBER_INVITATION_VALIDITY,
  token,
]
export const getMemberInvitationLinkValidity = id => [
  MEMBER_INVITATION_VALIDITY_LINK,
  id,
]
export const getSendResetPasswordEmailKey = () => SEND_RESET_PASSWORD_EMAIL_KEY
export const getSsoMembershipKey = () => SSO_MEMBERSHIP_KEY
export const getSsoUrlKey = () => SSO_URL_KEY
