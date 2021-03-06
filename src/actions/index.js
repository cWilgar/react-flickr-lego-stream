const queryString = require('query-string')

export function fetchPhotos (page) {
  const request = `https://api.flickr.com/services/rest/?${
    queryString.stringify({
      api_key: 'd560b53b95f87253b6ff64c652583031',
      format: 'json',
      nojsoncallback: 1,
      method: 'flickr.photos.search',
      tags: 'legoland',
      extras: 'owner_name,url_s,url_m,url_l,description,tags',
      per_page: 15,
      page: page
    })
  }`

  return function (dispatch) {
    fetch(request)
      .then(response => response.json())
      .then(data => {
        if (data.stat === 'ok') {
          dispatch({type: 'FETCH_PHOTOS_FULFILLED', payload: data.photos})
        } else {
          throw data
        }
      })
      .catch(error => {
        dispatch({type: 'FETCH_PHOTOS_ERROR', payload: error})
        console.error('FETCH_PHOTOS_ERROR. API response below:', error)
      })
  }
}
