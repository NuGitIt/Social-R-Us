import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      nytLink: 'mostpopular/v2/mostviewed/all-sections/1.json'
    }
    // this.callToReddit = this.callToReddit.bind(this);
    this.callToNYT = this.callToNYT.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  callToReddit(){
    // const { subredditSearch } = this.state;
    axios
    .get(`http://www.reddit.com/r/aww/.json`)
    .then(function (res) {
      const redditResults = res.data.data.children;
      // console.log(res.data.data.children); 

    })
    .catch(err => console.log(err));

  }

  callToGiphy(){ 
    console.log(`heyyyyy`);
    
    // const {} = this.state;
    axios
      .get(`https://api.giphy.com/v1/gifs/search?api_key=VjrQHB0siLG2uSUQOuMxQsGbYko9Gqsa&q=&limit=25&offset=0&rating=G&lang=en`, {
        params: {
          q: 'cat'
        }
      })
      .then(function(res) {
        const giphyResults = res.data.data;
        // console.log(res.data.data);
      })
      .catch(err => console.log(err));
  }

  callToNYT() {
    // console.log(`heyyyyyNYT`);
    const NYT = 'https://api.nytimes.com/svc/';
    // const {} = this.state;
    axios
      .get(`${NYT}${this.state.nytLink}`, {
        params: {
          'api-key': '0613b7cda7b944cfb0dafa2a215ab0fb',
          'q': '' 
        }
      })
      .then ((res) => {
        const nytResults = res.data.results;
        console.log(nytResults);
        this.setState({
          nytLink:'topstories/v2/home.json'
        }) 
      })
      .catch(err => console.log(err));
  }

  componentDidMount(){

    this.callToGiphy();
    this.callToReddit();
    this.callToNYT();
  }

  handleClick() {
    this.callToNYT();
    console.log(`Second call`);
    
    
  }

  render() {
    return (
      <div>

        <button onClick={this.handleClick}>Click for second call</button>
        NuGitIt gunna do 20 nugget challenge. EACH. RAROOROAORROAROAR.
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
