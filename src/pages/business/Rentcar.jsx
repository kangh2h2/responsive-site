import CommonSwiper from '../../components/commonSwiper';

const rentSlidesData = [
    {
        title: <>다양한 브랜드<br />신차 판매</>,
        text: '국내외 주요 자동차 브랜드의 다양한 신차 모델을 취급하며, 고객의 필요에 맞는 차량을 추천해 드립니다.',
    },
    {
        title: <>합리적인 가격과<br />금융 혜택 제공</>,
        text: '금융 할부, 리스, 렌트 등 다양한 구매 방식을 통해 고객이 부담 없이 차량을 구매할 수 있도록 돕습니다.',
    },
    {
        title: <>신속한 차량 출고<br />& 원스톱 서비스</>,
        text: '고객이 빠르게 차량을 인도 받을 수 있도록 서류 접수부터 출고까지 전 과정을 신속하게 진행합니다.',
    },
    {
        title: <>전문 컨설팅<br />& 맞춤형 서비스</>,
        text: '차량 구매 시 보험·번호판 등록·계약까지 모든 과정을 지원하며, 고객의 상황에 맞는 최적의 옵션을 추천합니다.',
    },
    {
        title: <>투명한 계약<br />& 신뢰 기반 서비스</>,
        text: '불필요한 비용 없이 고객에게 정확한 견적과 투명한 계약 조건을 제공합니다.',
    },
];

const rentSlides = rentSlidesData.map(({ title, text }, idx) => (
    <>
        <h3 key={idx}>{title}</h3>
        <div key={idx} className="rent-txt">
            {text}
        </div>
    </>
))

const Rentcar = () => (
    <>
    <div className="business">
        <section className="rentcar-content rc-01">
            <div className="inner">
                <div className="tit-wrap txt-center">
                    <h3>신뢰와 혁신을 바탕으로 <b>최상의 신차 구매 경험</b>을 제공합니다.</h3>
                    <h1>
                        <span className="fc-g-3">고객 중심의</span>
                        <span className="fc-s"> 차량 구매 솔루션을</span>
                        <span className="fc-m"> 제공하는 </span>
                        <span className="br"></span>
                        자동차 컨설팅 기업
                    </h1>
                </div>
                <div className="site-link flex-center">
                    <a href="https://www.ks-rentcar.co.kr" target="_blank" rel="noopener noreferrer">
                        <img src="/images/logo_ksautoplan.svg" alt="KS오토플랜 바로가기"></img>
                        (주)KS오토플랜
                    </a>
                    <a href="https://kscarnival.com" target="_blank" rel="noopener noreferrer">
                        <img src="/images/logo_carnival.svg" alt="KS카니발 바로가기"></img>
                        (주)KS카니발
                    </a>
                </div>
                <div className="txt-box fc-g-1 txt-center">
                    <img src="/images/ico_check.svg" alt="체크 아이콘"></img>
                    우리는 단순히 신차를 판매하는 것이 아니라,
                    <div className="bold">고객의 라이프스타일과 요구에 맞춘 맞춤형 차량 컨설팅을 제공합니다.</div>
                </div>
                <ul className="rentcar-list flex-center">
                    <li>
                        <div className="num">01</div>
                        <div>
                            고객이 합리적인 조건에서<br />
                            원하는 차량을 구매할 수 있도록<br />
                            최적의 솔루션 제공
                        </div>
                    </li>
                    <li>
                        <div className="num">02</div>
                        <div>
                            다양한 금융 프로그램 및<br />
                            맞춤형 리스·렌트 옵션 제공
                        </div>
                    </li>
                    <li>
                        <div className="num">03</div>
                        <div>
                            투명한 계약 과정과<br />
                            신속한 차량 출고 서비스 제공
                        </div>
                    </li>
                </ul>
            </div>
        </section>

        <section className="rentcar-content rc-02">
            <div className="inner flex-center">
                <div className="img-box">
                    <img className="img-responsive" src="/images/rentcar_img_01.png" alt="자동차 이미지"></img>
                </div>
                <div className="info-wrap">
                    <h1>
                        <span className="fc-g-3">KS</span><br />
                        <span className="fc-g-2">자동차</span> 금융의<br />
                        <span className="fc-m">차별화</span>
                    </h1>
                    <div className="rentSwiper">
                        <CommonSwiper
                            slides={rentSlides}
                            options={{
                                slidesPerView: 'auto',
                                spaceBetween: 30,
                                pagination: {
                                    type: 'fraction',
                                },
                                autoplay: {
                                    delay: 3000, // 3초 간격
                                    disableOnInteraction: false, // 사용자 터치 후에도 계속 자동재생
                                },
                                loop: true,
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>

        <section className="rentcar-content rc-03">
            <div className="inner">
                <h1>주요서비스</h1>
                <ul>
                    <li>
                        <div className="tit">01 신차판매</div>
                        <div className="txt">
                            국산/수입차 전차종 다양한 브랜드 차량 판매
                        </div>
                    </li>
                    <li>
                        <div className="tit">02 맞춤형 금융 프로그램</div>
                        <div className="txt">
                            할부, 리스, 렌트 등 고객의 상황에 맞는 금융 상품 제공
                        </div>
                    </li>
                    <li>
                        <div className="tit">03 법인 및 개인 리스·렌트 상담</div>
                        <div className="txt">
                            최적의 비용 절감 방안을 제공
                        </div>
                    </li>
                    <li>
                        <div className="tit">04 트레이드 인 서비스</div>
                        <div className="txt">
                            기존 차량을 합리적인 가격에
                            매각 후 신차 구매 지원
                        </div>
                    </li>
                    <li>
                        <div className="tit">05 특장차 & VIP 개조 차량 판매</div>
                        <div className="txt">
                            리무진·의전 차량 등 특수
                            목적 차량 커스터마이징
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    </div>
    
    </>
);

export default Rentcar;