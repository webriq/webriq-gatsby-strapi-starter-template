const path = require(`path`)
const slugify = require('slugify')
const fs = require('fs')
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  return graphql(
    `
      query {
        allStrapiPosts(
          filter: { status: { ne: "unpublished" } }
          sort: { fields: [createdAt], order: DESC }
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
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allStrapiPosts.edges
    console.log(posts)

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      createPage({
        path: post.node.fields.slug,
        component: blogPost,
        context: {
          id: post.node.id,
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }

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
  fs.writeFile(
    './public/site.json',
    JSON.stringify({ siteAdminUrl: process.env.API_URL + '/admin' }),
    'utf8',
    function(err) {
      console.log(err)
    }
  )
}
