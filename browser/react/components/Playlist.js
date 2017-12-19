import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
 import axios from 'axios';
 import Songs from './Songs' ; //we have songs component, so we need to import songs
 import AddSongForm from './AddSongForm';



class Playlist extends Component{
  constructor(){
  	super()
  	this.state={
  		playlist:{}

  	}
    this.addSongToPlaylist=this.addSongToPlaylist.bind(this)

  }

  fetchPlaylistById(playlistId){
    axios
      .get(`/api/playlists/${playlistId}`)
      .then(res=>res.data)
      .then(playlist=>{
        //console.log(playlist)
        this.setState({playlist})
      })


  }

  // addSongToPlaylist(playlistId, songId){  //the playlist server, post playlist route, receive either id
  //   return axios.post(`/api/playlists/${playlistId}/songs`, {id: songId})
      
  //              .then(song=>{
  //               const playlist=this.state.playlist;
  //               const songs=playlist.songs;
  //               const newSongs=songs.concat(song)
  //               // const newSong=[...songs, song]
  //               const newPlaylist=Object.assing({}, playlist, {songs: newSongs})
  //               this.setState={
  //                 playlist:newPlaylist
  //               }
  //              })
  // }

  addSongToPlaylist (playlistId, songId) {
    return axios.post(`/api/playlists/${playlistId}/songs`, {
      id: songId
    })
    .then(res => res.data)
    .then(song => {
      const playlist = this.state.playlist;
      const songs = playlist.songs;
      const newSongs = [...songs, song];
      const newPlaylist = Object.assign({}, playlist, { songs: newSongs });
      this.setState({ playlist: newPlaylist });
    });
  }


  

  componentDidMount(){
    //get data from the server
    //reactDOM.render lifecycle->componentWillMount-->render->mounted component--comonentDidMount
    //once the component mounted, you can use 'setState' to change the old state, and render the new state, then new component mounted
    // or you could removed , execute componentWillUnmount
    //or rednered by another component-> componentWillReceiveProps
    //compare the new props to the old props, and rener, mount new component



    const playlistId= this.props.match.params.playlistId
    this.fetchPlaylistById(playlistId)

     
  }

  componentWillReceiveProps(newProps){
    const currentProps=this.props  //for the purpuse of comparing current prop and new prop 
    const newPlaylistId=newProps.match.params.playlistId
    const currentPlaylistId=currentProps.match.params.playlistId
    if(newPlaylistId !== currentPlaylistId){  
      this.fetchPlaylistById(newPlaylistId)   //reset the playlist on the state
    }

  }

  
  
  render(){

  	const playlist= this.state.playlist
	  return (
			<div>
			  <h3>{ playlist.name }</h3>
			  { playlist.songs && <Songs songs={playlist.songs} />} {/** Hooray for reusability! */}
			  { playlist.songs && !playlist.songs.length && <small>No songs.</small> }
			  <hr />
        <AddSongForm playlist={playlist} addSongToPlaylist={this.addSongToPlaylist}/>
			</div>
	  	)
    }
}


export default Playlist