import CommonSwiper from '../../components/commonSwiper';

const adsSlidesData = [
    {
        title: '바이럴 마케팅',
        text_1: <>사람들이 <b>‘자발적으로’</b> 찾게 하라!<br/>소비자는 광고보다 <b>‘추천’</b>을 신뢰합니다.</>,
        text_2: <>자연스럽게 확산되는 콘텐츠로 <b className="fc-m">브랜드 인지도 & 신뢰도 상승!</b></>,
        text_3: <>블로그, 카페, 커뮤니티, 유튜브까지! <b className="fc-m">온라인에서 입소문을 장악합니다.</b></>,
    },
    {
        title: 'SA/DA (키워드/배너 광고)',
        text_1: <>강력한 노출로 <b>‘즉각적인’</b> 반응을!<br/>고객이 <b>‘필요한 순간’</b>에 보이게 하라!</>,
        text_2: <>네이버, 유튜브, 포털 배너 광고로 <b className="fc-m">브랜드 도달률 극대화</b></>,
        text_3: <>CTR (클릭률) & 전환율 분석으로 <b className="fc-m">광고비 대비 최적의 성과 보장</b></>,
    },
    {
        title: 'SNS',
        text_1: <>고객이 머무는 곳에서 <b>‘소통’하라!</b><br/>인스타그램, 페이스북, 틱톡 - <b>바로 고객과 연결되는 채널</b></>,
        text_2: <>브랜드 <b className="fc-m">친밀도 상승 & 충성 고객 확보</b></>,
        text_3: <>바이럴 + 광고 = 입체적인 <b className="fc-m">SNS 마케팅으로 성과를 증폭!</b></>,
    },
    
];

const adsSlides = adsSlidesData.map(({ title, text_1, text_2, text_3 }, idx) => (
    <>
        <h1 key={idx}>{title}</h1>
        <div key={idx} className="ads-txt">
            {text_1}
        </div>
        <div className="ads-txt-box">{text_2}</div>
        <div className="ads-txt-box">{text_3}</div>
    </>
))

const Ads = () => (
    <>
    <div className="business">
        <section className="ads-content adc-01">
            <div className="inner">
                <div className="tit-wrap txt-center">
                    <h3>브랜드의 <b>새로운 출발점</b></h3>
                    <h1>
                        <span className="fc-g-3">매출을 만드는</span>
                        <span className="fc-s"> 마케팅,</span><br />
                        <span className="fc-m"> 우리는 </span>
                        결과로 말합니다.
                    </h1>
                </div>
                <div className="site-link flex-center">
                    <a href="https://daruda-ad.com" target="_blank" rel="noopener noreferrer">
                        <img src="/images/logo_daruda.svg" alt="마케팅을 다루다 바로가기"></img>
                        마케팅을 다루다
                    </a>
                    <a href="https://place.daruda-ad.com" target="_blank" rel="noopener noreferrer">
                        <img src="/images/logo_dplace.svg" alt="다루다 플레이스 바로가기"></img>
                        플레이스 광고
                    </a>
                </div>
            </div>
        </section>

        <section className="ads-content adc-02">
            <div className="inner flex-center">
                <div className="adsSwiper">
                    <CommonSwiper
                        slides={adsSlides}
                        options={{
                            effect: "fade",
                            slidesPerView: 1,
                            pagination: {
                                clickable: true,
                                renderBullet: function (index, className) {
                                    // 두 자리 숫자 형식으로 '01', '02', '03'처럼 만들기
                                    const number = (index + 1).toString().padStart(2, '0');
                                    return '<span class="' + className + '">' + number + '</span>';
                                  },
                            },
                            autoplay: {
                                delay: 4000,
                                disableOnInteraction: false,
                            },
                            loop: true,
                        }}
                    />
                </div>
                <div className="sns-img">
                    <img className="img-responsive" src="/images/ads_bg_01.png" alt="배경 이미지"></img>
                </div>
            </div>
        </section>

        <section className="ads-content adc-03">
            <div className="inner">
                <div className="round-txt-box bg-01">
                    <span></span>작은 브랜드라도 강한 존재감을 가질 수 있도록,
                </div>
                <div className="round-txt-box bg-02">
                    <span></span>완성도 높은 콘텐츠와 정교한 전략으로 시장을 장악합니다.
                </div>
                <div className="round-txt-box bg-03">
                    <span></span>우리는 보이지 않는 브랜드를, 선택 받는 브랜드로 만듭니다.
                </div>

                <h1>
                    우리의 광고는 말이 아니라,<br />결과로 증명합니다.
                </h1>
                <ul className="flex-center">
                    <li>
                        <div>Clients</div>
                        <h2>1800+</h2>
                    </li>
                    <li>
                        <div>Channel</div>
                        <h2>40+</h2>
                    </li>
                    <li>
                        <div>Products</div>
                        <h2>120+</h2>
                    </li>
                    <li>
                        <div>Members</div>
                        <h2>80+</h2>
                    </li>
                </ul>
            </div>
        </section>


    </div>
    </>
);

export default Ads;