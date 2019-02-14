import React from "react";

class AdminPanel extends React.Component {
  state = {
    name: "company name",
    motto: "our motto",
    codeSnippet: "<h1>Welcome</h1>"
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className='create-form'>
        <input
          name="name"
          placeholder="Company Name"
          value={this.state.name}
          onChange={this.handleInputChange}
        />
        <input
          name="name"
          placeholder="Motto"
          value={this.state.motto}
          onChange={this.handleInputChange}
        />
        <h3>Code Snippet</h3>
        <textarea
          name="textBody"
          placeholder="</>"
          value={this.state.codeSnippet}
          onChange={this.handleInputChange}
        />
        <h3>Team</h3>
        <iframe>

        </iframe>
        <button>Add Team Member</button>
      </div>
    )
  }
}

export default AdminPanel;