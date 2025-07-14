
import './Main.css';
import { Link } from 'react-router-dom';
import CommonSwiper from '../components/commonSwiper';
import useScrollFadeIn from '../hooks/useScrollFadeIn';


const newSlides = [
    <div className="news-slider flex-center">
        <iframe
            src="https://www.youtube.com//embed/en5yw8FTRxw?si=QOcw9pzjgn8IYpBE"
            title="KS오토플랜 송도 2지점 개업식 스케치"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
        ></iframe>
        <div className="news-info">
            <a href="https://www.youtube.com//embed/en5yw8FTRxw?si=QOcw9pzjgn8IYpBE" target="_blank" rel="noopener noreferrer">
                <h5>홍보영상</h5>
                <h3>KS오토플랜 송도 2지점 개업식 스케치</h3>
                <div className="news-data">2024.11.22</div>
            </a>
        </div>
    </div>,
    <div className="news-slider">
        <div className="news-info">
            <a href="https://www.gokorea.kr/news/articleView.html?idxno=826676" target="_blank" rel="noopener noreferrer">
                <h5>보도자료</h5>
                <h3>KS오토플랜, 청년 미래 응원 위해 유정복 시장 초청 ‘청년기업특별 강연회’ 성료</h3>
                <div className="news-data">2025.05.12</div>
            </a>
        </div>
    </div>,
    <div className="news-slider">
        <div className="news-info">
            <a href="https://www.incheonnews.com/news/articleView.html?idxno=422122" target="_blank" rel="noopener noreferrer">
                <h5>보도자료</h5>
                <h3>KS오토플랜, 인천공동모금회에 성금 1천만원 전달</h3>
                <div className="news-data">2024.11.22</div>
            </a>
        </div>
    </div>,
];


const Main = () => {
    useScrollFadeIn();
    
    return (
    <>
        <section className="visual pin-me">
            <div className="main-vod">
                <video
                    src="/videos/ks_visual.mp4"
                    type="video/mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                />
            </div>
            <div className="inner txt-wrap">
                <h3 className="ani-hidden">
                    <div className="ani-up">KS Group</div>
                </h3>
                <h1 className="ani-hidden">
                    <div className="ani-up">자동차부터 <span className="mbr"></span>마케팅까지</div>
                </h1>
                <div className="txt ani-hidden">
                    <div className="ani-up">
                        더 나은 내일을 만드는 <b>KS 그룹</b>,<br />
                        당신과 함께합니다.
                    </div>
                    
                </div>
            </div>
        </section>

        <section className="pin-me content ct-01">
            <span className="img-k"><img className="img-responsive" src="/images/main_k.png" alt=""></img></span>
            <span className="img-s"><img className="img-responsive" src="/images/main_s.png" alt=""></img></span>
            <div className="inner">
                <h1 className="ani-up">새로운 혁신을 <span className="mbr"></span>선도하는 <b className="fc-m">KS</b></h1>
                <div className="txt">최고의 전문성과 신뢰를 바탕으로 다양한 산업에서 혁신적인 솔루션을 제공합니다.</div>
                <Link to="/business/rentcar" className="link-btn flex-center">
                    <div className="bold">사업분야 바로가기</div>
                    <div className="arrow">
                        <img className="img-responsive" src="/images/ico_arrow_bold.svg" alt="바로가기"></img>
                    </div>
                </Link>
                <ul>
                    <li>
                        <Link to="/business/rentcar" className="bg-rentcar">
                            <span>자동차<br />금융 컨설팅</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/business/purchase" className="bg-purchase">
                            <span>전국매입</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/business/export" className="bg-export">
                            <span>해외수출</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/business/ads" className="bg-ads">
                            <span>광고마케팅</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </section>

        <section className="pin-me content ct-02">
            <div className="inner">
                <h1>KS그룹의 <span className="mbr"></span><b>희망찬 이야기들</b></h1>
                <div className="newSwiper-wrap">
                    <div className="newSwiper">
                        <CommonSwiper
                            slides={newSlides}
                            options={{
                                slidesPerView: 'auto',
                                spaceBetween: 20,
                                
                                navigation: {
                                    nextEl: '.next-main',
                                    prevEl: '.prev-main',
                                },
                                scrollbar: { draggable: true },
                                
                            }}
                            
                        />
                    </div>
                    <div className="swiper-button prev-main">
                        <img src="/images/ico_arrow_light.svg" alt="다음으로"></img>
                    </div>
                    <div className="swiper-button next-main">
                        <img src="/images/ico_arrow_light.svg" alt="이전으로"></img>
                    </div>
                </div>
                
            </div>
        </section>

        <section className="pin-me ct-03">
            <div className="inner">
                <div className="hr-wrap">
                    <div className="interview-img">
                        <img className="img-responsive" src="/images/img_interview.png" alt="인터뷰 동영상 이미지"></img>
                    </div>
                    <div className="hr-link flex-center">
                        <span><b>3개</b>의 채용공고가 <b>진행 중</b> 입니다.</span>
                        <Link to="/hr/list" className="flex-center">전체보기 <img src="/images/ico_arrow_light.svg" alt="화살표"></img></Link>
                    </div>
                </div>
                
                <div className="tit-wrap">
                    <h5>KS Group</h5>
                    <h1>당신의 시작,<br />우리의 성장</h1>
                    <a
                        href="https://youtu.be/Aq86f_JsEfw?si=XGuS20X7sqFu-Hvx" className="link-btn flex-center" target="_blank" rel="noopener noreferrer">
                        <div className="bold">인터뷰 영상보기</div>
                        <div className="arrow">
                            <img className="img-responsive" src="/images/ico_arrow_bold.svg" alt="바로가기"></img>
                        </div>
                    </a>
                </div>
            </div>
            <div className="main-hr-ing">
                <div className="inner flex-center">
                    <div className="hr-txt">
                        <span>인턴</span>
                        <strong className="fc-m">0</strong>
                    </div>
                    <img src="/images/ico_arrow_light.svg" alt="화살표"></img>
                    <div className="hr-txt">
                        <span>신입</span>
                        <strong className="fc-m">1</strong>
                    </div>
                    <img src="/images/ico_arrow_light.svg" alt="화살표"></img>
                    <div className="hr-txt">
                        <span>경력</span>
                        <strong>2</strong>
                    </div>
                </div>
            </div>
        </section>

        <section className="ct-04">
            <div className="inner">
                <h1>파트너 & 협력사</h1>
                <div className="txt">KS 그룹은 다양한 기업 및 기관과 협력하여 최상의 서비스를 제공합니다.</div>
                <ul>
                    <li><img className="img-responsive" src="/images/capital/v1/capital_01.png" alt="하나캐피탈"></img></li>
                    <li><img className="img-responsive" src="/images/capital/v1/capital_02.png" alt="롯데렌터카"></img></li>
                    <li><img className="img-responsive" src="/images/capital/v1/capital_03.png" alt="롯데오토리스"></img></li>
                    <li><img className="img-responsive" src="/images/capital/v1/capital_04.png" alt="롯데캐피탈"></img></li>
                    <li><img className="img-responsive" src="/images/capital/v1/capital_05.png" alt="레드캡렌터카"></img></li>
                    <li><img className="img-responsive" src="/images/capital/v1/capital_06.png" alt="신한카드"></img></li>
                    <li><img className="img-responsive" src="/images/capital/v1/capital_07.png" alt="삼성카드"></img></li>
                    <li><img className="img-responsive" src="/images/capital/v1/capital_08.png" alt="NH농협캐피탈"></img></li>
                    <li><img className="img-responsive" src="/images/capital/v1/capital_09.png" alt="산은캐피탈"></img></li>
                    <li><img className="img-responsive" src="/images/capital/v1/capital_10.png" alt="IM캐피탈"></img></li>
                    <li><img className="img-responsive" src="/images/capital/v1/capital_11.png" alt="SK렌터카"></img></li>
                    <li><img className="img-responsive" src="/images/capital/v1/capital_12.png" alt="BNK캐피탈"></img></li>
                    <li><img className="img-responsive" src="/images/capital/v1/capital_13.png" alt="오릭스"></img></li>
                    <li><img className="img-responsive" src="/images/capital/v1/capital_14.png" alt="한국캐피탈"></img></li>
                    <li><img className="img-responsive" src="/images/capital/v1/capital_15.png" alt="우리카드"></img></li>
                    <li><img className="img-responsive" src="/images/capital/v1/capital_16.png" alt="우리금융캐피탈"></img></li>
                    <li><img className="img-responsive" src="/images/capital/v1/capital_17.png" alt="JB우리캐피탈"></img></li>
                    <li><img className="img-responsive" src="/images/capital/v1/capital_18.png" alt="MG캐피탈"></img></li>
                </ul>
            </div>
        </section>

        <section className="ct-05">
            <div className="inner flex-center">
                <div className="app-link">
                    <h1>
                        <span className="fc-m">최적의 서비스,</span> <span className="fc-s">KS멤버스</span><br />
                        지금 경험해 보세요
                    </h1>
                    <dl className="flex-center">
                        <dt>
                            <a href="https://play.google.com/store/apps/details?id=your.app.id" target="_blank" rel="noopener noreferrer">
                                <img className="img-responsive" src="/images/img_googleplay.svg" alt="구글플레이 다운로드"></img>
                            </a>
                            <a href="https://apps.apple.com/kr/app/your-app-id" target="_blank" rel="noopener noreferrer">
                                <img className="img-responsive" src="/images/img_appstore.svg" alt="앱스토어 다운로드"></img>
                            </a>
                        </dt>
                        <dd>
                            <img className="img-responsive" src="/images/img_qr.png" alt="앱다운로드 큐알코드"></img>
                            <div className="txt">앱 다운로드 QR 코드</div>
                        </dd>
                    </dl>
                </div>
                <div className="app-img">
                    <img className="img-responsive" src="/images/img_app.png" alt="로고 앱 아이콘"></img>
                </div>
            </div>
        </section>
    </>
    
    
  );
};

export default Main;


