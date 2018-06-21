import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Column from './components/Column';
import Content from './components/Content';
import Form from './components/Form';
import NotFound from './components/NotFound'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      socialMediaSelected: 'reddit',
      emptyResults: false,
      redditPosts: [
        // {
        //   title: "",
        //   imageUrl: "",
        //   pageUrl: "",
        //   preview: true,
        //   class: ''
        // }
      ],

      giphyPosts: [
        // {
        //   title: "",
        //   imageUrl: "",
        //   pageUrl: "",
        //   class: ''
        // }
      ],

      pixabayPosts: [
        // {
        //   pageUrl: "",
        //   imageUrl: "",
        //   class: ''
        // }
      ]
    };
    this.callToReddit = this.callToReddit.bind(this);
    this.callToPixabay = this.callToPixabay.bind(this);
    this.handleChange = this.handleChange.bind(this);    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onClickChangeSocial = this.onClickChangeSocial.bind(this);
  }
  callToReddit() {
    axios
      .get(`http://www.reddit.com/r/all/search/.json`, {
        
      params: {
        q: this.state.input
      }}
    )
      .then(res => {
        const redditResults = res.data.data.children;
        const resultArray = [];


        redditResults.map(res => {

          if (res.data.hasOwnProperty('preview') && !res.data.url.includes('gfycat')) {

            const redditPostObject = {
              title: res.data.title,
              imageUrl: res.data.url,
              preview: res.data.preview.enabled,
              class: 'reddit'
            };

            if (
              redditPostObject.preview === true &&
              redditPostObject.imageUrl.slice(-1) !== "v"
            ) {
              resultArray.push(redditPostObject);
            }
            if (resultArray.length === 0) {
              this.setState({
                emptyResults: true,


              })
            }
          }
 
          console.log(resultArray);
        });

        this.setState({ 
          redditPosts: resultArray,
          giphyPosts: [],
          pixabayPosts: [] 
        });
      })
      // .catch(err => console.log(err));
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
          this.setState({ 
            pixabayPosts: resultArray, 
            redditPosts: [],
            giphyPosts: []
          });
        });
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
    }
  }

  onClickChangeSocial(e) {
    console.log(e.target.id);
    let social = '';
    if (e.target.id.includes('redditButton')) {
        social = 'reddit'; 
    } else if (e.target.id.includes('giphyButton')) {
        social = 'giphy';
    } else if (e.target.id.includes('pixaButton')) {
        social = 'pixabay'
    }

    this.setState ({
      socialMediaSelected: social
    })
  }


  render() {
    return (
      <main>

        <header className="header">
          <h3><span>Social</span>-<span>R</span>-<span>Us</span></h3>
        </header>

        <Form handleSubmit={this.handleSubmit} value={this.state.input} handleChange={this.handleChange}/>

        <nav className="social-nav">
          <ul>
            <li className="buttons reddit-button" id="redditButton" onClick={this.onClickChangeSocial}>Reddit</li>
            <li className="buttons giphy-button" id="giphyButton" onClick={this.onClickChangeSocial}>Giphy</li>
            <li className="buttons pixa-button" id="pixaButton" onClick={this.onClickChangeSocial}>Pixabay</li>
          </ul>
        </nav>

        <div>
          {
             this.state.emptyResults ? < NotFound /> : ""
          }
        </div>

        {
          this.state.pixabayPosts.length !== 0 
          || this.state.giphyPosts.length !== 0 
          || this.state.redditPosts.length !== 0 ?  
          <div> 
            <Column>
              {this.state.redditPosts.map(post => {
                return <Content 
                title={post.title} 
                imageUrl={post.imageUrl} 
                pageUrl={post.pageUrl} 
                class={post.class}/>;
              })}
           </Column>

          <Column>
            {this.state.giphyPosts.map(post => {
              return <Content 
              title={post.title} 
              imageUrl={post.imageUrl} 
              pageUrl={post.pageUrl} 
              class={post.class} />;
            })}
          </Column>

          <Column>
            {this.state.pixabayPosts.map(post => {
              return <Content
              imageUrl={post.imageUrl}
              pageUrl={post.pageUrl}
              class={post.class}/>
            })}
          </Column>
        </div>:""
        }
        
      </main>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
