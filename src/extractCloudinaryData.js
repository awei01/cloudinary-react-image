const _parts = [
  /^(?:(?:(https{0,1}):){0,1}\/\/(\w+\.cloudinary\.com)\/(\w+)\/){0,1}/,
  /(?:(image|raw|video)\/){0,1}/,
  /(?:(upload|private|authenticated|fetch|facebook|twitter|twitter_name|instagram|gravatar|youtube|hulu|vimeo|animoto|worldstarhiphop|dailymotion|multi|text|asset|list)\/){0,1}/,
  /(?:((?:[^_/]+_[^,/]+(?:[,/]{0,1}))*)\/){0,1}/,
  /(?:(v\d+)\/){0,1}/,
  /([^\.\s]+)\.([A-Za-z]+)?$/
]
const _regex = new RegExp(_parts.map((part) => {
  return part.source
}).join(''))

module.exports = function (input) {
  const matches = input.match(_regex)
  if (!matches) { throw new Error(`Cloudinary image resource appears invalid [${input}]`) }
  const [, protocol, domain, cloud, resource, type, transforms, version, id, extension] = matches
  return { protocol, domain, cloud, resource, type, transforms, version, id, extension }
}
