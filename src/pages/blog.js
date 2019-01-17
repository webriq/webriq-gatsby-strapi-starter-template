import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../layouts'
import style from '../components/post/index.module.css'
import Author from '../components/post/author'
import InfiniteScroll from 'react-infinite-scroller'
import _ from 'lodash'

/**
 * Replaces the typical paginated blog posts to infinite scrolling. Enabled by default.
 * If USE_PAGINATION is set to 'true' in env, this will not page will be discarded
 */
class BlogPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: [],
      hasMoreItems: true,
    }
  }

  loadItems(currentPage) {
    const self = this
    const posts = this.props.data.allStrapiPosts.edges.map(post => post.node)
    const postsPerPage = process.env.POST_PER_PAGE || 10;
    const postsChunked = _.chunk(posts, postsPerPage)
    const currentPageIndex = currentPage - 1

    var currentPosts = self.state.posts
    postsChunked[currentPageIndex].forEach(post => {
      currentPosts.push(post)
    })

    if (currentPage >= postsChunked.length) {
      self.setState({
        hasMoreItems: false,
      })
    } else {
      self.setState({
        posts: currentPosts,
        hasMoreItems: true,
      })
    }
  }

  render() {
    const users = this.props.data.allStrapiUsers.edges.map(user => user.node)

    const loader = (
      <div className="loader" key="infinite-scroll-loader">
        Loading ...
      </div>
    )
    var items = []

    this.state.posts.forEach(post => {
      items.push(
        <div className="post" key={post.id}>
          <h2 className={style.title}>
            <Link to={post.fields.slug}>{post.title}</Link>
          </h2>
          <small> ({post.createdAt})</small>
          <br />
          <Author users={users} userId={post.author.id} />
          <img src={post.banner.url} alt="Post banner" />
          <p className={style.content}>
            {post.excerpt || 'No excerpt found...'}
          </p>
        </div>
      )
    })

    return (
      <Layout>
        <code>This page is located at /src/pages/blog.js</code>
        <br />
        <br />
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadItems.bind(this)}
          hasMore={this.state.hasMoreItems}
          loader={loader}
        >
          <div className="posts">{items}</div>
        </InfiniteScroll>
      </Layout>
    )
  }
}

export default BlogPage

export const loadMoreQuery = graphql`
  query  {
    allStrapiPosts(
      filter: {status:{eq: "published"}}
      sort: { fields: [createdAt], order: DESC }
      ){
      edges {
        node {
          id
          title
          excerpt
          createdAt(fromNow: true)
          updatedAt(fromNow: true)
          fields {
            slug
          }
          banner {
            url
          }
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
