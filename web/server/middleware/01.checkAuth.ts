import { createError, parseCookies } from 'h3'
import jwt from 'jsonwebtoken'

export default defineEventHandler((event) => {
  const url = event.node.req.url || ''

  // Пропускаем всё, что не /api/
  if (!url.startsWith('/api/')) {
    return
  }

  // Пропускаем служебные nuxt-запросы (иконки, __nuxt, _nuxt_icon и т.п.)
  if (url.startsWith('/api/_nuxt') || url.startsWith('/api/__')) {
    return
  }

  const isPublicApi =
    url.startsWith('/api/auth/sign_in') ||
    url.startsWith('/api/auth/sign_up') ||
    url.startsWith('/api/auth/current_user') ||
    url.startsWith('/api/ping') // для теста

  const cookies = parseCookies(event)
  const token = cookies['access_token']

  if (!token) {
    if (!isPublicApi) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',
        data: { access: false },
      })
    }
    return
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string }
    event.context.userId = decoded.id
  } catch {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid token',
      data: { access: false },
    })
  }
})
