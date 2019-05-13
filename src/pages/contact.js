import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import SampleForm from '../components/Form'

class ContactPage extends React.Component {
  render () {
    const siteTitle = this.props.data.site.siteMetadata.title
    const siteDescription = this.props.data.site.siteMetadata.description
    
    return (
      <Layout location={this.props.location} title={siteTitle}>
          <SEO title={siteTitle} description={siteDescription} />
            <SampleForm
            form_name="Newsletter Form"
            form_id="5bcd42f86b63453b251972bc"
            form_classname="form-newsletter"
          >
          <div className="form-row">
          <div className="col-12 mb-3">
            <div className="form-group">
              <input
                className="form-control"
                type="email"
                name="Email Address"
                id="email_address"
              />
              <label htmlFor="email_address">
                Enter Your Email Address
              </label>
            </div>
            <small className="text-dark form-text mt-2">
                We will never share your email with anyone else.
              </small>
          </div>
          <div className="col-12 mb-3">
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                name="Name"
                id="full_name"
              />
              <label htmlFor="full_name">
                Enter Your Name
              </label>
            </div>
          </div>
          <div className="col-12">
            
              <div className="webriq-recaptcha" />
            
          </div>

          <div className="col-12">
            <div className="form-group">
              <button
                className="btn btn-primary hvr-shadow"
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
          </SampleForm>
        </Layout>

    )
  }

  
}
export default ContactPage

export const ContactPageQuery = graphql`
  query ContactPageQuery {
    site {
      siteMetadata {
        title
        author
        description
      }
    }
  }
`