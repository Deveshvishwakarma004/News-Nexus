import React, { useEffect, useState } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const capatalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


const updatenews = async () => {
  // props.setProgress(10);
  // const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=c717f5d04c7b41edbb6d25017ceb809b&pageSize=${props.pagesize}`;
  // const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=c717f5d04c7b41edbb6d25017ceb809b&category=${props.category}&pageSize=${props.pagesize}`
  // setLoading(true);
  // let data = await fetch(url);
  // console.log(data);
  // props.setProgress(30);
  // let parsedData = await data.json();
  // console.log(parsedData)
  // props.setProgress(70);
  // setArticles(parsedData.articles);
  // setTotalResults(parsedData.totalResults);
  // setLoading(false);
  // props.setProgress(100);
  props.setProgress(10);
const url = `https://news-api14.p.rapidapi.com/v2/trendings?topic=${props.category}&language=en&country=in&limit=${props.pagesize}&page=${page}`;
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': process.env.REACT_APP_API_KEY,
		'x-rapidapi-host': 'news-api14.p.rapidapi.com'
	}
};

try {
  setLoading(true);
	const response = await fetch(url, options);
  props.setProgress(30);
	const result = await response.text();
  const parsedData = JSON.parse(result);
	console.log(parsedData);
  props.setProgress(70);
  setArticles(parsedData.data);
  setTotalResults(parsedData.totalResults);
  console.log(articles)
  console.log(totalResults)
  setLoading(false);
  props.setProgress(100);
  setPage(page+1);
} catch (error) {
	console.error(error);
}

}
 
useEffect(() => {
  document.title = `${capatalize(props.category)} - MyNewsApp` 
  updatenews();
  //eslint-disable-next-line
}  , [])

 const fetchMoreData = async () => {
  // const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=c717f5d04c7b41edbb6d25017ceb809b&page=${page+1}&pageSize=${props.pagesize}`;
  //  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=c717f5d04c7b41edbb6d25017ceb809b&category=${props.category}&page=${page+1}&pageSize=${props.pagesize}`
  // setPage(page+1)
  // let data = await fetch(url);
  // console.log(data)
  // let parsedData = await data.json();
  // console.log(parsedData)
  // setArticles(articles.concat(parsedData.articles));
  // setTotalResults( parsedData.totalResults);

  const url = `https://news-api14.p.rapidapi.com/v2/trendings?topic=${props.category}&language=en&country=in&limit=${props.pagesize}&page=${page}`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'd3691571c8msh6442b0b5e277e38p199764jsn7fb44f099b0a',
      'x-rapidapi-host': 'news-api14.p.rapidapi.com'
    }
  };
  
  try {
    setPage(page+1)
    const response = await fetch(url, options);
    const result = await response.text();
    const parsedData = JSON.parse(result);
    console.log(parsedData);
    setArticles((prevArticles) => prevArticles.concat(parsedData.data));
    setTotalResults(parsedData.totalResults);
  } catch (error) {
    console.error(error);
  }

 }
  return (
    <>
      <h1 className='text-center' style={{ margin: '35px' , marginTop :'90px' }}> {capatalize(props.category)} -Top Headlines </h1>
      {/* {this.state.loading && <Spinner />} */}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length <totalResults}
        loader={<Spinner />}
      >
        <div className='container'>
          <div className='row'>
            {articles.map((element) => {
              return <div className='col-md-4' key={element.url}>
                <Newsitem title={element.title} description={element.excerpt} url={element.thumbnail}
                  newsurl={element.url} author={element.authors} date={element.date} source={element.publisher.name} />
              </div>
            })}
          </div>
        </div>
      </InfiniteScroll>

      {/* <div className='container d-flex justify-content-between my-2 mx-2'>
          <button disabled={this.state.page <= 1} type="button" class="btn btn-dark" onClick={this.handlePrevclick}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pagesize)} type="button" className="btn btn-dark" onClick={this.handleNextclick}>Next &rarr;</button>
        </div> */}

    </>
  )

 }
News.defaultPropsTypes = {
  country: "in",
  pagesize: 9,
  category: "general"
}
News.propTypes = {
  country: PropTypes.string,
  pagesize: PropTypes.number,
  category: PropTypes.string
}
export default News
