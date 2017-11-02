import fetch from 'isomorphic-fetch';
//"query":"{allChoices { edges { node {questionId  question { questionText pubDate } choiceText votes } }}}"
export default function fetchHello(){
    return fetch(`/api`,{
        method: "POST",
        accept: 'application/json',
        body: JSON.stringify({
          query:`{
            allChoices {
              edges {
                node {
                  choiceText
                  question {
                    questionText
                    pubDate
                  }
                }
              }
            }
          }
          `
        })
    })
    .then(
      response => response.json(),
      error => console.log('An error occured.', error)
    )
    .then(json =>
      console.log(json)
    )
}
