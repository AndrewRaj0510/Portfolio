import ProjectsView from '@/components/ProjectsView'
import { toSlug } from '@/lib/slug'
import { projects, projectGroups } from './data'

// Props passed to a client component reach the browser, so links go out as /go/ paths
// that app/go/[...path]/route.js redirects on the server: the real URLs never appear
// in the page. Private projects lose `github` altogether, even one added by mistake.
const forBrowser = ({ github, imageCredit, ...project }) => {
  const slug = toSlug(project.title)
  return {
    ...project,
    ...(github && project.visibility !== 'private' && { github: `/go/repo/${slug}` }),
    ...(imageCredit && {
      imageCredit: {
        text: imageCredit.text,
        ...(imageCredit.href && { href: `/go/credit/${slug}` }),
      },
    }),
  }
}

export default function ProjectsPage() {
  return <ProjectsView projects={projects.map(forBrowser)} groups={projectGroups} />
}
