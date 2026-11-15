// "Microsoft CloudOptima" -> "microsoft-cloudoptima". Used for /projects?project=<slug>
// (HeroDeck's slugs follow it) and for the /go/repo/<slug> and /go/credit/<slug> links.
export const toSlug = (title) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
