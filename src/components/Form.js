import React from 'react'
import WebriQForm from '@webriq/gatsby-webriq-form'
import './form.css'

class WebriqForm extends React.Component {
   constructor(props) {
    super(props);
      this.state = {
        value: '',
        classes: 'notActive',
        focus: 'notfocus',
        clickedOutside: false,
        active: false
      };
    }

    componentDidMount() {
      function handleKeyUp(e){
        // console.log(e.currentTarget);
        // When this function is used as an event handler: this === e.currentTarget
        if(e.target.value.length === 0) {
          this.setAttribute('class', 'form-group')
        }
        else {
          this.setAttribute('class', 'form-group active')
        }
      }

      var formField = document.getElementsByClassName('form-group');
      for(var i = 0; i < formField.length; i++){
        // Console: print the clicked <p> element 
        formField[i].addEventListener('keyup', handleKeyUp);
      }
    }
    

  render() {
    const { children, form_id, form_name, form_classname } = this.props;
    return (
      <WebriQForm
          method="POST"
          data-form-id={form_id} // replace with your formID
          name={form_name}
          className={form_classname}
        >
        { children }
      </WebriQForm>
    )
  }
}

export default WebriqForm;