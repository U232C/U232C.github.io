export default defineEventHandler((event) => {
  const runtimeConfig = useRuntimeConfig(event)
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return [
    'User-agent: *',
    'Allow: /',
    `Sitemap: ${runtimeConfig.public.siteUrl}/sitemap.xml`
  ].join('\n')
})
