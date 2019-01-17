import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../../layouts'
import ReactMarkdown from 'react-markdown'
import DEBUG from '../../utils/debug'

/**
 * Single post template
 */
export default ({ data }) => {
  return (
    <Layout
      head={{
        title: data.strapiPosts.title,
        meta: {
          title: data.strapiPosts.metaTitle,
          keywords: data.strapiPosts.metaKeywords,
          description: data.strapiPosts.metaDescription,
          noIndex: data.strapiPosts.status === "draft" ? true : false
        },
      }}
    >
      <DEBUG data={data} />
      <h2>{data.strapiPosts.title}</h2>
      <p>{data.strapiPosts.status === "draft"? <span>Status: <strong className="draft">Draft</strong></span> : ""}</p>
      <ReactMarkdown escapeHtml={false} source={data.strapiPosts.body} />
      <Link to="/blog">Go back</Link>
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    strapiPosts(id: { eq: $id }) {
      id
      title
      body
      excerpt
      author {
        id
        email
        profile
      }
      fields {
        slug
      }
      metaTitle
      metaKeywords
      metaDescription
      status
    }
  }
`
