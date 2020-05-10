/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import './story.css';
import { getStoryData } from '../services/hnApi';
import * as moment from 'moment';
import SplineChart from './chart';

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

    const hideStory = (id) => {
        let masterData = localStorage.getItem('hide-data') ? JSON.parse(localStorage.getItem('hide-data')) : [];
        masterData = masterData.filter((val) => { return val.id !== id });
        masterData.push(id);
        localStorage.setItem('hide-data', JSON.stringify(masterData));
        const updatedData = storyData.hits.filter((item) => { return item.objectID !== id });
        setStoryData({ hits: updatedData });
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
                    {storyData && storyData.hits && storyData.hits.map((data, index) => {
                        // show vote count
                        let masterData = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : [];
                        let oldData = masterData[masterData.map((val) => { return val.id }).indexOf(data.objectID)];
                        // hide record
                        let hideMasterData = localStorage.getItem('hide-data') ? JSON.parse(localStorage.getItem('hide-data')) : [];
                        let hideOldData = hideMasterData[hideMasterData.map((val) => { return val }).indexOf(data.objectID)];

                        let domain = data && data.url && data.url.split("//")[1];
                        let mainurl = domain && domain.split("/")[0];
                        console.log(hideOldData);
                        if (!hideOldData) {


                            return <tr key={index}>
                                <td>{data.num_comments}</td>
                                <td> {upVote && upVote.id && upVote.id === data.objectID ? upVote.points : (oldData && oldData.points) ? oldData.points : data.points}</td>
                                <td><img onClick={() => addCount(data)} className="counticon pointer" src="/arrow.svg" alt="" /></td>
                                <td><a href={data.url} className="storylink">{data.title}</a> <span className="siteurl">({mainurl})</span> <span>by</span> <a href={`user?id=${data.author}`} className="hnuser">{data.author}</a> <span className="time">{moment(data.created_at).fromNow()}</span> <span>[<a onClick={() => hideStory(data.objectID)} className="hidebtn pointer"> Hide </a>]</span></td>
                            </tr>
                        }

                    })}
                </tbody>
            </table>
            <div className="pagination"><a className="pointer" onClick={prevPage}>Previous</a> | <a className="pointer" onClick={nextPage}>Next</a></div>
            <div className="chart-view">
                <SplineChart data={storyData} />
            </div>
        </div>
    )
}

export default StoryComponent;
