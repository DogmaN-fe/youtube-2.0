import { type NextRequest, NextResponse } from 'next/server'


import { getTokensFromRequest } from './utils/get-tokens-from-request'
import { jwtVerifyServer } from './utils/jwt-verify'
import { nextRedirect } from './utils/next-redirect'
import { STUDIO_PAGE } from '@/config/studio-page.config'

export async function protectLoginPages(request: NextRequest) {
	const tokens = await getTokensFromRequest(request)
	

	if (!tokens) return NextResponse.next()

	const verifiedData = await jwtVerifyServer(tokens.accessToken)
	if (!verifiedData) return NextResponse.next()

	return nextRedirect(STUDIO_PAGE.HOME, request.url)
}
