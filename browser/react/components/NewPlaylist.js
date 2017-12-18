import React, { Component } from "react"
import axios from "axios"


class NewPlaylist extends Component {
	constructor(props) {
		super(props)
		this.state = {
			inputValue: "",
			dirty: false
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(event) {
		this.setState({ inputValue: event.target.value, dirty: true }) //when we have change, form become dirty
	}

	handleSubmit(event) {  //inputValue==new playlist name
		event.preventDefault() //prevent default HTML from happening, single page application. no need to refresh, just stay where we are
		this.props.addPlaylist(this.state.inputValue) //send a name to the addplaylist as an argument, which perform a post req to add a new playlist
		this.setState({
			//everytime input value change, jsx knows, but html doesnt
			inputValue: "",  //clear the input value after we enter. so set it empty 
			dirty: false  //dirty : false means the form doesnt have anything(=empty).interact with form.
		})
	}
    
	render() {
		return (
			<div className="well">
				<form className="form-horizontal" onSubmit={this.handleSubmit}>
					<fieldset>
						<legend>New Playlist</legend>
						{this.state.inputValue.length < 1 &&
							this.state.dirty && (
								<div className="alert alert-warning">Please enter a name</div>
							)}
						{this.state.inputValue.length > 16 && (
							<div className="alert alert-warning">Your name is too long</div>
						)}
						<div className="form-group">
							<label className="col-xs-2 control-label">Name</label>
							<div className="col-xs-10">
								<input
									className="form-control"
									type="text"
									onChange={this.handleChange}
									value={this.state.inputValue}  
								/>
							</div>
						</div>
						<div className="form-group">
							<div className="col-xs-10 col-xs-offset-2">
								<button
									type="submit"
									className="btn btn-success"
									disabled={      
										!(
											this.state.inputValue.length < 17 &&
											this.state.inputValue.length > 0
										)
									}
								>
									Create Playlist
								</button>
							</div>
						</div>
					</fieldset>
				</form>
			</div>
		)
	}
}

export default NewPlaylist
