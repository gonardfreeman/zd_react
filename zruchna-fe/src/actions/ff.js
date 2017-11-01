import fetch from 'isomorphic-fetch';

export default function fetchHello(){
    return fetch(`/api`,{
        method: "POST",
        accept: 'application/json',
    })
    .then(
      response => response.json(),
      error => console.log('An error occured.', error)
    )
    .then(json =>
      console.log(json)
    )
}
