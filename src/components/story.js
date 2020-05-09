// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import './story.css';
import { getStoryData } from '../services/hnApi';
import * as moment from 'moment';

const StoryComponent = () => {
    // const [count, setCount] = useState(0);

    // const countUp = () => {
    //     setCount(count + 1);
    //     console.log(count);
    // }

    const [storyData, setStoryData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [upVote, setUpVote] = useState({});
    useEffect(() => {
        getStoryData({ page: 0 }).then(data => setStoryData(data));
    }, []);

    useEffect(() => {
        getStoryData({ page: currentPage }).then(data => setStoryData(data));
    }, [currentPage]);



    //const maxPage = Math.ceil(storyData.hits.length / hitsPerPage);
    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    }

    const nextPage = () => {
        if ((storyData.nbPages - 1) > currentPage) {
            setCurrentPage(currentPage + 1);
        }
    }
    const addCount = (obj) => {
        let masterData = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : [];
        let oldData = masterData[masterData.map((val) => { return val.id }).indexOf(obj.objectID)];
        masterData = masterData.filter((val) => { return val.id !== obj.objectID });
        let dataVal = {};
        if (oldData && oldData.id) {
            dataVal = { id: obj.objectID, points: (oldData.points + 1) };

        } else {
            dataVal = { id: obj.objectID, points: (obj.points + 1) };;
        }
        setUpVote(dataVal);
        masterData.push(dataVal);

        localStorage.setItem('data', JSON.stringify(masterData));
    }


    return (
        <div className="container">
            <table width="100%" border="0" cellPadding="0" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Comments</th>
                        <th>Vote Count</th>
                        <th>UpVote</th>
                        <th width="80%">News Details</th>
                    </tr>
                </thead>
                <tbody>
                    {/* <tr>
                        <td>36</td>
                        <td>{count}</td>
                        <td onClick={countUp}>up</td>
                        <td>Lorem Ispsums</td>
                    </tr> */}
                    {storyData && storyData.hits && storyData.hits.map((data, index) => {
                        return <tr key={index}>
                            <td>{data.num_comments}</td>
                            <td> {upVote && upVote.id && upVote.id === data.objectID ? upVote.points : data.points}</td>
                            <td><img onClick={() => addCount(data)} className="counticon pointer" src="/arrow.svg" alt="" /></td>
                            <td><a href="" className="storylink">{data.title}</a> <span className="siteurl">({data.url})</span> <span>by</span> <a href={`user?id={data.author}`} className="hnuser">{data.author}</a> <span className="time">{moment(data.created_at).fromNow()}</span> <span>[<a href="" className="hidebtn"> Hide </a>]</span></td>
                        </tr>

                    })}
                </tbody>
            </table>
            <div className="pagination"><a onClick={prevPage}>Previous</a> | <a onClick={nextPage}>Next</a></div>
            <div className="chart-view"></div>
        </div>
    )
}

export default StoryComponent;
