// Redirects for every external link on the site, so the real URLs stay on the server:
//   /go/<name>            a site link from lib/links.js (resume, github, linkedin, ...)
//   /go/repo/<slug>       a public project's GitHub repo
//   /go/credit/<slug>     a project's image-credit link
//   /go/demo/<slug>       a project's live demo
// Anything else is a 404. Private projects never resolve to a repo.
import { siteLinks } from '@/lib/links'
import { toSlug } from '@/lib/slug'
import { projects } from '@/app/projects/data'

function resolve(path) {
  if (path.length === 1) {
    const [name] = path
    return Object.hasOwn(siteLinks, name) ? siteLinks[name] : null
  }
  if (path.length !== 2) return null

  const [kind, slug] = path
  const project = projects.find((p) => toSlug(p.title) === slug)
  if (!project) return null
  if (kind === 'repo') return project.visibility === 'private' ? null : project.github ?? null
  if (kind === 'credit') return project.imageCredit?.href ?? null
  if (kind === 'demo') return project.demo ?? null
  return null
}

export async function GET(_request, { params }) {
  const { path } = await params
  const url = resolve(path)
  if (!url) return new Response('Not found', { status: 404 })
  return Response.redirect(url, 307)
}
