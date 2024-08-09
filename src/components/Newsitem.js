import React from 'react'
const Newsitem = (props) => {
    let { title, description, url, newsurl, date, author, source } = props;
    return (
        <div>
            <div className="card" >
                <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>
                    <span className=" badge rounded-pill bg-danger">{source}</span>
                </div>
                <img src={url ? url : "https://c.ndtvimg.com/2023-10/hgqg14dg_devon-conway-rachin-ravindra-afp_625x300_05_October_23.jpg?im=FaceCrop,algorithm=dnn,width=1200,height=675"} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}.</p>
                    <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()} </small></p>
                    <a rel="noreferrer" href={newsurl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                </div>
            </div>
        </div>
    )
}

export default Newsitem
