import React from 'react';
import { Link } from 'react-router-dom';
import profile from '../assets/loan.png'

const ChatList = () => {

    const List = [{
        title : "방제목 1",
        rank : "32강",
        template : "template",
        nickname : "닉네임",
        userLogo : profile,
        memberCnt : 1,
        maxMember : 10 
    },
    {
        title : "방제목 2",
        rank : "16강",
        template : "template",
        nickname : "닉네임",
        userLogo : profile,
        memberCnt : 1,
        maxMember : 10 
    },
    {
        title : "방제목 3",
        rank : "32강",
        template : "template",
        nickname : "닉네임",
        userLogo : profile,
        memberCnt : 1,
        maxMember : 10 
    }];


    return (
        <section className="vh-100" style={{backgroundColor: '#eee'}}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-xl-10">
                    {List.map((list, i) => (
                        <div className="card mb-5" style={{borderRadius: '15px'}}>
                        <div className="card-body p-4">
                            <h3 className="mb-3">{list.title} <span className="badge badge-info">{list.rank}</span></h3>
                            <p className="small mb-0">
                                {list.template}
                                <span className="mx-2"> | </span>
                                <strong> {list.nickname} </strong> 
                                <Link>
                                    <img src={list.userLogo} alt="avatar" className="img-fluid rounded-circle me-1" width="35"/>
                                </Link>
                            </p>
                            <hr className="my-4"/>
                            <div className="d-flex justify-content-start align-items-center">
                                <p className="mb-0 text-uppercase">
                                    <span className="text-muted small">인원수 {list.memberCnt} / {list.maxMember}</span>
                                </p>
                                <div className="progress">
                                    <div className="progress-bar w-75" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                        </div>
                        </div>
                    ))}
                </div>
                </div>
            </div>
        </section>
    );

};

export default ChatList;