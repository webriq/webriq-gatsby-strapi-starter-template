import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../layouts'
import PostList from '../../components/post/index'
import PostNav from '../../components/post/nav'

/**
 * Blog list template if USE_PAGINATION is set to 'true'
 */
class BlogList extends React.Component {
  render() {
    const posts = this.props.data.allStrapiPosts.edges.map(post => post.node)
    const users = this.props.data.allStrapiUsers.edges.map(user => user.node)

    return (
      <Layout>
        <h2>Recent Posts</h2>
        <code>This page is located at /src/templates/list.js</code>
        <>
          <PostList posts={posts} users={users} />
          <PostNav pageContext={this.props.pageContext} />
        </>
      </Layout>
    )
  }
}

export default BlogList

export const pageQuery = graphql`
  query blogListTemplateQuery($skip: Int!, $limit: Int!) {
    allStrapiPosts(
      sort: { fields: [createdAt], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          title
          excerpt
          createdAt(fromNow: true)
          updatedAt(fromNow: true)
          author {
            id
          }
        }
      }
    }
    allStrapiUsers {
      edges {
        node {
          id
          email
          profile {
            id
            firstname
            lastname
          }
        }
      }
    }
  }
`
