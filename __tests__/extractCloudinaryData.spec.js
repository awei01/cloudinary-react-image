const extractCloudinaryData = require('~/src/extractCloudinaryData')

describe('extractCloudinaryData()', () => {
  // function makeImages ({ id, extension, type, resource, cloud, domain, protocol }) {
  //   // we'll handle multiple combinations of transforms and version
  //   id = typeof id === 'undefined' ? '/path/to/image' : id
  //   extension = typeof extension === 'undefined' ? 'jpg' : extension
  //   type = typeof type === 'undefined' ? 'upload' : type
  //   resource = typeof resource === 'undefined' ? 'image' : resource
  //   cloud = typeof cloud === 'undefined' ? 'cloud' : cloud
  //   domain = typeof domain === 'undefined' ? 'res.cloudinary.com' : domain
  //   protocol = typeof protocol === 'undefined' ? 'https' : protocol

  //   return [
  //     `${protocol ? protocol + ':' : ''}`
  //   ]
  // }

  it(`works with fully qualified url`, () => {
    const protocol = 'https'
    const domain = 'res.cloudinary.com'
    const cloud = 'cloud'
    const resource = 'image'
    const type = 'upload'
    const version = 'v12345'
    const id = 'path/to/image'
    const extension = 'jpg'

    const urls = [
      `${protocol}://${domain}/${cloud}/${resource}/${type}/w_300,h_300,o_50,g_faces/${version}/${id}.${extension}`,
      `${protocol}://${domain}/${cloud}/${resource}/${type}/w_300,h_300/o_50,g_faces/${version}/${id}.${extension}`,
      `${protocol}://${domain}/${cloud}/${resource}/${type}/w_300/h_300/o_50/g_faces/${version}/${id}.${extension}`,
      `${protocol}://${domain}/${cloud}/${resource}/${type}/w_300,h_300,o_50,g_faces/${id}.${extension}`,
      `${protocol}://${domain}/${cloud}/${resource}/${type}/w_300,h_300/o_50,g_faces/${id}.${extension}`,
      `${protocol}://${domain}/${cloud}/${resource}/${type}/w_300/h_300/o_50/g_faces/${id}.${extension}`,
      `${protocol}://${domain}/${cloud}/${resource}/${type}/${version}/${id}.${extension}`
    ]
    const results = urls.map(extractCloudinaryData)
    expect(results[0]).toEqual({ protocol, domain, cloud, resource, type, id, extension, version, transforms: 'w_300,h_300,o_50,g_faces' })
    expect(results[1]).toEqual({ protocol, domain, cloud, resource, type, id, extension, version, transforms: 'w_300,h_300/o_50,g_faces' })
    expect(results[2]).toEqual({ protocol, domain, cloud, resource, type, id, extension, version, transforms: 'w_300/h_300/o_50/g_faces' })

    expect(results[3]).toEqual({ protocol, domain, cloud, resource, type, id, extension, version: undefined, transforms: 'w_300,h_300,o_50,g_faces' })
    expect(results[4]).toEqual({ protocol, domain, cloud, resource, type, id, extension, version: undefined, transforms: 'w_300,h_300/o_50,g_faces' })
    expect(results[5]).toEqual({ protocol, domain, cloud, resource, type, id, extension, version: undefined, transforms: 'w_300/h_300/o_50/g_faces' })

    expect(results[6]).toEqual({ protocol, domain, cloud, resource, type, id, extension, version, transforms: undefined })
  })

  it(`works without the protocol (https:) portion`, () => {
    const protocol = undefined
    const domain = 'res.cloudinary.com'
    const cloud = 'cloud'
    const resource = 'image'
    const type = 'upload'
    const version = 'v12345'
    const id = 'path/to/image'
    const extension = 'jpg'

    const urls = [
      `//${domain}/${cloud}/${resource}/${type}/w_300,h_300,o_50,g_faces/${version}/${id}.${extension}`,
      `//${domain}/${cloud}/${resource}/${type}/w_300,h_300/o_50,g_faces/${version}/${id}.${extension}`,
      `//${domain}/${cloud}/${resource}/${type}/w_300/h_300/o_50/g_faces/${version}/${id}.${extension}`,
      `//${domain}/${cloud}/${resource}/${type}/w_300,h_300,o_50,g_faces/${id}.${extension}`,
      `//${domain}/${cloud}/${resource}/${type}/w_300,h_300/o_50,g_faces/${id}.${extension}`,
      `//${domain}/${cloud}/${resource}/${type}/w_300/h_300/o_50/g_faces/${id}.${extension}`,
      `//${domain}/${cloud}/${resource}/${type}/${version}/${id}.${extension}`
    ]
    const results = urls.map(extractCloudinaryData)
    expect(results[0]).toEqual({ protocol, domain, cloud, resource, type, id, extension, version, transforms: 'w_300,h_300,o_50,g_faces' })
    expect(results[1]).toEqual({ protocol, domain, cloud, resource, type, id, extension, version, transforms: 'w_300,h_300/o_50,g_faces' })
    expect(results[2]).toEqual({ protocol, domain, cloud, resource, type, id, extension, version, transforms: 'w_300/h_300/o_50/g_faces' })

    expect(results[3]).toEqual({ protocol, domain, cloud, resource, type, id, extension, version: undefined, transforms: 'w_300,h_300,o_50,g_faces' })
    expect(results[4]).toEqual({ protocol, domain, cloud, resource, type, id, extension, version: undefined, transforms: 'w_300,h_300/o_50,g_faces' })
    expect(results[5]).toEqual({ protocol, domain, cloud, resource, type, id, extension, version: undefined, transforms: 'w_300/h_300/o_50/g_faces' })

    expect(results[6]).toEqual({ protocol, domain, cloud, resource, type, id, extension, version, transforms: undefined })
  })

  it(`works without domain and just a path`, () => {
    const protocol = undefined
    const domain = undefined
    const cloud = 'cloud'
    const resource = 'image'
    const type = 'upload'
    const version = 'v12345'
    const id = 'path/to/image'
    const extension = 'jpg'

    const urls = [
      `/${cloud}/${resource}/${type}/w_300,h_300,o_50,g_faces/${version}/${id}.${extension}`,
      `/${cloud}/${resource}/${type}/w_300,h_300/o_50,g_faces/${version}/${id}.${extension}`,
      `/${cloud}/${resource}/${type}/w_300/h_300/o_50/g_faces/${version}/${id}.${extension}`,
      `/${cloud}/${resource}/${type}/w_300,h_300,o_50,g_faces/${id}.${extension}`,
      `/${cloud}/${resource}/${type}/w_300,h_300/o_50,g_faces/${id}.${extension}`,
      `/${cloud}/${resource}/${type}/w_300/h_300/o_50/g_faces/${id}.${extension}`,
      `/${cloud}/${resource}/${type}/${version}/${id}.${extension}`
    ]
    const results = urls.map(extractCloudinaryData)
    expect(results[0]).toEqual({ protocol, domain, cloud, resource, type, id, extension, version, transforms: 'w_300,h_300,o_50,g_faces' })
    expect(results[1]).toEqual({ protocol, domain, cloud, resource, type, id, extension, version, transforms: 'w_300,h_300/o_50,g_faces' })
    expect(results[2]).toEqual({ protocol, domain, cloud, resource, type, id, extension, version, transforms: 'w_300/h_300/o_50/g_faces' })

    expect(results[3]).toEqual({ protocol, domain, cloud, resource, type, id, extension, version: undefined, transforms: 'w_300,h_300,o_50,g_faces' })
    expect(results[4]).toEqual({ protocol, domain, cloud, resource, type, id, extension, version: undefined, transforms: 'w_300,h_300/o_50,g_faces' })
    expect(results[5]).toEqual({ protocol, domain, cloud, resource, type, id, extension, version: undefined, transforms: 'w_300/h_300/o_50/g_faces' })

    expect(results[6]).toEqual({ protocol, domain, cloud, resource, type, id, extension, version, transforms: undefined })
  })
})
