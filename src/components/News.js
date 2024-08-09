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
  props.setProgress(10);
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=1cda76cdce1345b88023d80272d546f5&pageSize=${props.pagesize}`;
    setLoading(true);
  let data = await fetch(url);
  props.setProgress(30);
  let parsedData = await data.json();
  props.setProgress(70);
  setArticles(parsedData.articles);
  setTotalResults(parsedData.totalResults);
  setLoading(false);
  // this.setState({
  //   articles: parsedData.articles,
  //   totalResults: parsedData.totalResults,
  //   loading: false
  // });
  props.setProgress(100);

}
useEffect(() => {
  document.title = `${capatalize(props.category)} - MyNewsApp` 
  updatenews();
  //eslint-disable-next-line
}  , [])

 const fetchMoreData = async () => {
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=1cda76cdce1345b88023d80272d546f5&page=${page+1}&pageSize=${props.pagesize}`;
  setPage(page+1)
  let data = await fetch(url);
  let parsedData = await data.json();
  setArticles(articles.concat(parsedData.articles));
  setTotalResults( parsedData.totalResults);
 }
  return (
    <>
      <h1 className='text-center' style={{ margin: '35px' , marginTop :'90px' }}> {capatalize(props.category)} -Top Headlines </h1>
      {/* {this.state.loading && <Spinner />} */}
      <InfiniteScroll
    
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length <=totalResults}
        loader={<Spinner />}
      >
        <div className='container'>
          <div className='row'>
            {articles.map((element) => {
              return <div className='col-md-4' key={element.url}>
                <Newsitem title={element.title} description={element.description} url={element.urlToImage}
                  newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
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
  pagesize: 10,
  category: "general"
}
News.propTypes = {
  country: PropTypes.string,
  pagesize: PropTypes.number,
  category: PropTypes.string
}
export default News
