import React, { Component } from "react"
import { HashRouter as Router, Route, Switch } from "react-router-dom"
import StatefulAlbums from "./StatefulAlbums"
import SingleAlbum from "./SingleAlbum"
import AllArtists from "./AllArtists"
import SingleArtist from "./SingleArtist"
import Sidebar from "./Sidebar"
import Player from "./Player"
import NewPlaylist from "./NewPlaylist"
import axios from "axios"
import Playlist from "./Playlist"

export default class Main extends Component {  //Main is the first componet, name should be upper case as "Main"
	constructor(props) {
		super(props)
		this.state = {
			playlists: []
		}
		this.addPlaylist = this.addPlaylist.bind(this) //pass it down as a props to the newplaylist's handleSubmit 
	}

	addPlaylist(inputValue) {  //async playlist name 
		axios
			.post("/api/playlists", { name: inputValue })
			.then(res => res.data)
			.then(result => {                 //concat return a new array, mutable changes, no use push
				const playlists = this.state.playlists.concat(result) //add the new playlist to our origin playlist
				//or we can use spread operator to estabilish a new array 
				//playlists=[...this.state.playlist, result]

				this.setState({ playlists })
			})
	}

	componentDidMount() {  //get all the playlist 
		axios                     //import axios
			.get("/api/playlists")
			.then(res => res.data)
			.then(playlists => this.setState({ playlists: playlists })) // same as {playlists}
			.catch(err => console.error(err))
	}

	render() {
		return (
			<Router>
				<div id="main" className="container-fluid">
					<div className="col-xs-2">
						<Sidebar playlists={this.state.playlists} /> {/*pass the playlists props to the sidebar*/}
					</div>
					<div className="col-xs-10">
						<Switch>
							<Route exact path="/albums" component={StatefulAlbums} />
							<Route path="/albums/:albumId" component={SingleAlbum} />
							<Route exact path="/artists" component={AllArtists} />
							<Route path="/artists/:artistId" component={SingleArtist} />
							<Route path="/playlists/:playlistId" component={Playlist}/>
							<Route
								exact
								path="/NewPlaylist"
								render={props => (
									<NewPlaylist {...props} addPlaylist={this.addPlaylist} />
								)}
							/>
							<Route component={StatefulAlbums} />
						</Switch>
					</div>
					<Player />
				</div>
			</Router>
		)
	}
}
