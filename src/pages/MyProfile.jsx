import React from 'react';
import profile from '../assets/loan.png'
import { Link } from 'react-router-dom';

const MyProfile = () => {
  const onClickPassword = (e) => {
    e.preventDefault();
    console.log("변경하기 페이지로 이동");
  };

  return (
        <section style={{backgroundColor: '#eee'}}>
          <div className="container py-5">
            <div className="row">
              <div className="col">
                <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item active" aria-current="page">내 정보</li>
                  </ol>
                </nav>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-4">
                <div className="card mb-4">
                  <div className="card-body text-center">
                    <img src={profile} alt="avatar" className="rounded-circle img-fluid" style={{width: '150px'}}/>
                    <h5 className="my-3">닉네임</h5>
                    <p className="text-muted mb-1">자기소개 문구</p>
                    <p className="text-muted mb-4">칭호</p>
                    <div className="d-flex justify-content-center mb-2">
                      <button type="button" className="btn btn-primary">프로필 변경하기</button>
                    </div>
                  </div>
                </div>
                <div className="card mb-4 mb-lg-0">
                  <div className="card-body p-0">
                    <ul className="list-group list-group-flush rounded-3">
                      <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                        <p className="mb-0">접속일 수</p>
                        <p className="mb-0">238 일</p>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                        <p className="mb-0">플레이한 게임 수</p>
                        <p className="mb-0">20 판</p>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                        <p className="mb-0">친구</p>
                        <p className="mb-0">5 명</p>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                        <p className="mb-0">등록한 템플릿</p>
                        <p className="mb-0">3 / 10 </p>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                        <p className="mb-0">인기도</p>
                        <p className="mb-0">17</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="card mb-4">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">닉네임</p>
                      </div>
                      <div className="col-sm-6">
                        <p className="text-muted mb-0">닉네임</p>
                      </div>
                    </div>
                    <hr/>
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">계정ID</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">example@example.com</p>
                      </div>
                    </div>
                    <hr/>
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">비밀번호</p>
                      </div>
                      <div className="col-sm-9">
                        <Link onClick={onClickPassword}>비밀번호 변경하기</Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="card mb-4 mb-md-0">
                      <div className="card-body">
                        <p className="mb-4"><span className="text-primary font-italic me-1">업적</span> 진행현황
                        </p>
                        <p className="mb-1" style={{fontSize: '.77rem'}}>플레이한 게임 수 1000</p>
                        <div className="progress rounded" style={{height: '5px'}}>
                          <div className="progress-bar" role="progressbar" style={{width: '20%'}} aria-valuenow="80"
                            aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <p className="mt-4 mb-1" style={{fontSize: '.77rem'}}>연속 출석 1000일</p>
                        <div className="progress rounded" style={{height: '5px'}}>
                          <div className="progress-bar" role="progressbar" style={{width: '72%'}} aria-valuenow="72"
                            aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <p className="mt-4 mb-1" style={{fontSize: '.77rem'}}>등록한 템플릿</p>
                        <div className="progress rounded" style={{height: '5px'}}>
                          <div className="progress-bar" role="progressbar" style={{width: '89%'}} aria-valuenow="89"
                            aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <p className="mt-4 mb-1" style={{fontSize: '.77rem'}}>이모티콘 수집가</p>
                        <div className="progress rounded" style={{height: '5px'}}>
                          <div className="progress-bar" role="progressbar" style={{width: '55%'}} aria-valuenow="55"
                            aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card mb-4 mb-md-0">
                      <div className="card-body">
                        <p className="mb-4"><span className="text-primary font-italic me-1">최근 플레이한 기록</span> 목록
                        </p>
                        <p className="mb-1" style={{fontSize: '.77rem'}}>2023-06-26</p>
                        <div className="card mb-3" style={{ height: '4em'}}>
                          <div className="card-body d-flex align-items-center">
                            <h5 className="card-title" style={{fontSize: '.99rem', marginRight: '10px'}}>이상형 월드컵 32강</h5>
                            <div className="ml-auto ">
                              <Link className="card-link"  style={{fontSize: '.77rem'}}>자세히 보기</Link>
                            </div>
                          </div>
                        </div>
                        <p className="mb-1" style={{fontSize: '.77rem'}}>2023-06-25</p>
                        <div className="card mb-3" style={{ height: '4em'}}>
                          <div className="card-body d-flex align-items-center">
                            <h5 className="card-title" style={{fontSize: '.99rem', marginRight: '10px'}}>이상형 월드컵 32강</h5>
                            <div className="ml-auto ">
                              <Link className="card-link"  style={{fontSize: '.77rem'}}>자세히 보기</Link>
                            </div>
                          </div>
                        </div>
                        <p className="mb-1" style={{fontSize: '.77rem'}}>2023-06-24</p>
                        <div className="card mb-3" style={{ height: '4em'}}>
                          <div className="card-body d-flex align-items-center">
                            <h5 className="card-title" style={{fontSize: '.99rem', marginRight: '10px'}}>이상형 월드컵 32강</h5>
                            <div className="ml-auto ">
                              <Link className="card-link"  style={{fontSize: '.77rem'}}>자세히 보기</Link>
                            </div>
                          </div>
                        </div>
                        <p className="mb-1" style={{fontSize: '.77rem'}}>2023-06-23</p>
                        <div className="card mb-3" style={{ height: '4em'}}>
                          <div className="card-body d-flex align-items-center">
                            <h5 className="card-title" style={{fontSize: '.99rem', marginRight: '10px'}}>이상형 월드컵 32강</h5>
                            <div className="ml-auto ">
                              <Link className="card-link"  style={{fontSize: '.77rem'}}>자세히 보기</Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>      
  );
}

export default MyProfile;