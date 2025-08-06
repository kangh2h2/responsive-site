import { Link } from 'react-router-dom';

const listData = [
    {
        id: 1,
        hr_tit: "[기술직] 프론트엔드 개발자 채용",
        txt_1: "경력무관",
        txt_2: "정규직",
        txt_3: "본점",
        txt_4: "2025.06.01 ~ 2025.06.30",
    },
    {
      id: 2,
      hr_tit: "[기술직] 프론트엔드 개발자 채용",
      txt_1: "경력무관",
      txt_2: "정규직",
      txt_3: "본점",
      txt_4: "2025.06.01 ~ 2025.06.30",
  },
];

const listItems = listData.map(({ id, hr_tit, txt_1, txt_2, txt_3, txt_4 }) => (
    <Link to="/hr/detail" className="hr-list-box" key={id}>
        <div className="hr-info">
            <h4>{hr_tit}</h4>
            <div className="flex-center">
              <span>{txt_1}</span>
              <span className="bar"></span>
              <span>{txt_2}</span>
              <span className="bar"></span>
              <span>{txt_3}</span>
              <span className="bar"></span>
              <span className="fc-s">{txt_4}</span>
            </div>
        </div>
        <div className="dday">D-10</div>
    </Link>
));

function List() {
    return (
        <>
            <div className="hr">
                <section className="list-content lc-01">
                    <div className="inner">
                          <h3>채용절차</h3>
                          <div>진행 중인 채용 포지션을 확인하시고 언제든지 편하게 지원해주세요.</div>
                          <ol className="flex-center ani-up">
                              <li className="ani-scale">서류전형</li>
                              <li className="ani-scale">1차 면접</li>
                              <li className="ani-scale">임원 면접</li>
                              <li className="ani-scale">연봉 및 처우 협의</li>
                              <li className="ani-scale">채용 확정</li>
                          </ol>
                    </div>
                </section>

                <section className="list-content lc-02">
                    <div className="inner">
                          <h2>모집 중인 포지션 (6)</h2>

                          
                              <div className="search-bar flex-center">
                                  <input
                                      type="text"
                                      placeholder="관심있는 공고를 찾아보세요"
                                  />
                                  <button>
                                      <img className="img-responsive" src="/images/ico_search.svg" alt="검색"></img>
                                  </button>
                              </div>

                              <div className="filter-options flex-center">
                                  <select name="position">
                                      <option value="">직군 선택</option>
                                      <option value="영업">영업</option>
                                      <option value="관리">관리</option>
                                      <option value="마케팅">마케팅</option>
                                  </select>

                                  <select name="career">
                                      <option value="">경력사항</option>
                                      <option value="신입">신입</option>
                                      <option value="경력">경력</option>
                                      <option value="무관">무관</option>
                                  </select>

                                  <select name="employment">
                                      <option value="">고용형태</option>
                                      <option value="정규직">정규직</option>
                                      <option value="계약직">계약직</option>
                                      <option value="인턴">인턴</option>
                                  </select>

                                  <select name="location">
                                      <option value="">근무지</option>
                                      <option value="서울">서울</option>
                                      <option value="부산">부산</option>
                                      <option value="대구">대구</option>
                                  </select>
                              </div>
                          

                          <div className="hr-list-wrap">
                              {listItems}
                          </div>
                        
                    </div>
                </section>
            </div>
            
        </>
    )
}

export default List
