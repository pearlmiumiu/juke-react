import React from 'react';
import { Link } from 'react-router-dom';

const AllAlbums = (props) => {

  const albums = props.albums;
  //use object destructing
  //const {albums} = this.props

  return (
    <div>
      <h3>Albums</h3>
      <div className="row">
        {
          albums.map(album => (
            <div className="col-xs-4" key={ album.id }>  {/*each time return an array , we need a key in jsx*/}
              <Link className="thumbnail" to={`/albums/${album.id}`}>
                <img src={ album.imageUrl } />
                <div className="caption">
                  <h5>
                    <span>{ album.name }</span>
                  </h5>
                  <small>{ album.songs.length } songs</small>
                </div>
              </Link>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default AllAlbums;
