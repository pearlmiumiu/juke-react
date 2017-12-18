import React from "react"
import { Link } from "react-router-dom"

const Sidebar = (props) => {
	// const playlists=props.playlists  //get the props from main
	return (
		<sidebar>
			<img src="juke.svg" className="logo" />
			<section>
				<h4 className="menu-item">
					<Link to="/albums">ALBUMS</Link>
				</h4>
			</section>
			<section>
				<h4 className="menu-item">
					<Link to="/artists">ARTISTS</Link>
				</h4>
			</section>
			<hr />
			<section>
				<h4 className="text-muted">PLAYLISTS</h4>
				<h4>
					<Link className="btn btn-primary btn-block" to="/NewPlaylist">
						<span className="glyphicon glyphicon-plus" /> PLAYLIST
					</Link>
				</h4>
				<hr />
			    {/*add the newly added playlist to the sidebar*/}
				<ul className="list-unstyled">  
					{props.playlists.map(playlist => {
						return (
							<li className="playlist-item menu-item" key={playlist.id}>
								<Link to={`/playlists/${playlist.id}`}>{playlist.name}</Link>  
							     {/*link the url, we go to '/playlist/:id' we get the playlist */}
							</li>
						)
					})}
				</ul>
			</section>
		</sidebar>
	)
}

export default Sidebar
