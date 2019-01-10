const path = require('path')
const slugify = require('slugify')
const fs = require('fs')

const makeRequest = (graphql, request) =>
  new Promise((resolve, reject) => {
    // Query for nodes to use in creating pages.
    resolve(
      graphql(request).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        return result
      })
    )
  })

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const getPosts = makeRequest(
    graphql,
    `query {
        allStrapiPosts (
          filter:{status:{ne: "unpublished"}}
          sort: {fields:[createdAt], order: DESC}
          ) {
          edges {
            node {
              id
              fields {
                slug
              }
            }
          }
        }
      }
    `
  ).then(result => {
    // Create individual pages
    result.data.allStrapiPosts.edges.forEach(({ node }) => {
      createPage({
        path: `/${node.fields.slug}`,
        component: path.resolve(`./src/templates/post/single.js`),
        context: {
          id: node.id,
        },
      })
    })

    // Create paginated posts when enabled, disabled by default. Set value of USE_PAGINATION to 'true' in env
    if (typeof process.env.USE_PAGINATION !== 'undefined' && process.env.USE_PAGINATION === 'true') {
      const posts = result.data.allStrapiPosts.edges.map(post => post.node)
      const postsPerPage = process.env.POST_PER_PAGE || 10;
      const numPages = Math.ceil(posts.length / postsPerPage)

      Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
          path: i === 0 ? `/blog` : `/blog/${i + 1}`,
          component: path.resolve(`./src/templates/post/list.js`),
          context: {
            limit: postsPerPage,
            skip: i * postsPerPage,
            numPages,
            currentPage: i + 1,
          },
        })
      })
    }
  })

  return Promise.all([getPosts])
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  // Create slug field for Strapi posts
  if (node.internal.type === `StrapiPosts`) {
    const slugify_title = slugify(node.title, {
      replacement: '-', // replace spaces with replacement
      remove: /[,*+~.()'"!:@]/g, // regex to remove characters
      lower: true, // result in lower case
    })

    // Create slug field all lowercased and separated with dashes
    createNodeField({
      node,
      name: `slug`,
      value: slugify_title,
    })
  }
}

// Write site admin URL on post build
exports.onPostBuild = () => {
  fs.writeFile('./public/site.json', JSON.stringify({ "siteAdminUrl": process.env.API_URL + '/admin' }), 'utf8', function(err) {
    console.log(err)
  })
}
