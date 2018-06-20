import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Column from './components/Column';
import Content from './components/Content';
import Form from './components/Form'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      redditPosts: [
        {
          title: "",
          url: "",
          preview: true
        }
      ],

      giphyPosts: [
        {
          title: "",
          url: ""
        }
      ],

      pixabayPosts: [
        {
          title: "",
          url: ""
        }
      ]
    };
    this.callToReddit = this.callToReddit.bind(this);
    this.callToPixabay = this.callToPixabay.bind(this);
    this.handleChange = this.handleChange.bind(this);    
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  callToReddit() {
    axios
      .get(`http://www.reddit.com/r/pics/.json`)
      .then(res => {
        const redditResults = res.data.data.children;
        const resultArray = [];

        redditResults.map(res => {
          const redditPostObject = {
            title: res.data.title,
            url: res.data.url,
            preview: res.data.preview.enabled
          };

          if (
            redditPostObject.preview === true &&
            redditPostObject.url.slice(-1) !== "v"
          ) {
            resultArray.push(redditPostObject);
          }
        });

        this.setState({ redditPosts: resultArray });
      })
      .catch(err => console.log(err));
  }

  callToGiphy() {
    axios
      .get(
        `https://api.giphy.com/v1/gifs/search?api_key=VjrQHB0siLG2uSUQOuMxQsGbYko9Gqsa&q=&limit=10&offset=0&rating=G&lang=en`,
        {
          params: {
            q: this.state.input
          }
        }
      )
      .then(res => {
        const giphyResults = res.data.data;
        const resultArray = [];
        giphyResults.map(res => {
          const giphyPostObject = {
            title: res.title,
            url: res.images.downsized.url
          };
          resultArray.push(giphyPostObject);
          this.setState({ giphyPosts: resultArray });
        });
      })
      .catch(err => console.log(err));
  }

  callToPixabay() {
    axios
      .get(`https://pixabay.com/api/`, {
        params: {
          key: '9342490-bae298122ef1064b7551d5c57',
          q: this.state.input
        }
      })
      .then(res => {
        console.log(res);
        const pixabayResults = res.data.hits;

        const resultArray = [];
        pixabayResults.map(res => {
          const pixabayPostObject = { url: res.previewURL }
          // const nytPostObject = { title: res.title, url: res.multimedia[1].url, abstract: res.abstract };
          resultArray.push(pixabayPostObject);
          this.setState({ pixabayPosts: resultArray });
        });
      })
      // .catch(err => console.log(err));
  }


  handleChange(value) {
    this.setState({
      input: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    // this.callToReddit(this.state.input);
    // this.callToGiphy(this.state.input);
    this.callToPixabay(this.state.input);
  }

  render() {
    return (
      <main>
        <Form handleSubmit={this.handleSubmit} value={this.state.input} handleChange={this.handleChange}/>
        <Column>
          {this.state.redditPosts.map(post => {
            return <Content title={post.title} url={post.url} />;
          })}
        </Column>

        <Column>
          {this.state.giphyPosts.map(post => {
            return <Content title={post.title} url={post.url} />;
          })}
        </Column>

        <Column>
          {this.state.pixabayPosts.map(post => {
            return (
              <Content
                // title={post.title}
                url={post.url}
                // abstract={post.abstract}
              />
            );
          })}
        </Column>
      </main>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
