import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Column from './components/Column';
import Content from './components/Content';
import Form from './components/Form';
import NotFound from './components/NotFound';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      socialMediaSelected: 'reddit',
      emptyResults: false,
      redditPosts: [],
      giphyPosts: [],
      pixabayPosts: []
    };
    this.callToReddit = this.callToReddit.bind(this);
    this.callToPixabay = this.callToPixabay.bind(this);
    this.handleChange = this.handleChange.bind(this);    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onClickChangeSocial = this.onClickChangeSocial.bind(this);
  }
  callToReddit() {
    axios
      .get(`https://www.reddit.com/r/all/search/.json`, {
      params: {
        q: this.state.input
      }}
    )
      .then(res => {
        const redditResults = res.data.data.children;
        const resultArray = [];
        console.log(redditResults);
        
        redditResults.map(res => {
        if (res.data.hasOwnProperty('preview') && !res.data.url.includes('gfycat')) {
          const redditPostObject = {
            title: res.data.title,
            imageUrl: res.data.url,
            preview: res.data.preview.enabled,
            class: 'reddit',
            pageUrl: `https://www.reddit.com${res.data.permalink}`
          };
          if (
            redditPostObject.preview === true &&
            redditPostObject.imageUrl.slice(-1) !== "v"
          ){
            resultArray.push(redditPostObject);
          }
        } 
      });
        if (resultArray.length === 0) {
          this.setState({
            emptyResults: true,
          })
        }
        this.setState({ 
          redditPosts: resultArray,
          giphyPosts: [],
          pixabayPosts: [] 
        });
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
            imageUrl: res.images.downsized.url,
            pageUrl: res.url,
            class: 'giphy'
          };
          resultArray.push(giphyPostObject);
        })
        if (resultArray.length === 0) {
          this.setState({
            emptyResults: true,
          })
        }
        this.setState({
          giphyPosts: resultArray,
          redditPosts: [],
          pixabayPosts: []
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
        const pixabayResults = res.data.hits;
        const resultArray = [];
        pixabayResults.map(res => {
          const pixabayPostObject = { 
            imageUrl: res.largeImageURL,
            pageUrl: res.pageURL,
            class: 'pixabay'
          }
        resultArray.push(pixabayPostObject);
      })
      if (resultArray.length === 0) {
        this.setState({
          emptyResults: true,
        })
      }
      this.setState({
        pixabayPosts: resultArray,
        redditPosts: [],
        giphyPosts: []
      });;
    })
    .catch(err => console.log(err));
  }

  handleChange(value) {
    this.setState({
      input: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.socialMediaSelected === 'reddit') {
      this.callToReddit(this.state.input);
    } else if (this.state.socialMediaSelected === 'giphy') {
      this.callToGiphy(this.state.input);
    } else if (this.state.socialMediaSelected === 'pixabay') {
      this.callToPixabay(this.state.input);
    };

    document.getElementById('socialNav').style.cssText="display: flex";

    this.setState({
      emptyResults: false,
  })
}

  onClickChangeSocial(e) {
    console.log(e.target.id);
    let social = '';
    if (e.target.id.includes('redditButton')) {
        social = 'reddit'; 
        document.getElementById('redditButton').style.cssText = "color:#565554";
        document.getElementById('giphyButton').style.cssText = "color:black";
        document.getElementById('pixaButton').style.cssText = "color:black";
        this.callToReddit(this.state.input);
    } else if (e.target.id.includes('giphyButton')) {
        social = 'giphy';
        document.getElementById('redditButton').style.cssText = "color:black";
        document.getElementById('giphyButton').style.cssText = "color:#565554";
        document.getElementById('pixaButton').style.cssText = "color:black";
        this.callToGiphy(this.state.input)
    } else if (e.target.id.includes('pixaButton')) {
        social = 'pixabay';
        document.getElementById('redditButton').style.cssText = "color:black";
        document.getElementById('giphyButton').style.cssText = "color:black";
        document.getElementById('pixaButton').style.cssText = "color:#565554";
        this.callToPixabay(this.state.input);
    }

    this.setState ({
      socialMediaSelected: social,
      emptyResults: false
    })
  }


  render() {
    return <main>
        <header className="header">
          <a href="index.html">
            <h1>
              <span>Social</span>-<span>R</span>-<span>Us</span>
            </h1>
          </a>
        </header>

        <Form handleSubmit={this.handleSubmit} value={this.state.input} handleChange={this.handleChange} />

        <nav className="social-nav" id="socialNav">
          <ul>
            <li className="buttons reddit-button" onClick={this.onClickChangeSocial}>
              <a href="#" id="redditButton">
                Reddit
              </a>
            </li>
            <li className="buttons giphy-button" onClick={this.onClickChangeSocial}>
            <a href="#" id="giphyButton">Giphy</a>
            </li>
            <li className="buttons pixa-button" onClick={this.onClickChangeSocial}>
            <a href="#" id="pixaButton">Pixabay</a>
            </li>
          </ul>
        </nav>

        <div>{this.state.emptyResults ? <NotFound /> : ""}</div>

        {this.state.pixabayPosts.length !== 0 || this.state.giphyPosts.length !== 0 || this.state.redditPosts.length !== 0 ? <div>
            <Column social={this.state.socialMediaSelected}>
              {this.state.redditPosts.map(post => {
                return <Content title={post.title} imageUrl={post.imageUrl} pageUrl={post.pageUrl} class={post.class} />;
              })}
              {this.state.giphyPosts.map(post => {
                return <Content title={post.title} imageUrl={post.imageUrl} pageUrl={post.pageUrl} class={post.class} />;
              })}
              {this.state.pixabayPosts.map(post => {
                return <Content imageUrl={post.imageUrl} pageUrl={post.pageUrl} class={post.class} />;
              })}
            </Column>
          </div> : ""}
        <footer class="footer">
        <p>Made by <span><a href="http://www.liyinglim.com" target="_blank">Li Ying Lim</a></span>, <span><a href="http://www.michaelyiu.com" target="_blank">Michael Yiu</a></span> and <span><a href="http://www.wesdevs.com" target="_blank">Wesley Ho</a></span> &copy; 2018</p>
        </footer>
      </main>;
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
